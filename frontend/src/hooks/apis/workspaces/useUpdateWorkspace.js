import { updateWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateWorkspace = (workspaceId) => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateWorskspaceMutation,
  } = useMutation({
    mutationFn: (name) =>
      updateWorkspaceRequest({ name, token: auth?.token, workspaceId }),
    onSuccess: (data) => {
      console.log("Successfully updated workspace", data);
    },
    onError: (error) => {
      console.log("Failed to update workspace", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateWorskspaceMutation,
  };
};
