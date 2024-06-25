import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctorId: String,
    patientId: String,
    appointmentId: String,
    dateTime: Date,
    status: String,
    duration: Number,
    speciality: String,
    healthConcern: [String],
    location: String
});

const doctorSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    speciality: [String], // Array of strings
    experience: Number,
    rating: Number,
    location: [String], // Array of strings
    languages: [String], // Array of strings
    education: String,
    certifications: [String], // Array of strings
    docId: String,
    phoneNo: String,
    bio: String,
    img: {
        $binary: {
            base64: String,
            subType: String
        }
    },
    nextAvailableTime: String, // Changed to Date type for timestamp
    gender: String
});

const Appointment = mongoose.model('appointmentbook', appointmentSchema);
//const Doctor = mongoose.model('doctorprofiles', doctorSchema);

export {Appointment };
export default Appointment;
