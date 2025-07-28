import axios from "@/config/axiosConfig";

export const SignUpRequest = async ({ email, password, username }) => {
  try {
    const response = await axios.post("/users/signup", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const SignInRequest = async ({ email, password }) => {
  try {
    const response = await axios.post("/users/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
