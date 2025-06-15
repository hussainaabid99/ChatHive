import express from "express";
import { isMemberPartOfWorkspace } from "../../controller/memberController.js";
import isAuthenticated from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/workspace/:workspaceId", isAuthenticated, isMemberPartOfWorkspace);

export default router;
