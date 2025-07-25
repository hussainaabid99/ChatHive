import { resetWorkspaceJoinCodeRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useResetJoinCode = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: resetJoinCodeMutation,
  } = useMutation({
    mutationFn: async (workspaceId) =>
      resetWorkspaceJoinCodeRequest({
        token: auth?.token,
        workspaceId,
      }),
    onSuccess: (data) => {
      console.log("Join code reset successfully:", data);
    },
    onError: (error) => {
      console.error("Error resetting join code:", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    resetJoinCodeMutation,
  };
};
