// import React, { useCallback, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { login } from '../../Providers/userSlice';
// import { getAllUser } from '../../Services/auth.services';
// import Cookies from 'js-cookie';
// function RefetchData({ children }) {
//     const dispatch = useDispatch();
//     const fetchUser = useCallback(async () => {
//         try {
//             const id = parseInt(Cookies.get('id'));
//             if (!id) {
//                 throw new Error('User ID not found in cookies');
//             }
//             const response = await getAllUser()
//             const filter = response.data.data.filter((data) => data.id === id)
//             if (!filter || filter.length === 0) {
//                 throw new Error('User not found');
//             }
//             return response[0];
//         } catch (err) {
//             console.error(err.message);
//             return err.message;
//         }
//     }, []);

//     useEffect(() => {
//         console.log("fetchUser", fetchUser())
//         dispatch(login(fetchUser()));
//     }, [dispatch, fetchUser])
//     return (
//         <div>
//             {children}
//         </div>
//     )
// }

// export default RefetchData

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../Providers/userSlice';
import { getAllUser } from '../../Services/auth.services';
import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';

function RefetchData({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            // const id = parseInt(Cookies.get('id'));
            const id = Cookies.get('id');
            if (!id) {
                throw new Error('User ID not found in cookies');
            }
            const response = await getAllUser();
            const filter = response.data.data.find((data) => data.id === id);
            if (!filter) {
                throw new Error('User not found');
            }
            dispatch(login(filter)); // ✅ dispatch actual user data
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false); // ✅ loading complete
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading) {
        return <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <CircularProgress size={50} />
        </div>; // optional loading UI
    }

    return <>{children}</>;
}

export default RefetchData;
