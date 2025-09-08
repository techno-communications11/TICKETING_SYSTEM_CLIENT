import axios from "axios";

export const addMemphisStructureServices=async(data)=>{
    try {
        const resposne = await axios.post('https://ticketing-system-sever.vercel.app/memphis/newMempgisStructure',{data})
       return resposne;
    } catch (error) {
        throw error;
    }
}
export const getAllMemphisStructureServices=async()=>{
    try {
        const resposne = await axios('https://ticketing-system-sever.vercel.app/memphis/getAllMempgisStructure')
       return resposne;
    } catch (error) {
        throw error;
    }
}