import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  voteCount: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
 
},{timestamps: true});

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
