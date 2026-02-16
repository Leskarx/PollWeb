import {Router} from "express";
import submitVote from "../controller/vote.controller.js";
const router = Router();
router.post("/", submitVote);

export default router;
