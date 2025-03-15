import api from "../config/axios";
import { toast } from "react-toastify";

//API get all blog
export const getBlog = async () => {
  try {
    const response = await api.get("blogs");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API get blog by id
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`blogs/${id}`);  
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API post blog
export const postBlog = async (submitData) => {
  try {
    const response = await api.post("blogs", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
