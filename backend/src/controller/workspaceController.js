import { StatusCodes } from "http-status-codes";
import WorkspaceService from "../service/workspaceService.js";
import {
  CustomErrorResponse,
  SuccessResponse,
  InternalServerErrorResponse,
} from "../common/responseObject.js";

const workspaceService = new WorkspaceService();

export const createWorkspaceController = async (req, res) => {
  try {
    const newWorkspace = await workspaceService.createWorkspace({
      ...req.body,
      owner: req.user,
    });
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse(newWorkspace, "Workspace created successfully"));
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

export const getWorkspaceUserIsMemberOfController = async (req, res) => {
  try {
    const response = await workspaceService.getWorkspacesUserIsMemberOf(
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(response, "Workspace fetched successfully"));
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

export const getWorkspaceByIdController = async (req, res) => {
  try {
    const workspace = await workspaceService.getWorkspaceById(
      req.params.workspaceId,
      req.user
    );
    console.log("req at ctrl", req);
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(workspace, "Workspace fetched successfully"));
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

export const deleteWorkspaceByIdController = async (req, res) => {
  try {
    const del = await workspaceService.deleteWorkspace(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(del, "Workspace deleted successfuully"));
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

export const getWorkspaceByJoinCodeController = async (req, res) => {
  try {
    const workspace = await workspaceService.getWorkspaceByJoinCode(
      req.params.joinCode,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(workspace, "Workspace successfully fetched"));
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

export const addMemberToWorkspaceController = async (req, res) => {
  try {
    console.log(req.params, req.body);
    const response = await workspaceService.addMemberToWorkspace(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || "member",
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(response, "User addded to workspace successfully"));
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

export const updateWorkspaceController = async (req, res) => {
  try {
    const response = await workspaceService.updateWorkspace(
      req.params.workspaceId,
      req.body,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(response, "Workspace updated successfully"));
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

export const addChannelToWorkspaceController = async (req, res) => {
  try {
    console.log(
      "controller",
      req.params.workspaceId,
      req.body.channelName,
      req.user
    );
    const response = await workspaceService.addChannelToWorkspace(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(
        SuccessResponse(response, "Channel successfully added to workspace")
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

export const resetWorkspaceJoinCodeController = async (req, res) => {
  try {
    const response = await workspaceService.resetWorkspaceJoinCode(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(
        SuccessResponse(response, "Workspace join code reset successfully")
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

export const joinWorkspaceController = async (req, res) => {
  try {
    const response = await workspaceService.joinWorkspaceService(
      req.params.workspaceId,
      req.body.joinCode,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse(response, "Workspace joined successfully"));
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
