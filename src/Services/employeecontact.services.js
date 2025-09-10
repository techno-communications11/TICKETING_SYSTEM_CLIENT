const API_URL = import.meta.env.VITE_API_URL;


import axios from "axios";

export const addManullyEmployeeContactServices = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/employee/addmanuallynewemployee`, { data });
        return response
    } catch (error) {
        throw error;
    }
}


export const getAllEmployeeContactServices = async () => {
    try {
        const response = await axios(`${API_URL}/employee/getEmployee`);
        return response
    } catch (error) {
        throw error;
    }
}