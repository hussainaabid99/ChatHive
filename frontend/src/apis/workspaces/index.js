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

    return response?.data?.data;
  } catch (error) {
    console.error(error);
    throw error.response;
  }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.delete(`/workspace/${workspaceId}`, {
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

export const updateWorkspaceRequest = async ({ name, workspaceId, token }) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}`,
      { name },
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

export const addChannelToWorkspaceRequest = async ({
  workspaceId,
  channelName,
  token,
}) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/channels`,
      { channelName, workspaceId },
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

export const resetWorkspaceJoinCodeRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/joinCode/reset`,
      {},
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

export const joinWorkspaceRequest = async ({
  workspaceId,
  joinCode,
  token,
}) => {
  try {
    const response = await axios.put(
      `/workspace/${workspaceId}/join`,
      {
        joinCode,
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
