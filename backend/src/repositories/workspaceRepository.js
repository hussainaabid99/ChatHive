import Workspace from "../schema/workspace.js";
import CrudRepository from "../repositories/crudRepository.js";
import Channel from "../schema/channel.js";

class WorkspaceRepository extends CrudRepository {
  constructor() {
    super(Workspace);
  }

  async getWorkspaceDetailsById(workspaceId) {
    try {
      const workspace = await Workspace.findById(workspaceId)
        .populate("members.memberId", "username email avatar")
        .populate("channels");

      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }

  async getWorkspaceByName(name) {
    try {
      const workspace = await Workspace.findOne({ name });
      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }

  async getWorkspaceByJoinCode(joinCode) {
    try {
      const workspace = await Workspace.findOne({ joinCode })
        .populate("members")
        .populate("channels");
      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }

  async addMemberToWorkspace(workspaceId, memberId, role) {
    try {
      const workspace = await Workspace.findById(workspaceId);

      workspace.members.push({
        memberId,
        role,
      });

      await workspace.save();
      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }

  async addChannelToWorkspace(workspace, channelName) {
    try {
      const channel = await Channel.create({
        name: channelName,
        workspaceId: workspace._id,
      });
      console.log("workspace", workspace);
      console.log("channel", channel);
      workspace.channels.push(channel);
      await workspace.save();
      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }

  async fetchAllWorkspaceByMemberId(memberId) {
    try {
      const workspace = await Workspace.find({
        "members.memberId": memberId,
      }).populate("members.memberId", "username email avatar");

      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }
}

export default WorkspaceRepository;
