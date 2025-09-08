import axios from "axios";

export const addmmdninfosevices=async(data)=>{
    try {
        const resposne = await axios.post('https://ticketing-system-sever.vercel.app/mmdminfo/addNewMMDMInfo',{data});
        return resposne;
    } catch (error) {
        throw error;
    }
}

export const addManuallymmdmindoservices=async(data)=>{
    try {
        const resposne = await axios.post('https://ticketing-system-sever.vercel.app/mmdminfo/addmanuallyNewMMDMInfo',{data});
        return resposne;
    } catch (error) {
        throw error;
    }
}

export const getmmdmindoservices=async()=>{
    try {
        const resposne = await axios('https://ticketing-system-sever.vercel.app/mmdminfo/getNewMMDMInfoController');
        return resposne;
    } catch (error) {
        throw error;
    }
}