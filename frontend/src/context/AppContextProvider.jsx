import CombineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContextProvider";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import CreateChannelModalContextProvider from "./CreateChannelModalContext";
import WorkspaceContextProvider from "./WorkspaceContext";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelModalContextProvider,
  WorkspaceContextProvider
);
