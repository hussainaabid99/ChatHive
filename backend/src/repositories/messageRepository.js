import Message from "../schema/message.js";
import CrudRepository from "./crudRepository.js";
class MessageRepository extends CrudRepository {
  constructor() {
    super(Message);
  }
  async getPaginatedMessage(messageParams, page, limit) {
    const messages = await Message.find(messageParams)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("senderId", "username email avatar");
    return messages;
  }
}

export default MessageRepository;
