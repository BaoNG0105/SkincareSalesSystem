import api from "../config/axios";
import { toast } from "react-toastify";

//API get user to Backend
export const getUser = async () => {
  try {
    const response = await api.get("users");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API get user by id to Backend
export const getUserById = async (id) => {
  try {
    const response = await api.get(`users/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
