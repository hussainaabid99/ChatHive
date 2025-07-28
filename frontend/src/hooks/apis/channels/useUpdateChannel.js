import { updateChannelNameRequest } from "@/apis/channels";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateChannel = (channelId) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateChannelMutation,
  } = useMutation({
    mutationFn: (name) =>
      updateChannelNameRequest({ channelId, name, token: auth?.token }),
    onSuccess: (data) => {
      console.log("Channel updated successfully", data);
    },
    onError: (eror) => {
      console.log("Error in updating channel", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateChannelMutation,
  };
};
