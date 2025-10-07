import React, { useState } from 'react'
import { useGlobalState } from '../Context/context';
import { Button, CircularProgress } from '@mui/material';
import { addNewStoreServices } from '../Services/stores.services';
import { toast } from 'react-toastify';
import axios from 'axios';

function SuperAdminAddStoreFormBtn({ tab, setOpen, fetchAllStores }) {
    const { formData, setErrors } = useGlobalState();
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
        console.log(formData)
        if (validate()) {
            try {
                // const response = await addNewStoreServices(formData);
                const response = await axios.post(`${"http://localhost:5000"}/stores/addstoresformat`, {
                    formData
                })
                console.log(response)
                if (response.status === 200) {
                    toast.success("New Store Active Successfully");
                }
            } catch (error) {
                setLoading(true);
                console.log("Error", error.message);
            } 
            // finally {
            //     setLoading(true);
            //     fetchAllStores();
            //     setOpen(false);
            // }
        } else {
            console.log("ERROR")
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {tab === 0 && <Button variant="contained" onClick={handleSubmit}>Save</Button>}
            {/* {tab === 0 && <Button variant="contained" onClick={handleSubmit}>{loading ? <CircularProgress size={25} /> : "Save"}</Button>} */}
        </div>
    )
}

export default SuperAdminAddStoreFormBtn