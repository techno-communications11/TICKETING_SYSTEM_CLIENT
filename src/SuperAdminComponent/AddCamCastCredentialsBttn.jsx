import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useGlobalState } from '../Context/context';
import { addNewCamCredentails } from '../Services/camcredentails.services';
function AddCamCastCredentialsBttn({ handleClose }) {
    const { ccformData, setccFormData, setErrors } = useGlobalState()
    const [loading, setLoading] = useState(false);
    const validate = () => {
        const newErrors = {};
        if (!ccformData.username.trim()) newErrors.username = 'Username is required';
        if (!ccformData.password.trim()) newErrors.password = 'Password is required';
        if (!ccformData.name.trim()) newErrors.name = 'Name is required';
        if (!ccformData.website_url.trim()) {
            newErrors.website_url = 'Website URL is required';
        } else if (!/^https?:\/\/.+\..+/.test(ccformData.website_url)) {
            newErrors.website_url = 'Enter a valid URL (starting with http or https)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const resposne = await addNewCamCredentails(ccformData);
                console.log("Form submitted successfully!", resposne.data);
            } catch (error) {
                setLoading(false);
                console.log(error.message)
            } finally {
                handleClose()
                setLoading(false);
                setccFormData({
                    username: '',
                    password: '',
                    name: '',
                    website_url: '',
                })
            }
        } else {
            console.warn("❌ Validation failed");
        }
    };
    return (
        <div>
            <Button onClick={handleSubmit} variant="contained" color="primary">{loading ? <CircularProgress size={25} /> : "Submit"}</Button>
        </div>
    )
}

export default AddCamCastCredentialsBttn