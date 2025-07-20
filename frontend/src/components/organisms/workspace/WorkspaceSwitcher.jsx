import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchWorkspaces } from "@/hooks/apis/workspaces/useFetchWorkspaces";

export const WorkspaceSwitcher = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { isFetching, workspace } = useGetWorkspaceById(workspaceId);
  const { isFetching: isFetchingWorkspaces, workspaces } = useFetchWorkspaces();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-theme-indigo hover:bg-theme-indigo/80 font-semibold text-slate-800 text-xl">
          {isFetching ? (
            <Loader2 className="size-5 animate-spin text-theme-dark" />
          ) : (
            workspace?.name.charAt(0).toUpperCase() || "U"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
          {workspace?.name}
          <span className="text-xs text-muted-foreground">(Active Tab)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isFetchingWorkspaces ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          workspaces?.map((workspace) => {
            if (workspace._id === workspaceId) return null;
            return (
              <DropdownMenuItem
                className="cursor-pointer flex-col justify-start items-start"
                key={workspace._id}
                onClick={() => navigate(`/workspaces/${workspace._id}`)}
              >
                <p className="truncate">{workspace?.name}</p>
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
