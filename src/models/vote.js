import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ipAddress: String,
  userAgent: String
}, { timestamps: true });

voteSchema.index({ pollId: 1, ipAddress: 1 }, { unique: true });

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
