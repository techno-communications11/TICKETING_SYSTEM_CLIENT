import axios from "axios"

export const addNewTicketProgressServices = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/ticket-progress/add-ticket-progress`, { data });
        return response;
    } catch (error) {
        throw error
    }
}
export const getNewTicketProgressServices = async () => {
    try {
        const response = await axios(`${API_URL}/ticket-progress/get-ticket-progress`);
        return response;
    } catch (error) {
        throw error
    }
}