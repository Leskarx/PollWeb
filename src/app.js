// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";
import pollRouter from "./routes/poll.route.js";

// const pollRoutes = require("./routes/poll.routes");
// const voteRoutes = require("./routes/vote.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRouter);
// app.use("/api/vote", voteRoutes);

app.get("/health", (req, res) => {
  res.send("Server running");
});

export default app;
