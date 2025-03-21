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

//API update user password
export const updateUserPassword = async (userId, passwordData) => {
  try {
    const response = await api.put(`users/password/${userId}`, passwordData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API update user by userId
export const updateUserById = async (userId, userData) => {
  try {
    const response = await api.put(`users/${userId}`, userData);
    return response.data;
  } catch (error) { 
    toast.error(error.response.data);
  }
};

//API delete user by userId
export const deleteUserByUserId = async (id) => { 
  try {
    const response = await api.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API post staff
export const postStaff = async (submitData) => {
  try {
    const response = await api.post("users/create-staff", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
