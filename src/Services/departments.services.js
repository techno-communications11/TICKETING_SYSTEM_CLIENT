const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios"

export const addDepartmentsServices = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/department/add-departments`, { data });
        return response
    } catch (error) {
        throw error;
    }
}
export const getAllDepartmentsServices = async () => {
    try {
        const response = await axios(`${API_URL}/department/get-all-departments`);
        return response
    } catch (error) {
        throw error;
    }
}
export const deleteDepartmentServices = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/department/delete-department`, { id });
        return response
    } catch (error) {
        throw error;
    }
}
export const updateDepartmentServices = async (id, data) => {
    try {
        const response = await axios.post(`${API_URL}/department/update-departments-controllers`, { id, data });
        return response
    } catch (error) {
        throw error;
    }
}