import WorkspaceRepository from "../repositories/workspaceRepository.js";
import { v4 as uuidv4 } from "uuid";
import ClientError from "../utils/errors/clientError.js";
import ChannelRepository from "../repositories/channelRepository.js";

class WorkspaceService {
  constructor() {
    this.worspaceRepository = new WorkspaceRepository();
  }

  async createWorkspace(data) {
    try {
      const joinCode = uuidv4().substring(0, 8).toUpperCase();
      const response = await this.worspaceRepository.create({
        name: data.name,
        description: data.description,
        joinCode,
      });

      await this.worspaceRepository.addMemberToWorkspace(
        response._id,
        data.owner,
        "admin"
      );
      const workspace = await this.worspaceRepository.addChannelToWorkspace(
        response._id,
        "general"
      );

      return workspace;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async getWorkspacesUserIsMemberOf(userId) {
    try {
      const response =
        await this.worspaceRepository.fetchAllWorkspaceByMemberId(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async deleteWorkspace(workspaceId, userId) {
    try {
      const workspace = this.worspaceRepository.getById(workspaceId);
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isAdmin = await this.worspaceRepository.findOne({
        _id: workspaceId,
        members: {
          $elemMatch: {
            memberId: userId,
            role: "admin",
          },
        },
      });

      if (isAdmin == null)
        throw new ClientError({
          explanation:
            "User is either not a memeber or an admin of the workspace",
          message: "User is not allowed to delete the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });

      this.channelRepository = new ChannelRepository();

      await this.channelRepository.deleteMany(workspace.channels);

      const response = await this.worspaceRepository.destroy(workspaceId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
}

export default WorkspaceService;
