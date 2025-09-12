import axios from "axios";

export const getAllMessageServices = async (userId, currentUserId) => {

    try {
        const response = await axios.get(
            `https://ticketingapi.techno-communications.com/chat/messages/${userId}/${currentUserId}`
            // `http://localhost:5000/chat/messages/${user?._id}/${currentUserId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
}