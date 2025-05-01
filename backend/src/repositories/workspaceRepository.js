import Workspace from "../schema/workspace.js";
import CrudRepository from "../repositories/crudRepository.js";
import User from "../schema/user.js";
import ClientError from "../utils/errors/clientError.js";
import Channel from "../schema/channel.js";

class WorkspaceRepository extends CrudRepository {
  constructor() {
    super(Workspace);
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
      const workspace = await Workspace.findOne({ joinCode });
      return workspace;
    } catch (error) {
      console.log("Something went wrong in repository layer", error);
      throw error;
    }
  }

  async addMemberToWorkspace(workspaceId, memberId, role) {
    try {
      const isUser = await User.findById({ memberId });
      if (!isUser)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "User not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const workspace = await Workspace.findById({ workspaceId });
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isMemberAlreadyPartOfWorkspace = await Workspace.findOne({
        "members.memberId": memberId,
      });
      if (isMemberAlreadyPartOfWorkspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "User already part of workspace",
          statusCode: StatusCodes.FORBIDDEN,
        });

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

  async addChannelToWorkspace(workspaceId, channelName) {
    try {
      const workspace = await Workspace.findById(workspaceId).populate(
        "channels"
      );
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isChannelAlreadyPartOfWorkspace = await Workspace.findOne({
        "channels.name": channelName,
      });
      if (isChannelAlreadyPartOfWorkspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Channel already part of workspace",
          statusCode: StatusCodes.FORBIDDEN,
        });

      const channel = await Channel.create({
        name: channelName,
        workspaceId: workspaceId,
      });

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
