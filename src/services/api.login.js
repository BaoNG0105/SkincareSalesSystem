import api from "../config/axios";
import { toast } from "react-toastify";

//API post login
export const postLogin = async (submitData) => {
  try {
    const response = await api.post("auth/login", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API initiate Google login
export const initiateGoogleLogin = async () => {
  try {
    const response = await api.get("auth/login-with-google");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Failed to start Google login");
  }
};

//API handle Google callback
export const handleGoogleCallback = async (code) => {
  try {
    const response = await api.get("auth/login-with-google/callback", {
      params: { code }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Google authentication failed");
  }
};

export const postLoginGoogle = async (accessToken) => {
  try {
    const response = await api.post("auth/login-with-google", {
      accessToken: accessToken
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Google login failed");
  }
};

