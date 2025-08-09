import axios from "../../config/axiosConfig";

export const sendDMRequest = async (receiverId, body, image, token) => {
  try {
    const response = await axios.post(
      "/dm",
      {
        receiverId,
        body,
        image,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const fetchDMsRequest = async ({ userId, token }) => {
  try {
    const response = await axios.get(`/dm/${userId}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
