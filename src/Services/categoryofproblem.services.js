const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

export const addNewCategory = async ({ name, department, departmentEmail }) => {
    try {
        const response = await axios.post(`${API_URL}/pcategory/addproblemcateroy`, {
            name,
            department: department,
            department_email: departmentEmail
        });
        return response.data;
    } catch (error) {
        console.error("Error adding new category:", error.message);
        throw error;
    }
}

export const getAllProblemCategory = async () => {
    try {
        // const response = await axios('http://localhost:8000/pcategory/getAlldata');
        // const response = await axios('https://ticketing-system-sever.vercel.app/pcategory/getAlldata');
        const response = await axios(`${API_URL}/pcategory/getAlldata`);
        return response
    } catch (error) {
        throw error;
    }
}
export const deleteProblemCategory = async (id) => {
    try {
        // const response = await axios('http://localhost:8000/pcategory/getAlldata');
        // const response = await axios('https://ticketing-system-sever.vercel.app/pcategory/getAlldata');
        const response = await axios.post(`${API_URL}/pcategory/delete-problem-category`,{id});
        return response
    } catch (error) {
        throw error;
    }
}