import { deleteWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useDeleteWorkspace = (workspaceId) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deleteWorkspaceMutation,
  } = useMutation({
    mutationFn: (workspaceId) =>
      deleteWorkspaceRequest({ workspaceId, token: auth?.token }),
    onSuccess: (data) => {
      console.log("Successfully deleted workspace", data);
    },
    onError: (error) => {
      console.error("Failed to delete workspace", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    deleteWorkspaceMutation,
  };
};
