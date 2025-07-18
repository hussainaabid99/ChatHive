import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new workspace</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <Input
              required
              disabled={isPending}
              placeholder="Enter the workspace name e.g. MyWorkspace, Dev Workspace etc .."
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
            <div className="flex justify-end mt-5">
              <Button disabled={isPending}>Create Workspace</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
