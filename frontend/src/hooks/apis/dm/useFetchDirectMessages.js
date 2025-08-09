import { fetchDMsRequest } from "@/apis/dm";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchDirectMessages = (userId) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    data: dms,
  } = useQuery({
    queryFn: () => fetchDMsRequest({ userId, token: auth?.token }),
    queryKey: ["fetchDirectMessages"],
    cacheTime: 0,
  });

  return {
    isFetching,
    error,
    isSuccess,
    dms,
  };
};
