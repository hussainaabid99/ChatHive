import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { InfoIcon, SearchIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const WorkspaceNavbar = () => {
  const { workspaceId } = useParams();
  console.log(workspaceId, typeof workspaceId);
  const { isFetching, workspace } = useGetWorkspaceById(workspaceId);
  console.log(workspace);
  return (
    <nav className="flex items-center justify-center p-1.5 bg-theme-dark h-10">
      <div className="flex-1"></div>
      <div>
        <Button
          size="sm"
          className="bg-accebt/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
        >
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-xs">
            Search {workspace?.data?.name || "Workspace"}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
