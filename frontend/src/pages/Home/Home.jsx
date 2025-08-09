import { useFetchWorkspaces } from "@/hooks/apis/workspaces/useFetchWorkspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { isFetching, isSuccess, workspaces, error } = useFetchWorkspaces();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) return;

    // Handle error cases first
    if (error) {
      if (error.response.status === 403) {
        logout();
        navigate("/auth/signin");
        toast({
          title: "🔒 Session expired. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "❌ Failed to load workspaces",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    if (workspaces && workspaces.length > 0) {
      navigate(`/workspaces/${workspaces[0]._id}/`);
    } else {
      setOpenCreateWorkspaceModal(true);
    }
  }, [
    isFetching,
    isSuccess,
    error,
    workspaces,
    navigate,
    logout,
    toast,
    setOpenCreateWorkspaceModal,
  ]);

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
