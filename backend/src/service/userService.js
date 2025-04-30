import createJWT from "../common/authUtil.js";
import UserRepository from "../repositories/userRepository.js";
import ClientError from "../utils/errors/clientError.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async SignUp(data) {
    try {
      const newUser = await this.userRepository.create(data);
      return newUser;
    } catch (error) {
      console.log("Something went wrong in Service layer", error);
      throw error;
    }
  }

  async SignIn(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "No registered user found with this email",
          statusCode: StatusCodes.NOT_FOUND,
        });

      const isMatch = bcrypt.compareSync(data.password, user.password);

      if (!isMatch)
        throw new ClientError({
          explanation: "Invalid credentials provided by the client",
          message: "Incorrect password for the given email",
          statusCode: StatusCodes.UNAUTHORIZED,
        });

      return {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        token: createJWT({ id: user._id, email: user.email }),
      };
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
}

export default UserService;
