import { fetchWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorkspaces = () => {
  const { auth, logout } = useAuth();
  const { toast } = useToast();

  const {
    isFetching,
    isSuccess,
    error,
    data: workspaces,
  } = useQuery({
    queryFn: (data) => fetchWorkspaceRequest({ ...data, token: auth?.token }),
    queryKey: ["fetchWorkspaces"],
    staleTime: 30000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspaces,
  };
};
