import { SignInRequest } from "@/apis/auth";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useSignin = () => {
  const { toast } = useToast();
  const { setAuth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: SignInRequest,
    onSuccess: (response) => {
      console.log("Successfully signed in", response);

      const userData = JSON.stringify(response.data);
      localStorage.setItem("user", userData);
      localStorage.setItem("token", response.data.token);

      setAuth({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });

      toast({
        title: "Successfully signed in",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to sign in", error);
      toast({
        title: "Failed to sign in",
        type: "error",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signinMutation,
  };
};
