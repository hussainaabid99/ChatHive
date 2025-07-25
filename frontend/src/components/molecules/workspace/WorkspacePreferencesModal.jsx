import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferencesModal = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { openPreferences, initialValue, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const { deleteWorkspaceMutation } = useDeleteWorkspace();
  const { toast } = useToast();

  function handleClose() {
    setOpenPreferences(false);
  }

  async function handleDeleteWorkspace() {
    try {
      await deleteWorkspaceMutation(workspace._id);
      navigate("/home");
      queryClient.invalidateQueries("fetchWorkspaces");
      setOpenPreferences(false);
      handleClose();
      toast({
        title: "Workspace deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.log("Failed to delete workspace:", error);
      toast({
        title: "Failed to delete workspace",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={openPreferences} onOpenChange={handleClose}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{initialValue}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Workpace Name</p>
              <p>Edit</p>
            </div>
          </div>
          <button
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg hover:bg-gray-50"
            onClick={handleDeleteWorkspace}
          >
            <Trash2Icon className="size-5" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
