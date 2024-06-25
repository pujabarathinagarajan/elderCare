//import ElderlyCareHub, { Doctor } from "../models/elderlycare-hub.js";
import Appointment from "../models/elderlycare-hub.js";
import DoctorUser from "../models/DoctorUser.js";
import ElderUser from "../models/ElderUser.js";
/**
 * Searches and returns appointment object.
 * @param {*} params
 * @returns
 */
export const searchAppointment = async (params) => {
  const appointment = await Appointment.find(params).exec();
  return appointment;
};

/**
 * Saves the appointment
 * @param {*} params
 * @returns
 */
export const saveAppointment = async (bookingDetails) => {
  const appointment = new Appointment(bookingDetails);
  appointment.save();
  return appointment;
};

/**
 * Updates the appointment
 * @param {*} params
 * @returns
 */
export const patchAppointment = async (bookingDetails, id) => {
  const appointment = Appointment.findByIdAndUpdate(id, bookingDetails, {
    new: true,
  }).exec();
  return appointment;
};

/**
 * Retrieves a single appointment object.
 * @param {*} params
 * @returns
 */
export const getAppointment = async (id) => {
  const appointment = Appointment.findById(id).exec();
  return appointment;
};

/**
 * Deletes a single appointment object.
 * @param {*} params
 * @returns
 */
export const removeAppointment = async (id) => {
  const appointment = Appointment.findByIdAndDelete(id).exec();
  return appointment;
};

/** Doctor related APIs */
/**
 * Searches and returns Doctor object.
 * @param {*} params
 * @returns
 */
export const searchDoctor = async (params) => {
  const doctor = await DoctorUser.find(params).exec();
  return doctor;
};

/**
 * Saves the Doctor
 * @param {*} params
 * @returns
 */
export const saveDoctor = async (doctorDetails) => {
  const doctor = new DoctorUser(doctorDetails);
  doctor.save();
  return doctor;
};

/**
 * Updates the Doctor
 * @param {*} params
 * @returns
 */
export const patchDoctor = async (doctorDetails, id) => {
  const doctor = DoctorUser.findByIdAndUpdate(id, doctorDetails, {
    new: true,
  }).exec();
  return doctor;
};

/**
 * Retrieves a single Doctor object.
 * @param {*} params
 * @returns
 */
export const getDoctor = async (id) => {
  const doctor = DoctorUser.findById(id).exec();
  return doctor;
};

/**
 * Deletes a single Doctor object.
 * @param {*} params
 * @returns
 */
export const removeDoctor = async (id) => {
  const doctor = DoctorUser.findByIdAndDelete(id).exec();
  return doctor;
};

// Function to update a doctor Information
export const updateDocInfo = async (docId, updatedData) => {
  try {
    // Find the document by its docId field
    console.log("updated data ", updatedData);
    const doc = await DoctorUser.find({ docId: docId });
    console.log("doc info", doc[0]._id);
    const _id = doc[0]._id;
    if (!doc) {
      // If document is not found, return null or throw an error
      return "Doc id is not present";
    }
    // Update document fields with the provided updatedData
    const updatedDocProfile = await DoctorUser.findByIdAndUpdate(
      _id,
      updatedData,
      {
        new: true,
      }
    ).exec();

    return updatedDocProfile;

    //  return "updatedDoc";
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating document:", error);
    throw new Error("Error updating document");
  }
};

// Function to get a doctor Information
export const getDocInfo = async (docId) => {
  try {
    // Find the document by its docId field
    //console.log("updated data ", updatedData);
    const doc = await DoctorUser.find({ docId: docId });
    console.log("doc info", doc[0]);
    // const _id = doc[0]._id;
    if (!doc) {
      // If document is not found, return null or throw an error
      return "Doc is not present";
    }
    // get document fields
    return doc;

    //  return "updatedDoc";
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating document:", error);
    throw new Error("Error updating document");
  }
};

// Function to create a new doctor profile
// used when a doctor user registers
// stores name, email, and _id as docId
// keeps rest entries empty to be updated later 
export const createDoctorProfile= async (id, name, email) =>{
  const doctorUser = await DoctorUser.create({
    docId: id,
    fullName: name,
    email: email
  })
}

