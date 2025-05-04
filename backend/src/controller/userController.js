import { StatusCodes } from "http-status-codes";
import UserService from "../service/userService.js";
import {
  CustomErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "../common/responseObject.js";

const userService = new UserService();

export const SignUp = async (req, res) => {
  try {
    const user = await userService.SignUp(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse(user, "User created successfully"));
  } catch (error) {
    console.log("Something went wrong in controller layer", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(CustomErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(InternalServerErrorResponse(error));
  }
};

export const SignIn = async (req, res) => {
  try {
    const user = await userService.SignIn(req.body);
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(user, "Login Successfull"));
  } catch (error) {
    console.log("Something went wrong in controller layer", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(CustomErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(InternalServerErrorResponse(error));
  }
};
