import { getSignatureRequest } from "@/apis/cloudinary";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetCloudinarySignature = () => {
  const { auth } = useAuth();
  const {
    isFetched,
    data: signatureRes,
    isSuccess,
    error,
  } = useQuery({
    queryFn: () => getSignatureRequest({ token: auth?.token }),
    queryKey: ["cloudinary-signature"],
    enabled: false,
  });

  return {
    isFetched,
    signatureRes,
    isSuccess,
    error,
  };
};
