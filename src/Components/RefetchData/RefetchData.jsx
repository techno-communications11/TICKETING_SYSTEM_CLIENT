import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../Providers/userSlice';
import { getAllUser, getAllUsers } from '../../Services/auth.services';
import Cookies from 'js-cookie';
function RefetchData({ children }) {
    const dispatch = useDispatch();
    const fetchUser = useCallback(async () => {
        try {
            const id = parseInt(Cookies.get('id'));
            // console.log(id)
            if (!id) {
                throw new Error('User ID not found in cookies');
            }
            // const res = await getAllUsers();
            // const filteredData = res?.data?.data?.filter((data) => data._id === id);
            // if (!filteredData || filteredData.length === 0) {
            //     throw new Error('User not found');
            // }
            const response = await getAllUser()
            const filter = response.data.data.filter((data) => data.id === id)
            if (!filter || filter.length === 0) {
                throw new Error('User not found');
            }
            // console.log("filter", filter)
            return response[0];
        } catch (err) {
            console.error(err.message);
            return err.message;
        }
    },[]);

    useEffect(() => {
        console.log("fetchUser", fetchUser())
        dispatch(login(fetchUser()));
    }, [dispatch,fetchUser])
    return (
        <div>
            {children}
        </div>
    )
}

export default RefetchData