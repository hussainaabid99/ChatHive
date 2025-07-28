import express from "express";
import isAuthenticated from "../../middleware/authMiddleware.js";
import {
  getChannelWithWorkspaceController,
  updateChannelController,
} from "../../controller/channelController.js";

const router = express.Router();

router.get("/:channelId", isAuthenticated, getChannelWithWorkspaceController);
router.put("/:channelId", isAuthenticated, updateChannelController);

export default router;
