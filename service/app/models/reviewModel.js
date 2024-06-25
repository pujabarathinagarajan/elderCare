import mongoose from 'mongoose';
import {Schema} from "mongoose";

const reviewSchema=new Schema(
  {
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    user:{
        type:String,
        required:true,
        ref:"User"
    }
  },
  {
    timestamps: true,
  }
);

const Review=mongoose.model("Review", reviewSchema);

export default Review;