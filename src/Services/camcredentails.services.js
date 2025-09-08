import axios from "axios";

export const addNewCamCredentails=async(data)=>{
    try {
        const response = await axios.post('https://ticketing-system-sever.vercel.app/camcast/addCamCredentails',{data});
        return response
    } catch (error) {
        throw error;
    }
}


export const getAllNewCamCredentails=async()=>{
    try {
        const response = await axios('https://ticketing-system-sever.vercel.app/camcast/getCamCredentails');
        return response
    } catch (error) {
        throw error;
    }
}