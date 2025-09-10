const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const getAllStores = async () => {
    try {
        const response = await axios(`${API_URL}/stores/getAllStoresDataControllers`);
        // const response = await axios("https://ticketing-system-sever.vercel.app/stores/getAllStoresDataControllers");
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const addNewStoreServices = async (obj) => {
    try {
        const response = await axios.post(`${API_URL}/stores/addstoresformat`, {
            obj
        })
        return response;
    } catch (error) {
        throw error;
    }
}