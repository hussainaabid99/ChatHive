import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useAuth } from "@/hooks/context/useAuth";
import useCurrentWorkspace from "@/hooks/context/useCurrentWorkspace";
import { InfoIcon, Loader2, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const WorkspaceNavbar = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const { isFetching, workspace, error, isSuccess } =
    useGetWorkspaceById(workspaceId);
  const { setCurrentWorkspace } = useCurrentWorkspace();
  const { logout } = useAuth();

  useEffect(() => {
    if (!isFetching && !isSuccess && error) {
      console.log("Error fetching workspace", error.status);
      if (error.status === 403) {
        logout();
        navigate("/auth/signin");
      }
    }

    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  }, [workspace, setCurrentWorkspace, isSuccess, isFetching, error]);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-1.5 bg-theme-dark h-10">
        <Loader2 className="animate-spin text-theme-indigo" />
      </div>
    );
  }
  return (
    <nav className="flex items-center justify-between p-2  bg-gradient-to-r from-theme-dark to-theme-medium h-10 shadow-lg">
      <div className="flex-1"></div>
      <div>
        <Button
          size="sm"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white w-full max-w-md justify-start h-7 px-3 rounded-lg transition-all duration-200"
        >
          <SearchIcon className="size-4 text-white/80 mr-2" />
          <span className="text-white/90 text-xs">
            Search {workspace?.name || "Workspace"}
          </span>
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <Button
          variant="ghost"
          size="iconSm"
          className="text-white/80 hover:bg-white/10 rounded-full transition-all duration-200"
        >
          <InfoIcon className="size-4" />
        </Button>
      </div>
    </nav>
  );
};
