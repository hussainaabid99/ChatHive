import { StatusCodes } from "http-status-codes";
import WorkspaceRepository from "../repositories/workspaceRepository.js";
import ClientError from "../utils/errors/clientError.js";
import UserRepository from "../repositories/userRepository.js";
import WorkspaceService from "./workspaceService.js";

export default class MemberService {
  constructor() {
    this.workspaceRepository = new WorkspaceRepository();
    this.workspaceService = new WorkspaceService();
  }
  async isMemberPartOfWorkspace(workspaceId, memberId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace) {
        throw new ClientError({
          explanation: "Invalid data sent from the client",
          message: "Workspace not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      const isMember = await this.workspaceService._isMember(
        workspace,
        memberId
      );
      if (!isMember) {
        throw new ClientError({
          explanation: "User is not a member of the workspace",
          message: "User is not a member of the workspace",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }
      const userRepository = new UserRepository();
      const user = await userRepository.getById(memberId);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer", error);
      throw error;
    }
  }
}
