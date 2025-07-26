import { useJoinWorkspace } from "@/hooks/apis/workspaces/useJoinWorkspace";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import VerificationInput from "react-verification-input";

export const JoinPage = () => {
  const { workspaceId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { joinWorkspaceMutation, isPending } = useJoinWorkspace(workspaceId);

  async function handleAddMemberToWorkpsace(joinCode) {
    try {
      await joinWorkspaceMutation(joinCode);
      toast({
        title: "You have been added to workspace successfully",
        type: "success",
      });
      navigate(`/workspaces/${workspaceId}`);
    } catch (error) {
      console.log("Error while adding memeber to workspace", error);
    }
  }

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm h-screen">
      <div className="flex flex-col gap-y-4 items-center justify-center p-4">
        <h1 className="font-bold text-3xl text-gray-800">Join Workspace</h1>
        <p className="text-gray-600">
          Enter the join code provided by your workspace administrator.
        </p>
      </div>
      <VerificationInput
        length={8}
        classNames={{
          container: "flex gap-x-2",
          character:
            "h-auto rounded-md border border-gray-300 text-center flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focues:ring-1 focus:ring-blue-500",
          characterInactive: "bg-muted",
          characterFilled: "bg-white text-black",
          characterSelected: "bg-white text-black",
        }}
        onComplete={handleAddMemberToWorkpsace}
        disabled={isPending}
        autoFocus
      />
    </div>
  );
};
