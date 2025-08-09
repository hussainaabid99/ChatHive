import { StatusCodes } from "http-status-codes";
import {
  CustomErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "../common/responseObject.js";
import MessageService from "../service/messageService.js";
import cloudinary from "cloudinary";
import { workspaceJoinMail } from "../common/mailObject.js";

const messageService = new MessageService();

export const getMessageController = async (req, res) => {
  try {
    const messages = await messageService.getMessageService(
      {
        channelId: req.params.channelId,
      },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(messages, "Messages fetched successfully"));
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

export const getSignatureController = async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = await cloudinary.utils.api_sign_request(
      { timestamp },
      cloudinary.config().api_secret
    );
    console.log(signature);
    return res.status(StatusCodes.OK).json(
      SuccessResponse(
        {
          timestamp,
          signature,
          apiKey: cloudinary.config().api_key,
          cloudName: cloudinary.config().cloud_name,
        },
        "Signed Cloudinary upload params fetched successfully"
      )
    );
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

export const getDMs = async (req, res) => {
  try {
    const userId = req.user;
    const otherUserId = req.params.userId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const DMs = await messageService.getDMsBetweenUsers(
      userId,
      otherUserId,
      page,
      limit
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(DMs, "DMs fetched successfully"));
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

export const sendDM = async (req, res) => {
  try {
    const { receiverId, body, image } = req.body;
    const senderId = req.user;
    const DM = await messageService.createMessage({
      senderId,
      receiverId,
      body,
      image,
      channelId: null,
      workspace: null,
    });
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(DM, "Message sent successfully"));
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
