import axiosConfig from "@/config/axiosConfig";
import axios from "axios";

export const uploadImageToCloudinaryRequest = async ({
  cloudName,
  formData,
}) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Successfully uploaded image to cloudinary", response);
    return response.data;
  } catch (error) {
    console.log("Error while uploading image to cloudinary", error);
    throw error;
  }
};

export const getSignatureRequest = async ({ token }) => {
  try {
    const response = await axiosConfig.get("/messages/get-signature", {
      headers: {
        "x-access-token": token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log("Error while uploading image to cloudinary", error);
    throw error;
  }
};
