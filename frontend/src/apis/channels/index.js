import axios from "@/config/axiosConfig";

export const getChannelByIdRequest = async ({ channelId, token }) => {
  try {
    const response = await axios.get(`/channels/${channelId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error in getChannelByIdRequest", error);
    throw error;
  }
};

export const updateChannelNameRequest = async ({ channelId, name, token }) => {
  try {
    const response = await axios.put(
      `/channels/${channelId}`,
      {
        name,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error in updateChannelNameRequest", error);
    throw error;
  }
};

export const getPaginatedMessageRequest = async ({
  channelId,
  limit,
  offset,
  token,
}) => {
  try {
    const response = await axios.get(`/messages/${channelId}`, {
      params: {
        limit: limit || 20,
        offset: offset || 0,
      },
      headers: {
        "x-access-token": token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log("Error in getPaginatedMessageRequest", error);
    throw error;
  }
};
