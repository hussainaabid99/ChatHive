import { fetchWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorkspaces = () => {
  const { auth } = useAuth();

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
