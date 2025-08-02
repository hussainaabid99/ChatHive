import express from "express";

import {
  getMessageController,
  getSignatureController,
} from "../../controller/messageController.js";
import isAuthenticated from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-signature", isAuthenticated, getSignatureController);
router.get("/:channelId", isAuthenticated, getMessageController);

export default router;
