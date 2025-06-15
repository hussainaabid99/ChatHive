import { StatusCodes } from "http-status-codes";
import {
  CustomErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "../common/responseObject.js";
import MemberService from "../service/memberService.js";

const memberService = new MemberService();

export const isMemberPartOfWorkspace = async (req, res) => {
  console.log(req.params);
  try {
    const response = await memberService.isMemberPartOfWorkspace(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(response, "User is a member of the workspace"));
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
