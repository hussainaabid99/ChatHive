import User from "../schema/user.js";
import CrudRepository from "../repositories/crudRepository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async signUpUser(data) {
    try {
      const newUser = new User(data);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const res = await User.findOne({ email });
      return res;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const res = await User.findOne({ username }).select("-password");
      return res;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async getByToken(token) {
    try {
      const user = await User.findOne({ verificationToken: token });
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}

export default UserRepository;
