import api from "../config/axios";
import { toast } from "react-toastify";

//API post login to Backend
export const postLogin = async (submitData) => {
  try {
    const response = await api.post("auth/login", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
