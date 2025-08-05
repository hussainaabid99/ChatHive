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
import { CopyIcon, ExternalLink, Loader2, RefreshCcw } from "lucide-react";

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
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
        <DialogHeader className="space-y-3">
          <div>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Invite to Workspace
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Use code below to invite users to {workspaceName}.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-slate-200 rounded-lg px-6 py-8 hover:border-theme-indigo/30 transition-colors">
          <p className="font-semibold font-mono text-3xl uppercase text-slate-900 tracking-widest">
            {joinCode}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            {" "}
            Direct Link
          </label>
          <a
            className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-theme-indigo/10 border border-theme-indigo/20 rounded-lg text-theme-indigo hover:bg-theme-indigo/20 transition-colors group"
            href={`/workspaces/join/${workspaceId} `}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="size-4" />
            <span className="font-medium">Open Join Page</span>
          </a>
        </div>
        <DialogFooter className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 flex-1"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <RefreshCcw className="size-4" />
            )}
            Reset Code
          </Button>
          <Button
            variant="default"
            onClick={handleCopy}
            className="flex items-center gap-2 flex-1 bg-theme-indigo hover:bg-theme-medium text-white"
          >
            <CopyIcon className="size-4" />
            Copy Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
