import User from "../schema/user.js";
import CrudRepository from "../repositories/crudRepository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    try {
      const res = await User.findOne({
        email: email,
      });
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const res = await User.findOne({
        username: username,
      });
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}

export default UserRepository;
