
import Poll from "../models/poll"
import Vote from "../models/vote"
import getIP from "../utils/getIp"
import { getIO } from "../config/socket";

const submitVote = async (req, res) => {
  try {
    const { pollId, optionIds } = req.body;
    const ipAddress = getIP(req);
    const userAgent = req.headers["user-agent"];

    const existing = await Vote.findOne({ pollId, ipAddress });

    if (existing) {
      return res.status(400).json({ message: "Already voted" });
    }

    await Vote.create({
      pollId,
      ipAddress,
      userAgent,
      optionIds,
    });

    const poll = await Poll.findById(pollId);

    optionIds.forEach((id) => {
      const opt = poll.options.id(id);
      if (opt) opt.voteCount++;
    });

    await poll.save();

    const io = getIO();
    io.to(`poll_${pollId}`).emit("vote_update", poll.options);

    res.json({ message: "Vote submitted" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting vote" });
  }
};
export default submitVote ;
