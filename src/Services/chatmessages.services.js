import axios from "axios";

export const getAllMessageServices = async (userId, currentUserId) => {
    
    try {
        const response = await axios.get(
            `https://ticketingapi.techno-communications.com/chat/messages/${userId}/${currentUserId}`
            // `https://ticketing-system-sever.vercel.app/chat/messages/${user?._id}/${currentUserId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
}