import express from "express";
import userRouter from "./user.js";
import workspaceRouter from "./workspace.js";
import channelRouter from "./channel.js";
import memberRouter from "./member.js";
import messageRouter from "./message.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/workspace", workspaceRouter);
router.use("/channels", channelRouter);
router.use("/member", memberRouter);
router.use("/messages", messageRouter);

export default router;
