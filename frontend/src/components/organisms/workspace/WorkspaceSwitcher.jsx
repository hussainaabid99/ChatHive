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
        <Button className="size-10 relative overflow-hidden bg-gradient-to-br from-theme-indigo to-theme-medium hover:from-theme-indigo/90 hover:to-theme-medium/90 font-bold text-white/70 text-lg hover:shadow-lg transition-all duration-200">
          {isFetching ? (
            <Loader2 className="size-5 animate-spin text-white/70" />
          ) : (
            workspace?.name.charAt(0).toUpperCase() || "U"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm border-slate-200/50 shadow-xl">
        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-slate-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="size-8 bg-gradient-to-br from-theme-indigo to-theme-medium rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {workspace?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                {workspace?.name || "Unknown"}
              </p>
              <span className="text-xs text-slate-500">Active Workspace</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-200" />
        {isFetchingWorkspaces ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="size-5 animate-spin text-slate-500" />
          </div>
        ) : (
          workspaces?.map((workspace) => {
            if (workspace._id === workspaceId) return null;
            return (
              <DropdownMenuItem
                className="cursor-pointer p-3 hover:bg-gray-50 transition-colors"
                key={workspace._id}
                onClick={() => navigate(`/workspaces/${workspace._id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="size-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {workspace?.name?.charAt(0).toUpperCase() || "W"}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {workspace?.name}
                    </p>
                    <span className="text-xs text-slate-500">
                      {workspace?.members?.length || 0} members
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
