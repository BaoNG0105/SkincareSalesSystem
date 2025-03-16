import api from "../config/axios";
import { toast } from "react-toastify";

//API get all users
export const getUsers = async () => {
  try {
    const response = await api.get("users");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API get user by id
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`users/${userId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API update user
export const updateUserById = async (userId, userData) => {
  try {
    const response = await api.put(`users/${userId}`, userData);
    return response.data;
  } catch (error) { 
    toast.error(error.response.data);
  }
};

//API delete user
export const deleteUser = async (userId) => { 
  try {
    const response = await api.delete(`users/${userId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};


