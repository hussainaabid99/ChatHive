import { WorkspaceContext } from "@/context/WorkspaceContext";
import { useContext } from "react";

export default function useCurrentWorkspace() {
  return useContext(WorkspaceContext);
}
