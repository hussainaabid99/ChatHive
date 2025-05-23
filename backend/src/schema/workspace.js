import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: [true, "workspace name is required"],
    unique: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
      },
    },
  ],

  joinCode: {
    type: String,
    required: true,
  },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
