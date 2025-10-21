const API_URL = import.meta.env.VITE_API_URL;


import axios from "axios";

export const getAllLogsServices = async () => {
    try {
        const resposne = await axios(`${API_URL}/logs/getAllLogs`);
        // const resposne = await axios(`${API_URL}/logs/getAllLogs`);
        return resposne
    } catch (error) {
        throw error;
    }
}
export const deleteLogsServices = async (id) => {
    try {
        const resposne = await axios.post(`${API_URL}/logs/delete-logs`, { id });
        return resposne
    } catch (error) {
        throw error;
    }
}