import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspaces/useUpdateWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { useConfirm } from "@/hooks/useConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferencesModal = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { openPreferences, initialValue, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();
  const { deleteWorkspaceMutation } = useDeleteWorkspace();

  const { confirnmation, ConfirmDialog } = useConfirm({
    title: "Do you want to delete this workspace?",
    message: "This action cannot be undone.",
  });

  const { isPending, isSuccess, updateWorskspaceMutation } = useUpdateWorkspace(
    workspace?._id
  );

  const [editOpen, setEditOpen] = useState(false);
  const [rename, setRename] = useState(workspace?.name);

  const { toast } = useToast();

  function handleClose() {
    setOpenPreferences(false);
  }

  useEffect(() => {
    setRename(workspace?.name);
  }, [workspace]);

  async function handelFormSubmit(e) {
    e.preventDefault();
    try {
      await updateWorskspaceMutation(rename);
      if (isSuccess) {
        toast({
          title: "Workspace name updated successfully",
          type: "success",
        });
      }
      setEditOpen(false);
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
    } catch (error) {
      console.log("Error updating workspace name:", error);
      toast({
        title: "Failed to update workspace name",
        type: "error",
      });
    }
  }

  async function handleDeleteWorkspace() {
    try {
      const ok = await confirnmation();
      if (!ok) return;
      await deleteWorkspaceMutation(workspace?._id);
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
    <>
      <ConfirmDialog />
      <Dialog open={openPreferences} onOpenChange={handleClose}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{initialValue}</DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {workspace?.name || "Workspace Name"}
                    </p>
                    <p>Edit</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Workspace Name</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handelFormSubmit}>
                  <Input
                    value={rename}
                    onChange={(e) => setRename(e.target.value)}
                    required
                    autoFocus
                    placeholder="Enter new workspace name"
                    minLength={3}
                    maxLength={50}
                    disabled={isPending}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant="default"
                      type="submit"
                      disabled={isPending}
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <button
              className="flex items-center gap-x-2 px-5 py-4 border bg-white rounded-lg hover:bg-gray-50"
              onClick={handleDeleteWorkspace}
            >
              <Trash2Icon className="size-5" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
