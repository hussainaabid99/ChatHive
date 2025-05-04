import Channel from "../schema/channel.js";
import CrudRepository from "./crudRepository.js";

class ChannelRepository extends CrudRepository {
  constructor() {
    super(Channel);
  }
  async getChannelWithWorkspaceDetails(channelId) {
    const channel = await Channel.findById(channelId).populate("workspaceId");
    return channel;
  }
}

export default ChannelRepository;
