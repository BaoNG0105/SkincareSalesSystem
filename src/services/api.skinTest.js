import api from "../config/axios";
import { toast } from "react-toastify";


export const postSkinTestResult = async (formData) => {
    try {
        const response = await api.post("test-result", formData);
        return response.data;
      } catch (error) {
        toast.error(error.response.data);
      }
};