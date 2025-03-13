import api from "../config/axios";
import { toast } from "react-toastify";

//API get all product
export const getProduct = async () => {
  try {
    const response = await api.get("products");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API get product by id
export const getProductById = async (id) => {
    try {
      const response = await api.get(`products/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  };

//API post product
export const postProduct = async (submitData) => {
  try {
    const response = await api.post("products", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API update product
export const updateProduct = async (id, submitData) => {
  try {
    const response = await api.put(`products/${id}`, submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

//API delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
