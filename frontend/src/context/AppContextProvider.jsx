import CombineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContextProvider";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import CreateChannelModalContextProvider from "./CreateChannelModalContext";
import WorkspaceContextProvider from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesProvider } from "./ChannelMessages";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  WorkspaceContextProvider,
  CreateChannelModalContextProvider,
  ChannelMessagesProvider,
  SocketContextProvider
);
