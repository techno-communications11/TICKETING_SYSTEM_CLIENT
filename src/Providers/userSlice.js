import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
// import { getAllUsers } from '../Services/auth.services';
const initialState = {
    user: null,
    loading: false,
    error: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;