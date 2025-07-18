import CreateWorkspaceContext from "@/context/CreateWorkspaceContextProvider";
import { useContext } from "react";

export const useCreateWorkspaceModal = () => {
  return useContext(CreateWorkspaceContext);
};
