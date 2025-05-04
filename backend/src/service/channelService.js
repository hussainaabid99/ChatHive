import { StatusCodes } from "http-status-codes";
import ChannelRepository from "../repositories/channelRepository.js";
import ClientError from "../utils/errors/clientError.js";
import WorkspaceService from "../service/workspaceService.js";

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
      const workspace = this.wokspaceService.getWorkspaceById(
        channel.workspaceId,
        userId
      );

      if (workspace) return channel;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}

export default ChannelService;
