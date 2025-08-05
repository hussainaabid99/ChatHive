import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar";
import { useFetchWorkspaces } from "@/hooks/apis/workspaces/useFetchWorkspaces";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspaces();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) return;

    if (workspaces.length === 0 || !workspaces) {
      setOpenCreateWorkspaceModal(true);
    } else {
      navigate(
        `/workspaces/${workspaces[0]._id}/channels/${workspaces[0].channels[0]}`
      );
    }
  }, [workspaces, isFetching, navigate, setOpenCreateWorkspaceModal]);

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-theme-indigo mx-auto" />
          <p className="text-slate-600 font-medium">
            Loading your workspaces...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-theme-indigo mx-auto" />
        <p className="text-slate-600 font-medium">
          Redirecting to your workspace...
        </p>
      </div>
    </div>
  );
};
