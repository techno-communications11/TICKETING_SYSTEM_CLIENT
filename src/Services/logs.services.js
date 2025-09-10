const API_URL = import.meta.env.VITE_API_URL;


import axios from "axios";

export const getAllLogsServices = async () => {
    try {
        const resposne = await axios(`${API_URL}/logs/getAllLogs`);
        return resposne
    } catch (error) {
        throw error;
    }
}