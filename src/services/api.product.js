import api from "../config/axios"
import { toast } from "react-toastify"

//API get all product
export const getProduct = async () => {
    try {
        const response = await api.get("products")
        return response.data;
    } catch (error) {
        toast.error(error.response.data);
    }
};

export const postProduct = async (submitData) => {
    try {
        const response = await api.post("products", submitData);
        return response.data;
    } catch (error) {
        toast.error(error.response.data);
    }
};

