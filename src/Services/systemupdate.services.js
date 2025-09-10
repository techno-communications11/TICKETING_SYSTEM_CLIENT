const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const systemupdationservices=async(id)=>{
    try {
        const resposne = await axios.post(`${API_URL}/updation/systemUpdated`,{id});
        return resposne
    } catch (error) {
        throw error;
    }
}