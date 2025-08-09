import {
  JOIN_DM_EVENT,
  NEW_DM_RECEIVED_EVENT,
  NEW_DM_EVENT,
} from "../common/eventConstants.js";
import MessageService from "../service/messageService.js";

function getDMRoomName(userAId, userBId) {
  // Sort IDs to ensure both users join the same room
  const [id1, id2] = [userAId, userBId].sort();
  return `dm:${id1}:${id2}`;
}

export default function dmSocketHanlders(io, socket) {
  socket.on(JOIN_DM_EVENT, async function joinDMHandler(data, cb) {
    const user1 = data.senderId;
    const user2 = data.receiverId;
    const roomId = getDMRoomName(user1, user2);
    socket.join(roomId);
    console.log(` ${socket.id} joined the DM: ${roomId}`);
    cb?.({
      success: true,
      message: "Successfully joined the DM",
      data: roomId,
    });
  });

  socket.on(NEW_DM_EVENT, async function createDMHandler(data, cb) {
    const messageService = new MessageService();
    const { senderId, receiverId } = data;
    const messageResponse = await messageService.createMessage(data);
    await messageResponse.populate("senderId", "username avatar");
    io.to(getDMRoomName(senderId, receiverId)).emit(
      NEW_DM_RECEIVED_EVENT,
      messageResponse
    );
    cb({
      success: true,
      message: "Successfully sent the DM",
      data: messageResponse,
    });
  });
}
