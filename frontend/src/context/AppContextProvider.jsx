import CombineContext from "@/utils/CombineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContextProvider";
import { WorkspacePreferencesModalContextProvider } from "./WorkspacePreferencesModalContext";
import CreateChannelModalContextProvider from "./CreateChannelModalContext";
import WorkspaceContextProvider from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesProvider } from "./ChannelMessages";
import { DirectMessagesProvider } from "./DirectMessages";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  ChannelMessagesProvider,
  DirectMessagesProvider,
  SocketContextProvider,
  WorkspaceContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelModalContextProvider
);
