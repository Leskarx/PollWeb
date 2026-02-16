import Poll from "../models/poll.js";
import Vote from "../models/vote.js";
import getIP from "../utils/getIp.js";
import { getIO } from "../config/socket.js";

const submitVote = async (req, res) => {
  try {
    const { pollId, optionId } = req.body;

    const ipAddress = getIP(req);
    const userAgent = req.headers["user-agent"];

    const existing = await Vote.findOne({ pollId, ipAddress });

    if (existing) {
      return res.status(400).json({ message: "Already voted" });
    }

    await Vote.create({
      pollId,
      optionId,
      ipAddress,
      userAgent,
    });

    const poll = await Poll.findById(pollId);

    const opt = poll.options.id(optionId);
    if (opt) opt.voteCount++;

    await poll.save();

    const io = getIO();
    io.to(`poll_${pollId}`).emit("vote_update", poll.options);

    res.json({ message: "Vote submitted" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting vote" });
  }
};

export default submitVote;
