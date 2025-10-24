import React, { useState } from 'react'
import { useGlobalState } from '../Context/context';
import { Button, CircularProgress } from '@mui/material';
import { addNewStoreServices } from '../Services/stores.services';
import { toast } from 'react-toastify';
import axios from 'axios';
import AlertCompo from '../Components/AlertCompo/AlertCompo';

function SuperAdminAddStoreFormBtn({ tab, setOpen, fetchAllStores }) {
    const { formData, setErrors, setFormData, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = useGlobalState();

    const [loading, setLoading] = useState(false)
    const validate = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        console.log("ERORR", newErrors)
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setLoading(true);
        // console.log(formData)
        if (validate()) {
            try {
                // const response = await addNewStoreServices(formData);
                const response = await axios.post(`${"https://ticketingapi.techno-communications.com"}/stores/addstoresformat`, {
                    formData
                })
                // console.log(response)
                if (response.status === 200) {
                    setLoading(false);
                    setOpen(false);
                    setSnackbarMessage('Store created successfully!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    // toast.success("New Store Active Successfully");
                    fetchAllStores();
                    setFormData({
                        bdi_id: '',
                        dm_name: '',
                        door_code: '',
                        market: '',
                        store_addres: '',
                        store_name: '',
                        stroe_email: '',
                        store_phone: '',
                        market: '',
                    })
                }
            } catch (error) {
                setLoading(true);
                setLoading(false);
                console.log("Error", error.message);
                setSnackbarMessage('Error occurred: ' + error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            console.log("ERROR")
            setSnackbarMessage('Some thing went wrong ');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <AlertCompo />
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {tab === 0 && <Button variant="contained" disabled={loading} onClick={handleSubmit}>{loading ? <CircularProgress size={25} /> : "Save"}</Button>}
            {/* {tab === 0 && <Button variant="contained" onClick={handleSubmit}>{loading ? <CircularProgress size={25} /> : "Save"}</Button>} */}
        </div>
    )
}

export default SuperAdminAddStoreFormBtn