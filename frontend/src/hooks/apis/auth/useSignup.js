import { useMutation } from "@tanstack/react-query";

import { SignUpRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignup = () => {
  const { toast } = useToast();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: SignUpRequest,
    onSuccess: (data) => {
      console.log("Successfully signed up", data);
      toast({
        title: "Successfully signed up",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to signup", error);
      toast({
        title: "Failed to signup",
        type: "error",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signupMutation,
  };
};
