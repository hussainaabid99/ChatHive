import MessageRepository from "../repositories/messageRepository.js";
import ChannelRepository from "../repositories/channelRepository.js";
import MemberService from "../service/memberService.js";
import { StatusCodes } from "http-status-codes";

class MessageService {
  constructor() {
    this.messageRepository = new MessageRepository();
    this.channelRepository = new ChannelRepository();
    this.memberService = new MemberService();
  }

  async getMessageService(messageParams, page, limit, user) {
    try {
      const channelDetails =
        await this.channelRepository.getChannelWithWorkspaceDetails(
          messageParams.channelId
        );

      const isMember = this.memberService.isMemberPartOfWorkspace(
        channelDetails.workspaceId,
        user
      );

      if (!isMember) {
        throw new ClientError({
          explanation: "User is not a member of the workspace",
          message: "User is not a member of the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }

      const messages = await this.messageRepository.getPaginatedMessage(
        messageParams,
        page,
        limit
      );
      return messages;
    } catch (error) {
      console.log("Something went wrong in Service layer", error);
      throw error;
    }
  }

  async createMessage(message) {
    const newMessage = await this.messageRepository.create(message);
    const messageDetails = await this.messageRepository.getMessageDetails(
      newMessage._id
    );
    return newMessage;
  }
}

export default MessageService;
