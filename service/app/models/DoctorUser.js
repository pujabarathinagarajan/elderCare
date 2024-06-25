import mongoose from "mongoose";
const Schema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  speciality: {
    type: Array,
    required: false,
  },
  experience: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  location: {
    type: Array,
    required: false,
  },
  languages: { type: Array, required: false },
  education: {
    type: String,
    required: false,
  },
  certifications: { type: Array, required: false },

  docId: {
    type: String,
    required: false,
    // unique: true
  },

  phoneNo: {
    type: String,
    required: false,
  },

  bio: {
    type: String,
    required: false,
  },
  reviews:{
    type:[
      {
        type: Number,
        ref:"Review"
      },
    ],
    default: [],
  },
  img: {
    data: { type: Buffer },
    contentType: { type: String },
  },
  imageData: { type: Buffer },
  contentType: { type: String },
  name: { type: String },
});

const DoctorUser = mongoose.model("doctorprofiles", Schema);

export default DoctorUser;
