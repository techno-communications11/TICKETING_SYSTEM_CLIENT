import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useGlobalState } from '../Context/context';
import { addManuallymmdmindoservices } from '../Services/mmdminfo.services';

function AddMMDMCompoBtn({ handleClose }) {
    const { mmdmformData, setMMDMFormData, setErrors } = useGlobalState()
    const [loading, setLoading] = useState(false);
    const validate = () => {
        const newErrors = {};
        if (!mmdmformData.market.trim()) newErrors.market = 'Market is required';
        if (!mmdmformData.name.trim()) newErrors.name = 'Name is required';
        if (!mmdmformData.title.trim()) newErrors.title = 'Title is required';
        if (!mmdmformData.ntid.trim()) newErrors.ntid = 'NTID is required';

        if (!mmdmformData.tmobile_email.trim()) {
            newErrors.tmobile_email = 'T-Mobile email is required';
        } else if (!/\S+@\S+\.\S+/.test(mmdmformData.tmobile_email)) {
            newErrors.tmobile_email = 'Enter a valid email';
        }

        if (!mmdmformData.company_email.trim()) {
            newErrors.company_email = 'Company email is required';
        } else if (!/\S+@\S+\.\S+/.test(mmdmformData.company_email)) {
            newErrors.company_email = 'Enter a valid email';
        }

        if (!mmdmformData.contact_numbers.trim()) {
            newErrors.contact_numbers = 'Contact number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (validate()) {
            try {
                const resposne = await addManuallymmdmindoservices(mmdmformData);
                console.log("Form submitted successfully!", resposne.data);
            } catch (error) {
                setLoading(false);
                console.log(error.message)
            } finally {
                handleClose()
                setLoading(false);
                setMMDMFormData({
                    market: '',
                    name: '',
                    title: '',
                    ntid: '',
                    tmobile_email: '',
                    company_email: '',
                    contact_numbers: '',
                })
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={handleSubmit} variant="contained" color="primary">{loading ? <CircularProgress size={25} /> : "Submit"}</Button>
        </div>
    )
}

export default AddMMDMCompoBtn