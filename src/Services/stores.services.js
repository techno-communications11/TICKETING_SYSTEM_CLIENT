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

export const addNewStoreServices = async ({ obj }) => {
    try {
        console.log("obj", obj)
        const response = await axios.post(`${"http://localhost:5000"}/stores/addstoresformat`, {
            obj
        })
        return response;
    } catch (error) {
        throw error;
    }
}
export const deleteStoreServices = async (id) => {
    try {
        console.log(id)
        const response = await axios.post(`http://localhost:5000/stores/delete-store-data-by-id`, {
            id
        })
        return response;
    } catch (error) {
        throw error;
    }
}