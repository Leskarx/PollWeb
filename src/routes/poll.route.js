import { Router } from "express";
import { createPoll, getPoll } from "../controller/poll.controller.js";
const router = Router();

router.post("/", createPoll);
router.get("/:id", getPoll);
// router.get("/health", (req, res) => {
//   res.send("Poll route is healthy");
// });

export default router;
