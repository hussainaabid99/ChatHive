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
    <nav className="flex items-center justify-center p-1.5 bg-theme-dark h-10">
      <div className="flex-1"></div>
      <div>
        <Button
          size="sm"
          className="bg-accebt/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
        >
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-xs">
            Search {workspace?.name || "Workspace"}
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
