import api from "../config/axios";
import { toast } from "react-toastify";

export const getOrderIdAndStatusByUserId = async (customerId) => {
  try {
    const response = await api.get(`order/${customerId}/status`, {
      params: { status: "PENDING" },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// API create orderId (if orderId is not exist)
export const postOrderId = async (submitData) => {
  try {
    const response = await api.post("order", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// API add order-items to add product to cart
export const postOrderItems = async (submitData) => {
  try {
    const response = await api.post("order-items", submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// API update order-items by orderId & productId
export const updateOrderItems = async (id, submitData) => {
  try {
    const response = await api.put(`order-items/${id}`, submitData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// API delete order-items by orderItemId
export const deleteOrderItemsByOrderItemId = async (id) => {
  try {
    const response = await api.delete(`order-items/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
