import api from "../config/axios";
import { toast } from "react-toastify";


//API post Test Result
export const postSkinTestResult = async (formData) => {
    try {
        const response = await api.post("test-result", formData);
        return response.data;
    } catch (error) {
        toast.error(error.response.data);
    }
};

//API get Routines By Test Result
export const getRoutinesByTestResult = async (skinTypeId) => {
    try {
        const response = await api.get(`skin-care-routines/by-skin-type/${skinTypeId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data);
    }
};
