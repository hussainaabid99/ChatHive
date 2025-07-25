import CombineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContextProvider";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import CreateChannelModalContextProvider from "./CreateChannelModalContext";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelModalContextProvider
);
