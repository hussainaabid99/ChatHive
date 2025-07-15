import { StatusCodes } from "http-status-codes";
import {
  CustomErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "../common/responseObject.js";
import MessageService from "../service/messageService.js";

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
