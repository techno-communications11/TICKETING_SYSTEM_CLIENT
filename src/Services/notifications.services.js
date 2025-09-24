const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const addNotificationsServices = async (notificationsData) => {
    try {
        // console.log("sending notification", notificationsData)
        const response = await axios.post(`${API_URL}/notifications/addNotifications`, { notificationsData: notificationsData });
        return response;
    } catch (error) {
        throw error;
    }
}
export const getAllNotificationsServices = async () => {
    try {
        const response = await axios(`${API_URL}/notifications/getNotifications`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateNotificationServices = async (userId, agent_notification, manager_notification) => {
    try {
        const response = await axios(`${API_URL}/notifications/updateNotification`, { userId, agent_notification, manager_notification });
        return response;
    } catch (error) {
        throw error;
    }
}