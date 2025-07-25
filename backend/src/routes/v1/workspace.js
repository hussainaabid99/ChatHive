import express from "express";
import isAuthenticated from "../../middleware/authMiddleware.js";
import {
  getWorkspaceByIdController,
  createWorkspaceController,
  getWorkspaceUserIsMemberOfController,
  deleteWorkspaceByIdController,
  getWorkspaceByJoinCodeController,
  addMemberToWorkspaceController,
  updateWorkspaceController,
  addChannelToWorkspaceController,
  resetWorkspaceJoinCodeController,
} from "../../controller/workspaceController.js";

const router = express.Router();
//GET
router.get("/:workspaceId", isAuthenticated, getWorkspaceByIdController);
router.get(
  "/join/:joinCode",
  isAuthenticated,
  getWorkspaceByJoinCodeController
);
router.get("/", isAuthenticated, getWorkspaceUserIsMemberOfController);
//POST
router.post("/", isAuthenticated, createWorkspaceController);
//DELETE
router.delete("/:workspaceId", isAuthenticated, deleteWorkspaceByIdController);
//PUT
router.put(
  "/:workspaceId/members",
  isAuthenticated,
  addMemberToWorkspaceController
);
router.put(
  "/:workspaceId/channels",
  isAuthenticated,
  addChannelToWorkspaceController
);
router.put(
  "/:workspaceId/joinCode/reset",
  isAuthenticated,
  resetWorkspaceJoinCodeController
);
router.put("/:workspaceId", isAuthenticated, updateWorkspaceController);

export default router;
