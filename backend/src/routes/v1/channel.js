import express from "express";
import isAuthenticated from "../../middleware/authMiddleware.js";
import { getChannelWithWorkspaceController } from "../../controller/channelController.js";

const router = express.Router();

router.get("/:channelId", isAuthenticated, getChannelWithWorkspaceController);

export default router;
