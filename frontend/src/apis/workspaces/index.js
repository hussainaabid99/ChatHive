import axios from "@/config/axiosConfig";

export const createWorkspaceRequest = async ({ name, description, token }) => {
  try {
    const response = await axios.post(
      "/workspace",
      { name, description },
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

export const fetchWorkspaceRequest = async ({ token }) => {
  try {
    const response = await axios.get("/workspace", {
      headers: {
        "x-access-token": token,
      },
    });
    console.log("Response in fetch workspace request", response);
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const fetchWorkspaceDetailRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.get(`/workspace/${workspaceId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
