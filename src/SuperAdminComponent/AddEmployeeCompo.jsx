import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    CircularProgress,
} from '@mui/material';
import { useGlobalState } from '../Context/context';
import { addManullyEmployeeContactServices } from '../Services/employeecontact.services';

function AddEmployeeCompo({ fetchAllEmployeeData }) {
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [ccFormData, setccFormData] = useState({
        name: '',
        ntid: '',
        mobile_phone: '',
        t_mobile_email_id: '',
    });

    const { errors, setErrors } = useGlobalState();

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setccFormData({
            name: '',
            ntid: '',
            mobile_phone: '',
            t_mobile_email_id: '',
        });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setccFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!ccFormData.name.trim()) newErrors.name = 'Name is required';
        if (!ccFormData.ntid.trim()) newErrors.ntid = 'NTID is required';
        if (!ccFormData.mobile_phone.trim()) newErrors.mobile_phone = 'Mobile number is required';
        if (!ccFormData.t_mobile_email_id.trim()) {
            newErrors.t_mobile_email_id = 'Email is required';
        } else if (!/^[\w.-]+@t-mobile\.com$/.test(ccFormData.t_mobile_email_id)) {
            newErrors.t_mobile_email_id = 'Enter a valid T-Mobile email (e.g., example@t-mobile.com)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setLoader(true);
        if (validate()) {
            try {
                const response = await addManullyEmployeeContactServices(ccFormData);
            } catch (error) {
                setLoader(false);
                console.log(error.message)
            } finally {
                fetchAllEmployeeData();
                setLoader(false);
                handleClose();
            }
        } else {
            setLoader(false);
            console.warn('❌ Validation failed');
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Add
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add Employee</DialogTitle>

                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={500} mx="auto">
                        <TextField
                            label="Name"
                            name="name"
                            value={ccFormData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                        />
                        <TextField
                            label="NTID"
                            name="ntid"
                            value={ccFormData.ntid}
                            onChange={handleChange}
                            error={!!errors.ntid}
                            helperText={errors.ntid}
                            fullWidth
                        />
                        <TextField
                            label="Mobile Phone"
                            name="mobile_phone"
                            value={ccFormData.mobile_phone}
                            onChange={handleChange}
                            error={!!errors.mobile_phone}
                            helperText={errors.mobile_phone}
                            fullWidth
                        />
                        <TextField
                            label="T Mobile Email ID"
                            name="t_mobile_email_id"
                            value={ccFormData.t_mobile_email_id}
                            onChange={handleChange}
                            error={!!errors.t_mobile_email_id}
                            helperText={errors.t_mobile_email_id}
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loader} variant="contained" onClick={handleSubmit}>
                        {loader ? <CircularProgress /> : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddEmployeeCompo;
