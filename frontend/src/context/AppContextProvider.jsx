import CombineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContextProvider";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider
);
