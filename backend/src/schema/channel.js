import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Channel name is required"],
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
