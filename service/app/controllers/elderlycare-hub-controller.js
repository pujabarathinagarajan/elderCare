import * as ElderlyCareHubService from "../services/elderlycare-hub-service.js";
import {
  setResponse,
  setError,
  setBadRequest,
  setNotFound,
  setSuccess,
} from "./response-handler.js";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../services/generateToken.js";
import * as DocService from "../services/elderlycare-hub-service.js";
import { connect } from "react-redux";

// Define a function to map Redux state to component props

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userType } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    userType,
  });

  if (user) {
    generateToken(res, user._id);
    // create an entry in doctor/elder profile 
    if(user.userType == 'DOCTOR'){
      ElderlyCareHubService.createDoctorProfile(user._id, user.name, user.email)
    } else if(user.userType == 'ELDER'){
      ElderlyCareHubService.createElderProfile(user._id, user.name, user.email)
    }
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// // @desc    Get user profile
// // @route   GET /api/users/profile
// // @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile1 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const docId = req.params.docId;
  console.log("user id>", docId);

  if (docId) {
    const updatedDocInfo = await DocService.updateDocInfo(docId, req.body);
    res.status(201).json(updatedDocInfo);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const docId = req.params.docId;
  console.log("user id>", docId);
  if (!docId) {
    res.status(400).json({ error: "docId parameter is missing" });
    return;
  }
  try {
    const getDocInfo = await DocService.getDocInfo(docId);

    if (!getDocInfo) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }

    res.status(200).json(getDocInfo);
  } catch (error) {
    console.error("Error getting doctor profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/* Start of appointment related APIs */

// Fetch all Appointment
export const getAppointment = async (req, res) => {
  try {
    const appointment = await ElderlyCareHubService.searchAppointment(
      req.params
    );
    setResponse(appointment, res);
  } catch (err) {
    setError(err, res);
  }
};

// Filter Appointment by id
export const getAppointmentByAppointmentId = async (req, res) => {
  try {
    const appointment = await ElderlyCareHubService.getAppointment(
      req.params.id
    );
    if (!appointment) {
      return setNotFound({ message: "Appointment not found" }, res);
    }

    setResponse(appointment, res);
  } catch (err) {
    setError(err, res);
  }
};

// Add a new Appointment
export const postAppointment = async (req, res) => {
  const appointment = { ...req.body };

  try {
    const newAppointment = await ElderlyCareHubService.saveAppointment(
      appointment
    );
    setSuccess(newAppointment, res);
  } catch (err) {
    setBadRequest(err, res);
  }
};

// Update an existing Appointment
export const patchAppointment = async (req, res) => {
  try {
    const appointment = await ElderlyCareHubService.getAppointment(
      req.params.id
    );
    if (!appointment) {
      return setNotFound({ message: "Appointment not found" }, res);
    }
    if (req.body.doctorId !== undefined) {
      appointment.doctorId = req.body.doctorId;
    }
    if (req.body.patientId !== undefined) {
      appointment.patientId = req.body.patientId;
    }
    if (req.body.dateTime !== undefined) {
      appointment.dateTime = req.body.dateTime;
    }
    if (req.body.duration !== undefined) {
      appointment.duration = req.body.duration;
    }
    if (req.body.speciality !== undefined) {
      appointment.speciality = req.body.speciality;
    }
    if (req.body.healthConcern !== undefined) {
      appointment.healthConcern = req.body.healthConcern;
    }
    if (req.body.status !== undefined) {
      appointment.status = req.body.status;
    }
    if (req.body.location !== undefined) {
      appointment.location = req.body.location;
    }

    const updatedAppointment = await ElderlyCareHubService.patchAppointment(
      appointment,
      req.params.id
    );
    setResponse(updatedAppointment, res);
  } catch (err) {
    setBadRequest(err, res);
  }
};

// Get a Appointments by filters
export const getAppointmentsByFilters = async (req, res) => {
  try {
    const { status, date, keyword } = req.query;
    let query = {};

    // Add status to query if it's provided
    if (status) {
      query.status = status;
    }
    // Add date range to query if date is provided
    if (date) {
      const localDate = new Date(date + "T00:00:00"); // Force local time interpretation by specifying time
      const timezoneOffset = localDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
      const startDate = new Date(localDate.getTime() - timezoneOffset);
      const endDate = new Date(startDate.getTime() + 86399999);

      query.dateTime = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    if (keyword) {
      const keywordRegex = { $regex: new RegExp(keyword, "i") };
      query.$or = [
        { speciality: keywordRegex },
        { healthConcern: keywordRegex },
        { location: keywordRegex },
      ];
    }

    const appointments = await ElderlyCareHubService.searchAppointment(query);
    setResponse(appointments, res);
  } catch (err) {
    setError(err, res);
  }
};

// Delete a Appointment
export const deleteAppointment = async (req, res) => {
  try {
    await ElderlyCareHubService.removeAppointment(req.params.id);
    setResponse({ message: "Appointment deleted" }, res);
  } catch (err) {
    setError(err, res);
  }
};

/* End of appointment related APIs */

/* Start of doctor related APIs */

// Fetch all Doctor
export const getDoctor = async (req, res) => {
  try {
    const doctor = await ElderlyCareHubService.searchDoctor(req.params);
    setResponse(doctor, res);
  } catch (err) {
    setError(err, res);
  }
};

// Filter Doctor by id
export const getDoctortByDoctorId = async (req, res) => {
  try {
    const doctor = await ElderlyCareHubService.getDoctor(req.params.id);
    if (!doctor) {
      return setNotFound({ message: "Doctor not found" }, res);
    }

    setResponse(doctor, res);
  } catch (err) {
    setError(err, res);
  }
};

// Add a new Doctor
export const postDoctor = async (req, res) => {
  const doctor = { ...req.body };

  try {
    const newdoctor = await ElderlyCareHubService.saveDoctor(doctor);
    setSuccess(newdoctor, res);
  } catch (err) {
    setBadRequest(err, res);
  }
};

// Update an existing Doctor
export const patchDoctor = async (req, res) => {
  try {
    const doctor = await ElderlyCareHubService.getDoctor(req.params.id);
    if (!doctor) {
      return setNotFound({ message: "Doctor not found" }, res);
    }
    if (req.body.fullName !== undefined) {
      doctor.fullName = req.body.fullName;
    }
    if (req.body.email !== undefined) {
      doctor.email = req.body.email;
    }
    if (req.body.location !== undefined) {
      doctor.location = req.body.location;
    }
    if (req.body.rating !== undefined) {
      doctor.rating = req.body.rating;
    }
    if (req.body.speciality !== undefined) {
      doctor.speciality = req.body.speciality;
    }
    if (req.body.languages !== undefined) {
      doctor.languages = req.body.languages;
    }
    if (req.body.education !== undefined) {
      doctor.education = req.body.education;
    }
    if (req.body.experience !== undefined) {
      doctor.experience = req.body.experience;
    }
    if (req.body.img !== undefined) {
      doctor.img = req.body.img;
    }
    if (req.body.nextAvailableTime !== undefined) {
      doctor.nextAvailableTime = req.body.nextAvailableTime;
    }
    if (req.body.gender !== undefined) {
      doctor.gender = req.body.gender;
    }
    if (req.body.certifications !== undefined) {
      doctor.certifications = req.body.certifications;
    }
    if (req.body.phoneNo !== undefined) {
      doctor.phoneNo = req.body.phoneNo;
    }
    if (req.body.bio !== undefined) {
      doctor.bio = req.body.bio;
    }

    const updatedDoctor = await ElderlyCareHubService.patchDoctor(
      doctor,
      req.params.id
    );
    setResponse(updatedDoctor, res);
  } catch (err) {
    setBadRequest(err, res);
  }
};

// Get a Doctors by filters
export const getDoctorByFilters = async (req, res) => {
  try {
    const { location, speciality, experience, gender, keyword } = req.query;
    const filter = {};

    if (location) {
      filter.location = { $in: location }; // Assuming 'location' is an array in the model
    }
    if (speciality) {
      filter.speciality = { $in: speciality }; // Assuming 'speciality' is an array in the model
    }
    if (experience) {
      filter.experience = { $gte: parseInt(experience, 10) }; // Field name changed to 'experience'
    }
    if (gender) filter.gender = gender;
    if (keyword) {
      const keywordRegex = { $regex: new RegExp(keyword, "i") };
      filter.$or = [
        { fullName: keywordRegex },
        { bio: keywordRegex },
        { education: keywordRegex },
        { email: keywordRegex },
        { speciality: keywordRegex }, // This will work only if speciality is a single string field or an array of strings.
        { location: keywordRegex }, // This will work only if location is a single string field or an array of strings.
        { languages: keywordRegex }, // This will match if any of the languages in the array matches the keyword.
        { certifications: keywordRegex }, // This will match if any of the certifications in the array matches the keyword.
        { phoneNo: keywordRegex }, // Assuming you want to allow search by phone number.
      ];
    }

    const doctors = await ElderlyCareHubService.searchDoctor(filter);
    setResponse(doctors, res);
  } catch (err) {
    setError(err, res);
  }
};

// Delete a Doctor
export const deleteDoctor = async (req, res) => {
  try {
    await ElderlyCareHubService.removeDoctor(req.params.id);
    setResponse({ message: "Doctor deleted" }, res);
  } catch (err) {
    setError(err, res);
  }
};


export const joinDoctorAndAppointmentFilter = async (req, res) => {
  try {
    const { date, status, name, patientId } = req.query;
    let query = {};

    if (date) {
      const localDate = new Date(date + "T00:00:00"); // Force local time interpretation by specifying time
      const timezoneOffset = localDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
      const startDate = new Date(localDate.getTime() - timezoneOffset);
      const endDate = new Date(startDate.getTime() + 86399999);

      query.dateTime = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    if (status) {
      query.status = status;
    }

    if (patientId) {  // Checking if patientId is provided and not empty
      query.patientId = patientId;
    }

    if (name) {
      const doctors = await ElderlyCareHubService.searchDoctor({ fullName: new RegExp(name, 'i') });
      const doctorIds = doctors.map(doc => doc.docId);
      query.doctorId = { $in: doctorIds };
    }

    const appointments = await ElderlyCareHubService.searchAppointment(query);
    const results = [];

    for (let appointment of appointments) {
      const doctor = await ElderlyCareHubService.searchDoctor({ docId: appointment.doctorId });

      if (doctor) {
        results.push({
          bookingId: appointment.appointmentId,
          doctorName: doctor[0].fullName,
          bookingDate: appointment.dateTime,
          status: appointment.status
        });
      }
    }
    setResponse(results, res);
  } catch (error) {
    setError(error, res);
  }
};

const uploadProfilePicture = asyncHandler(async (req, res) => {
  const docId = req.params.docId;
  console.log("user id>", docId);
  if (!docId) {
    res.status(400).json({ error: "docId parameter is missing" });
    return;
  }
  try {
    const getDocInfo = await DocService.uploadProfilePicture(docId);

    if (!getDocInfo) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }

    res.status(200).json(getDocInfo);
  } catch (error) {
    console.error("Error getting doctor profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const createCheckoutSession = asyncHandler(async (req, res) => { });

const patchAppointmentInfo = async (request, response) => {
  try {
    console.log("Updating appointment status");

    const { appointmentId } = request.query;
    const { status } = request.query; // Extract the status from query parameters

    if (!status) {
      return response
        .status(400)
        .json({ error: "Status is required to update the appointment" });
    }

    // Assuming `updateAppointmentStatus` is a method defined in your service that handles the database update logic
    const updateResult = await ElderlyCareHubService.updateAppointmentStatus(
      appointmentId,
      status
    );

    response.status(200).json({
      message: "Appointment status updated successfully",
      details: updateResult,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    response.status(500).json({ error: error.message });
  }
};

//Controller to get patient appointment records
const getAppointmentInfo = async (request, response) => {
  try {
    console.log("inside getAppointmentCounts ");
    const { doctorId } = request.query;
    const getAppointmentInfo = await ElderlyCareHubService.getAppointmentInfo(
      doctorId
    );

    response.status(200).json(getAppointmentInfo);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
//Controller to get count of appointment records
const getAppointmentCounts = async (request, response) => {
  try {
    console.log("inside getAppointmentCounts ");
    const { doctorId } = request.query;
    const getAppointmentCounts =
      await ElderlyCareHubService.getAppointmentCounts(doctorId);

    response.status(200).json(getAppointmentCounts);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  createCheckoutSession,
  getAppointmentCounts,
  getAppointmentInfo,
  patchAppointmentInfo,
};

/* End of doctor related APIs */
