import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import useCurrentWorkspace from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Hash } from "lucide-react";
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
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
        <DialogHeader className="space-y-3">
          <div>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Create Channel
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Add a new channel to {currentWorkspace?.name}
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Channel Name
            </label>
            <Input
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="e.g., general, announcements, random"
              minLength={3}
              maxLength={20}
              disabled={isPending}
              required
              className="border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
            />
          </div>
          <DialogFooter className="flex gap-3">
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
                "Create Channel"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
