import express from "express";
import { sendDM, getDMs } from "../../controller/messageController.js";
import isAuthenticated from "../../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", isAuthenticated, sendDM);
router.get("/:userId", isAuthenticated, getDMs);

export default router;
