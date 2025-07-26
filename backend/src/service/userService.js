import createJWT from "../common/authUtil.js";
import { verifyEmail } from "../common/mailObject.js";
import { ENABLE_EMAIL_VERIFICATION } from "../config/serverConfig.js";
import { addEmailtoMailQueue } from "../producers/mailQueueProducer.js";
import UserRepository from "../repositories/userRepository.js";
import ClientError from "../utils/errors/clientError.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async SignUp(data) {
    try {
      const newUser = await this.userRepository.signUpUser(data);
      if (ENABLE_EMAIL_VERIFICATION) {
        addEmailtoMailQueue({
          ...verifyEmail(newUser.verificationToken),
          to: newUser.email,
        });
      }
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

  async verifyTokenService(token) {
    try {
      const user = await this.userRepository.getByToken(token);
      if (!user)
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Invalid token",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      if (user.verificationTokenExpiry < Date.now()) {
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Token has expired",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      user.isVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpiry = null;
      await user.save();
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
}

export default UserService;
