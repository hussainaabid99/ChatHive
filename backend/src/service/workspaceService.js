import WorkspaceRepository from "../repositories/workspaceRepository.js";
import { v4 as uuidv4 } from "uuid";
import ClientError from "../utils/errors/clientError.js";
import ChannelRepository from "../repositories/channelRepository.js";
import { StatusCodes } from "http-status-codes";
import UserRepository from "../repositories/userRepository.js";
import { addEmailtoMailQueue } from "../producers/mailQueueProducer.js";
import { workspaceJoinMail } from "../common/mailObject.js";

class WorkspaceService {
  constructor() {
    this.workspaceRepository = new WorkspaceRepository();
  }

  _isChannelInWorkspace(workspace, channelName) {
    console.log(workspace, channelName);
    return workspace.channels.some((channel) => console.log(channel?.name));
  }
  _isAdmin(workspace, userId) {
    return workspace.members.some(
      (member) =>
        member.memberId._id.toString() === userId &&
        member.role.toString() == "admin"
    );
  }

  _isMember(workspace, userId) {
    return workspace.members.some(
      (member) => member.memberId._id.toString() === userId
    );
  }
  async getWorkspaceById(workspaceId, userId) {
    try {
      const workspace = await this.workspaceRepository.getWorkspaceDetailsById(
        workspaceId
      );

      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isMember = this._isMember(workspace, userId);

      if (!isMember)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Member is not part of workspace",
          statusCode: StatusCodes.FORBIDDEN,
        });

      return workspace;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
  async createWorkspace(data) {
    try {
      const joinCode = uuidv4().substring(0, 8).toUpperCase();
      const response = await this.workspaceRepository.create({
        name: data.name,
        description: data?.description,
        joinCode,
      });

      await this.workspaceRepository.addMemberToWorkspace(
        response._id,
        data.owner,
        "admin"
      );

      const updatedWorkspace =
        await this.workspaceRepository.addChannelToWorkspace(
          response,
          "general"
        );

      return updatedWorkspace;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async getWorkspacesUserIsMemberOf(userId) {
    try {
      const response =
        await this.workspaceRepository.fetchAllWorkspaceByMemberId(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async deleteWorkspace(workspaceId, userId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isAdmin = this._isAdmin(workspace, userId);

      if (!isAdmin)
        throw new ClientError({
          explanation:
            "User is either not a memeber or an admin of the workspace",
          message: "User is not allowed to delete the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });

      this.channelRepository = new ChannelRepository();

      console.log("wsC", workspace.channels, typeof workspace.channels);

      const response1 = await this.channelRepository.deleteMany({
        _id: { $in: workspace.channels },
      });
      console.log(response1);

      const response = await this.workspaceRepository.destroy(workspaceId);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async getWorkspaceByJoinCode(joinCode, userId) {
    try {
      const workspace = await this.workspaceRepository.getWorkspaceByJoinCode(
        joinCode
      );
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      const isMember = this._isMember(workspace, userId);
      if (!isMember)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Member is not part of workspace",
          statusCode: StatusCodes.FORBIDDEN,
        });
      return workspace;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async addMemberToWorkspace(workspaceId, memberId, role, userId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace)
        throw ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isAdmin = await this.workspaceRepository.isUserAdminOfWorkspace(
        workspaceId,
        userId
      );
      if (!isAdmin)
        throw new ClientError({
          explanation:
            "User is either not a memeber or an admin of the workspace",
          message: "User is not allowed to add member to the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });

      this.userRepository = new UserRepository();
      const isValidUser = await this.userRepository.getById(memberId);
      if (!isValidUser) {
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "User not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      const isMember = await this.workspaceRepository.isUserMemberOfWorkspace(
        workspace,
        memberId
      );
      if (isMember) {
        throw new ClientError({
          explanation: "User is already a member of the workspace",
          message: "User is already a member of the workspace",
          statusCode: StatusCodes.FORBIDDEN,
        });
      }

      const response = await this.workspaceRepository.addMemberToWorkspace(
        workspaceId,
        memberId,
        role
      );
      addEmailtoMailQueue({
        ...workspaceJoinMail(workspace),
        to: isValidUser.email,
      });
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async updateWorkspace(workspaceId, data, userId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isAdmin = this._isAdmin(workspace, userId);
      if (!isAdmin)
        throw new ClientError({
          explanation:
            "User is either not a memeber or an admin of the workspace",
          message: "User is not allowed to delete the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });

      const response = await this.workspaceRepository.update(workspaceId, data);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async addChannelToWorkspace(workspaceId, channelName, userId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace)
        throw ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isAdmin = this._isAdmin(workspace, userId);
      if (!isAdmin)
        throw ClientError({
          explanation:
            "User is either not a memeber or an admin of the workspace",
          message: "User is not allowed to delete the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });

      const hasChannel = this._isChannelInWorkspace(workspace, channelName);
      if (hasChannel)
        throw ClientError({
          explanation: "The channel is already associated with the workspace",
          message: "Channel is already part of the workspace",
          statusCode: StatusCodes.CONFLICT,
        });

      const response = await this.workspaceRepository.addChannelToWorkspace(
        workspace,
        channelName
      );
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async resetWorkspaceJoinCode(workspaceId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const newJoinCode = uuidv4().substring(0, 8).toUpperCase();
      const response = await this.workspaceRepository.update(workspaceId, {
        joinCode: newJoinCode,
      });
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }

  async joinWorkspaceService(workspaceId, joinCode, userId) {
    try {
      const workspace = await this.getWorkspaceById(workspaceId);
      if (!workspace)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      if (workspace.joinCode !== joinCode)
        throw new ClientError({
          explanation: "Invalid join code provided by the user",
          message: "Join code is incorrect",
          statusCode: StatusCodes.BAD_REQUEST,
        });

      const updatedWorkspace =
        await this.workspaceRepository.addMemberToWorkspace(
          workspaceId,
          userId,
          "member"
        );

      return updatedWorkspace;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
}

export default WorkspaceService;
