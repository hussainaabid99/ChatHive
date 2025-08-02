import { StatusCodes } from "http-status-codes";
import {
  CustomErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "../common/responseObject.js";
import MessageService from "../service/messageService.js";
import cloudinary from "cloudinary";

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
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(signedUrl, "Signed URL fetched successfully"));
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
