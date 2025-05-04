import { StatusCodes } from "http-status-codes";
import ChannelService from "../service/channelService.js";
import {
  CustomErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "../common/responseObject.js";

const channelService = new ChannelService();

export const getChannelWithWorkspaceController = async (req, res) => {
  try {
    const response = await channelService.getChannelWithWorkspace(
      req.params.channelId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(response, "Channel fetched successfully"));
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
