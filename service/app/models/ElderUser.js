import mongoose from "mongoose";
const Schema = mongoose.Schema({
  eid: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  healthConcerns: {
    type: Array,
    required: false,
  },
});

const ElderUser = mongoose.model("elderprofiles", Schema);

export default ElderUser;