// Function to create a new elder profile
// used when a elder user registers
// stores name, email, and _id as eId
// keeps rest entries empty to be updated later 
export const createElderProfile= async (id, name, email) =>{
  const elderUser = await ElderUser.create({
    eid: id,
    fullName: name,
    email: email
  })
}

//Function to update profile picture

// Function to update a doctor Information
export const uploadProfilePicture = async (docId, updatedData) => {
  try {
    // Find the document by its docId field
    console.log("updated data ", updatedData);
    const doc = await DoctorUser.find({ docId: docId });
    console.log("doc info", doc[0]._id);
    const _id = doc[0]._id;
    if (!doc) {
      // If document is not found, return null or throw an error
      return "Doc id is not present";
    }
    // Update document fields with the provided updatedData
    const updatedDocProfile = await DoctorUser.findByIdAndUpdate(
      _id,
      updatedData,
      {
        new: true,
      }
    ).exec();

    return updatedDocProfile;

    //  return "updatedDoc";
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating document:", error);
    throw new Error("Error updating document");
  }
};

export const getAppointmentCounts = async (doctorId) => {
  try {
    debugger;
    const qe = { doctorId: parseInt(doctorId) };
    // let appointments = await appointmentBook.find(qe).exec();
    // console.log(`Appointment`, appointments);
    //  console.log(qe);
    // console.log("doctorId", doctorId);

    const total = await Appointment.countDocuments({
      doctorId,
      //status: "Cancelled",
    });
    //  console.log(`Number of movies from Canada: ${total}`);

    // const total1 = await appointmentBook.estimatedDocumentCount();
    // console.log(`Number of movies from aqe: ${total1}`);
    const cancelled = await Appointment.countDocuments({
      doctorId,
      status: "Cancelled",
    });
    const confirmed = await Appointment.countDocuments({
      doctorId,
      status: "Confirmed",
    });
    const completed = await Appointment.countDocuments({
      doctorId,
      status: "Completed",
    });

    return {
      success: true,
      data: {
        total,
        cancelled,
        confirmed,
        completed,
      },
    };
  } catch (err) {
    console.error(err);
    return { success: false, msg: "Something went wrong!" };
  }
};

export const getAppointmentInfo = async (doctorId) => {
  console.log("inside getAppointmentInfo service function", doctorId);
  try {
    // // Find appointments based on doctorId

    const appointments = await Appointment.find({ doctorId }).exec();
    console.log(appointments);
    const mappedData = appointments.map((e) => e.patientId);
    console.log(mappedData);
    const newData = await ElderUser.find({
      eid: { $in: mappedData },
    });

    console.log(newData);

    // Extract relevant fields dynamically
    const result = appointments.map((appointment) => ({
      appointmentId: appointment.appointmentId,
      datetime: appointment.dateTime,
      status: appointment.status,
      fullName: appointment.patientId
        ? newData.find((e) => e.eid.matchAll(appointment.patientId)).fullName
        : "",
      // You can add more fields dynamically here if needed
    }));
    console.log("line 269", result);
    return result ?? [];
  } catch (err) {
    console.error("Error retrieving appointments:", err);
    return [];
  }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  console.log(
    "inside updateAppointmentStatus service function",
    appointmentId,
    status
  );
  try {
    // Update appointment based on doctorId with new status
    const updateResult = await Appointment.updateOne(
      { appointmentId: appointmentId },
      { $set: { status: status } }
    ).exec();

    console.log("Update operation result:", updateResult);

    if (updateResult.matchedCount === 0) {
      console.log("No appointments found to update.");
      return { affectedRows: 0 };
    }

    if (updateResult.modifiedCount === 0) {
      console.log(
        "No appointment status was updated (perhaps it was already set to this status)."
      );
      return { affectedRows: 0 };
    }

    // Return the number of documents matched and updated
    return { affectedRows: updateResult.modifiedCount };
  } catch (err) {
    console.error("Error updating appointment status:", err);
    throw new Error(`Error when updating status: ${err.message}`);
  }
};
