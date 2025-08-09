import { sendDMRequest } from "@/apis/dm";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const SendDirectMessage = () => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: sendDMMutation,
    isError,
  } = useMutation({
    mutationFn: (data) => sendDMRequest({ ...data, token: auth?.token }),
    onSuccess: (data) => {
      console.log("DM sent successfully", data);
    },
    onError: (error) => {
      console.log("Error in sending DM", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    sendDMMutation,
    isError,
  };
};
