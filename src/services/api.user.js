import api from "../config/axios";
import { toast } from "react-toastify";

//API get all user
export const getUser = async () => {
  try {
    const response = await api.get("users");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API get user by id 
export const getUserById = async (id) => {
  try {
    const response = await api.get(`users/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API update user
export const updateUser = async (id, submitData) => {
  try {
    const response = await api.put(`users/${id}`, submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API delete user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

