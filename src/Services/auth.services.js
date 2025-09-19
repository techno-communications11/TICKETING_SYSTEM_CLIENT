const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

export const addUsersServices = async (signupData) => {
    try {
        // const response = await axios.post('http://localhost:5000/auth/registered', { signupData });
        // const response = await axios.post('http://localhost:5000/auth/registered', { signupData });
        const response = await axios.post(`${API_URL}/auth/registered`, { signupData });
        return response
    } catch (error) {
        throw error;
    }
}

export const loginServices = async (login) => {
    try {
        // const response = await axios.post("http://localhost:5000/auth/login", { login });
        const response = await axios.post(`${API_URL}/auth/login`, { login });
        // const response = await axios.post("http://localhost:5000/auth/login", { login });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios(`${API_URL}/auth/userdata `);
        return response;
    } catch (error) {
        throw error;
    }
};


export const getAllUser = async () => {
    try {
        const response = await axios(`${API_URL}/auth/userdata`);
        return response;
    } catch (error) {
        throw error;
    }
};
export const deleteUserServices = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/auth/deleteUser/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const filteredData = async (id) => {
    try {
        const response = await axios(`${API_URL}/auth/userdata`);
        return await response.data.data.filter((data) => data._id === id);
    } catch (error) {
        throw error;
    }
};


export const resetPasswordService = async (userId, newPassword) => {
    try {
        // const response = await axios.post('http://localhost:5000/auth/reset-password', { userId, newPassword });
        const response = await axios.post(`${API_URL}/auth/reset-password`, { userId, newPassword });
        return response
    } catch (error) {

    }
}

export const userUsedInDesktopServices = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/auth/userUsedInDesktop`, { id });
        return response
    } catch (error) {

    }
}
export const userUpdatedServices = async (id, data) => {
    try {
        // const response = await axios.post(`http://localhost:5000/auth/user-update`, { id, data });
        const response = await axios.post(`${API_URL}/auth/user-update`, { id, data });
        return response
    } catch (error) {

    }
}

export const changePassword=async( email, password)=>{
    try {
        const resposne = await axios.post(`${API_URL}/auth/change-user-password`,{ email, password});
        return resposne;
    } catch (error) {
        throw error;
    }
}