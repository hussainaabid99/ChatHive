import { WorkspacePanelHeader } from "@/components/molecules/workspace/WorkspacePanelHeader";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { Loader2, TriangleAlertIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();
  const { isFetching, isSuccess, workspace } = useGetWorkspaceById(workspaceId);

  if (isFetching) {
    return (
      <div className="w-full h-full justify-center flex items-center">
        <Loader2 className="animate-spin size-10 text-theme-indigo" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="w-full h-full justify-center flex items-center flex-col text-theme-indigo gap-y-2">
        <TriangleAlertIcon className="size-10" />
        <span className="font-semibold text-lg">Something went wrong!</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-theme-medium">
      <WorkspacePanelHeader workspace={workspace} />
    </div>
  );
};
