import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResetJoinCode } from "@/hooks/apis/workspaces/useResetJoinCode";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CopyIcon, RefreshCcw } from "lucide-react";

export const WorkspaceInviteModal = ({
  workspaceId,
  workspaceName,
  joinCode,
  openInviteModal,
  setOpenInviteModal,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isPending, isSuccess, resetJoinCodeMutation } = useResetJoinCode();

  async function handleCopy() {
    await navigator.clipboard.writeText(joinCode);
    toast({
      title: "Code copied to clipboard",
      type: "success",
    });
  }

  async function handleReset() {
    try {
      await resetJoinCodeMutation(workspaceId);
      toast({
        title: "Join code reset successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [`fetchWorkspaceById-${workspaceId}`],
      });
    } catch (error) {
      toast({
        title: "Error resetting join code",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
          <DialogDescription>
            Use code below to invite users to {workspaceName}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center bg-gray-200 rounded-md px-4 py-6 my-2">
          <p className="font-semibold font-mono text-4xl uppercase">
            {joinCode}
          </p>
        </div>
        <DialogFooter className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
            disabled={isPending}
          >
            <RefreshCcw className="size-4" />
            Reset Code
          </Button>
          <Button
            variant="default"
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            <CopyIcon className="size-4" />
            Copy Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
