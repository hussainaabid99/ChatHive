import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateWorkspaceModal = () => {
  const [workspaceName, setWorkspaceName] = useState("");

  const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } =
    useCreateWorkspaceModal();

  const { isPending, createWorkspaceMutation } = useCreateWorkspace();
  const navigate = useNavigate();

  function handleClose() {
    setOpenCreateWorkspaceModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const data = await createWorkspaceMutation({ name: workspaceName });
      console.log("Created the workspace", data);
      navigate(`/workspaces/${data._id}`);
    } catch (error) {
      console.log("Not able to create a new workspace", error);
    } finally {
      setWorkspaceName("");
      setOpenCreateWorkspaceModal(false);
    }
  }

  return (
    <>
      <Dialog open={openCreateWorkspaceModal} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
          <DialogHeader className="space-y-3">
            <div className="flex items-center space-x-3">
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Create Workspace
                </DialogTitle>
                <DialogDescription className="text-slate-600 text-sm">
                  Start a new workspace to organize your team and projects
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Workspace Name
              </label>
              <Input
                required
                disabled={isPending}
                placeholder="Enter the workspace name e.g. MyWorkspace, Dev Workspace etc .."
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
              />
            </div>
            <DialogFooter className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-theme-indigo hover:bg-theme-medium text-white"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin size-4" />
                    Creating...
                  </div>
                ) : (
                  "Create Workspace"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
