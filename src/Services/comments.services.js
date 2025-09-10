const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

export const addCommentServices = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/comment/createComment`, { data });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getCommentServices = async () => {
    try {
        const response = await axios(`${API_URL}/comment/getAllComments`);
        return response.data;
    } catch (error) {
        throw error;
    }
}