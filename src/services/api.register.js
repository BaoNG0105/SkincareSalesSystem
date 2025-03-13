import api from "../config/axios";
import { toast } from "react-toastify";

//API post register to Backend
export const postRegister = async (submitData) => {
  try {
    const response = await api.post("auth/register", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
