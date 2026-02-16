// const Poll = require("../models/Poll");
import Poll from "../models/poll";

createPoll = async (req, res) => {
  try {
    const { question, options} = req.body;

    if (!question || options.length < 2) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const poll = await Poll.create({
      question,
      options: options.map((text) => ({ text })),
      
    });

    res.json({
      pollId: poll._id,
      link: `/poll/${poll._id}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

getPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });

  res.json(poll);
};

export{
    createPoll,
    getPoll
}
