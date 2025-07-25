import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import useCurrentWorkspace from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const CreateChannelModal = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [channelName, setChannelName] = useState("");
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const { currentWorkspace } = useCurrentWorkspace();
  const { addChannelToWorkspaceMutation, isPending, isSuccess } =
    useAddChannelToWorkspace();

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(currentWorkspace._id);
    try {
      console.log("Creating channel:", channelName);
      await addChannelToWorkspaceMutation({
        workspaceId: currentWorkspace?._id,
        channelName: channelName,
      });
      toast({
        type: "success",
        title: "Channel created successfully",
      });
      queryClient.invalidateQueries(
        `fetchWorkspaceById-${currentWorkspace?._id}`
      );
      handleClose();
    } catch (error) {
      console.log("Error creating channel:", error);
    }
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
            minLength={3}
            maxLength={20}
            disabled={isPending}
            required
          />
          <div className="flex justify-end mt-4">
            <Button variant="default" type="submit" disabled={isPending}>
              Create Channel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
