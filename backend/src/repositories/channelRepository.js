import Channel from "../schema/channel.js";
import CrudRepository from "./crudRepository.js";

class ChannelRepository extends CrudRepository {
  constructor() {
    super(Channel);
  }
}

export default ChannelRepository;
