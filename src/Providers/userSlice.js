import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getAllUsers } from '../Services/auth.services';

// export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
//     try {
//         const id = Cookies.get('id');
//         if (!id) {
//             throw new Error('User ID not found in cookies');
//         }
//         const res = await getAllUsers();
//         const filteredData = res?.data?.data?.filter((data) => data._id === id);
//         if (!filteredData || filteredData.length === 0) {
//             throw new Error('User not found');
//         }
//         return filteredData[0];
//     } catch (err) {
//         return thunkAPI.rejectWithValue(err.message);
//     }
// });
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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUser.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchUser.fulfilled, (state, action) => {
    //             state.user = action.payload; 
    //             state.loading = false;
    //         })
    //         .addCase(fetchUser.rejected, (state, action) => {
    //             state.error = action.payload;  
    //             state.loading = false;
    //         });
    // },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;