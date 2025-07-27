import { getChannelByIdRequest } from "@/apis/channels";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelById = (channelId) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isError,
    error,
    data: channelDetails,
  } = useQuery({
    queryFn: () => getChannelByIdRequest({ channelId, token: auth?.token }),
    queryKey: [`get-channel-${channelId}`],
  });

  return {
    isFetching,
    isError,
    error,
    channelDetails,
  };
};
