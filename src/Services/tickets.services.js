const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
// http://localhost:8000

export const getalltickets = async () => {
    try {
        // const response = await axios('http://localhost:8000/tickets/getalltickets');
        // const response = await axios('http://localhost:5000/tickets/getalltickets');
        const response = await axios(`${API_URL}/tickets/getalltickets`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const generateTicketId = (allTickets) => {
    if (!allTickets || allTickets.length === 0) {
        return 'Ticket#1001';
    }
    const lastTicket = allTickets.reduce((prev, current) => {
        const prevId = parseInt(prev.ticketId.replace('Ticket#', ''), 10);
        const currentId = parseInt(current.ticketId.replace('Ticket#', ''), 10);
        return prevId > currentId ? prev : current;
    });

    const lastTicketNumber = parseInt(lastTicket.ticketId.replace('Ticket#', ''), 10);
    return `Ticket#${lastTicketNumber + 1}`;
};


export const assignedTicketServices = async (id, assignerId, assignerName, ticketId, formData, email, assignedmanagername, assign_email) => {
    try {
        // const response = await axios.post('http://localhost:8000/tickets/assignedTicket', { id, assignerId, assignerName, ticketId, formData, email });
        // const response = await axios.post('http://localhost:5000/tickets/assignedTicket', { id, assignerId, assignerName, ticketId, formData, email, assignedmanagername,assign_email });
        const response = await axios.post(`${API_URL}/tickets/assignedTicket`, { id, assignerId, assignerName, ticketId, formData, email, assignedmanagername, assign_email, approved: true });
        // const response = await axios.post('http://localhost:5000/tickets/assignedTicket', { id, assignerId, assignerName, ticketId, formData, email, assignedmanagername,assign_email });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateTicketStatus = async (id) => {
    try {
        // const response = await axios.post('http://localhost:8000/tickets/updateTicektStatus', { id });
        const response = await axios.post(`${API_URL}/tickets/updateTicektStatus`, { id });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAgentStatus = async (id) => {
    try {
        if (!id) {
            throw new Error("❌ ID is required!");
        }
        // const response = await axios.post('http://localhost:8000/tickets/updatingAgentStatus', { id });
        const response = await axios.post(`${API_URL}/tickets/updatingAgentStatus`, { id });
        return response.data;
    } catch (error) {
        console.error("❌ Error in updateAgentStatus:", error.message);
        throw error;
    }
};

// 
export const completeTicketFromAgent = async (id) => {
    try {
        // const response = await axios.post('http://localhost:8000/tickets/completeTicketFromAgent', { id })
        const response = await axios.post(`${API_URL}/tickets/completeTicketFromAgent`, { id })
        return response;
    } catch (error) {
        throw error;
    }
}

export const closeTicket = async (id) => {
    try {
        // const response = await axios.post('http://localhost:8000/tickets/closeTicket', { id })
        // const response = await axios.post('http://localhost:5000/tickets/closeTicket', { id })
        const response = await axios.post(`${API_URL}/tickets/closeTicket`, { id })
        return response;
    } catch (error) {
        throw error;
    }
}

export const approvedTicketServices = async (userId, ticketId) => {
    try {
        const response = await axios.post(`${API_URL}/tickets/approvedTicket`, { userId, ticketId });
        return response.data; // ✅ Sirf data return karein
    } catch (error) {
        console.error("Error in approvedTicketServices:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to approve ticket"); // ✅ Better error message
    }
};

export const ticketProgressServices = async (ticketId, status) => {
    try {
        // const response = await axios.post('http://localhost:8000/tickets/updateTicketProgress', { ticketId, status });
        // const response = await axios.post('http://localhost:5000/tickets/updateTicketProgress', { ticketId, status });
        const response = await axios.post(`${API_URL}/tickets/updateTicketProgress`, { ticketId, status });
        return response;
    } catch (error) {
        throw error;
    }
}
export const deniedTicketServices = async (userId, ticketId, reason) => {
    try {
        const response = await axios.post(`${API_URL}/tickets/deniedTicket`, { userId, ticketId, reason });
        return response.data;
    } catch (error) {
        console.error("Error in approvedTicketServices:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to approve ticket");
    }
};

export const reopenTicketServices = async (id, reopenreason) => {
    try {
        const response = await axios.post(`${API_URL}/tickets/reopenTicket`, { id, reopenreason });
        return response.data;
    } catch (error) {
        console.error("Error in approvedTicketServices:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to approve ticket");
    }
};


export const deleteTicketServices = async (ids) => {
    try {
        const response = await axios.post(`${API_URL}/tickets/delete-tickets`,{ids});
        // const response = await axios.post(`http://localhost:5000/tickets/delete-tickets`, { ids });
        return response;
    } catch (error) {
        throw error;
    }
}