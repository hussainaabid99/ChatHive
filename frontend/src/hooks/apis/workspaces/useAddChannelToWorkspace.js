import { addChannelToWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useAddChannelToWorkspace = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    mutateAsync: addChannelToWorkspaceMutation,
    error,
  } = useMutation({
    mutationFn: ({ channelName, workspaceId }) =>
      addChannelToWorkspaceRequest({
        channelName,
        workspaceId,
        token: auth?.token,
      }),
  });

  return {
    isPending,
    isSuccess,
    addChannelToWorkspaceMutation,
    error,
  };
};
