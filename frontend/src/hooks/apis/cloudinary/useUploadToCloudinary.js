import { uploadImageToCloudinaryRequest } from "@/apis/cloudinary";
import { useMutation } from "@tanstack/react-query";

export const useUploadToCloudinary = () => {
  return useMutation({
    mutationFn: async ({ file, signatureRes }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signatureRes.signature);
      formData.append("api_key", signatureRes.apiKey);
      formData.append("timestamp", signatureRes.timestamp);

      return await uploadImageToCloudinaryRequest({
        cloudName: signatureRes.cloudName,
        formData,
      });
    },
    onSuccess: (data) => {
      console.log("Image uploaded successfully", data.secure_url);
    },
    onError: (error) => {
      console.error("Error uploading image", error);
    },
  });
};
