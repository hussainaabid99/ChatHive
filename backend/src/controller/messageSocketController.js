import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT,
} from "../common/eventConstants.js";
import MessageService from "../service/messageService.js";

export default function messageHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const messageService = new MessageService();
    const { channelId } = data;
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    cb({
      success: true,
      message: "Successfully created the message",
      data: messageResponse,
    });
  });
}
