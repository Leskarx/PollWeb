// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";
import pollRouter from "./routes/poll.route.js";
import voteRouter from "./routes/vote.route.js";

// const pollRoutes = require("./routes/poll.routes");
// const voteRoutes = require("./routes/vote.routes");

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,             
  'http://localhost:5173'                
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins

}));
app.use(express.json());

app.use("/api/polls", pollRouter);
app.use("/api/vote", voteRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
