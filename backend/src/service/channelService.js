import { StatusCodes } from "http-status-codes";
import ChannelRepository from "../repositories/channelRepository.js";
import ClientError from "../utils/errors/clientError.js";
import WorkspaceService from "../service/workspaceService.js";
import MessageRepository from "../repositories/messageRepository.js";

class ChannelService {
  constructor() {
    this.channelRepository = new ChannelRepository();
  }

  async getChannelWithWorkspace(channelId, userId) {
    try {
      const channel =
        await this.channelRepository.getChannelWithWorkspaceDetails(channelId);
      if (!channel || !channel.workspaceId)
        throw new ClientError({
          message: "Channel not found with the provided ID",
          explanation: "Invalid data sent from the client",
          statusCode: StatusCodes.NOT_FOUND,
        });

      this.wokspaceService = new WorkspaceService();
      const workspace = await this.wokspaceService.getWorkspaceById(
        channel.workspaceId,
        userId
      );

      const messageRepository = new MessageRepository();
      const messages = await messageRepository.getPaginatedMessage(
        {
          channelId,
        },
        1,
        20
      );

      channel.messages = messages;

      if (workspace)
        return {
          messages,
          _id: channel._id,
          name: channel.name,
          createdAt: channel.createdAt,
          updatedAt: channel.updatedAt,
          workspaceId: channel.workspaceId,
        };
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async updateChannelService(channelId, data) {
    try {
      const channel = await this.channelRepository.getById(channelId);
      if (!channel)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Channel not found",
          statusCode: StatusCodes.NOT_FOUND,
        });

      if (data?.name) {
        const existing = await this.channelRepository.getChannelByName(
          data.name
        );
        if (existing)
          throw new ClientError({
            explanation: "Channel with the same name already exists",
            message: "Channel with the same name already exists",
            statusCode: StatusCodes.CONFLICT,
          });
      }
      const response = await this.channelRepository.update(channelId, data);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
}

export default ChannelService;
