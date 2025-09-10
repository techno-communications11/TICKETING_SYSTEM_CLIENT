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
import { addMemphisStructureServices } from '../Services/memphis.services';

function AddMemphisStructure({ fetchAllEmployeeData }) {
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [ccFormData, setccFormData] = useState({
        storeName: '',
        bidId: '',
        salesDm: '',
        compilanceDm: '',
        dist: ''
    });

    const { errors, setErrors } = useGlobalState();

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setccFormData({
            storeName: '',
            bidId: '',
            salesDm: '',
            compilanceDm: '',
            dist: ''
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
        if (!ccFormData.storeName.trim()) newErrors.storeName = 'Store name is required';
        if (!ccFormData.bidId.trim()) newErrors.bidId = 'BID ID is required';
        if (!ccFormData.salesDm.trim()) newErrors.salesDm = 'Sales DM is required';
        if (!ccFormData.compilanceDm.trim()) {
            newErrors.compilanceDm = 'Compliance DM is required';
        }
        if (!ccFormData.dist.trim()) {
            newErrors.dist = 'Dist is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setLoader(true);
        if (validate()) {
            try {
                const response = await addMemphisStructureServices(ccFormData);
                console.log(response)
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
                <DialogTitle>Add Memphis Structure</DialogTitle>

                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={500} mx="auto">
                        <TextField
                            label="Store Name"
                            name="storeName"
                            value={ccFormData.storeName}
                            onChange={handleChange}
                            error={!!errors.storeName}
                            helperText={errors.storeName}
                            fullWidth
                        />
                        <TextField
                            label="BID ID"
                            name="bidId"
                            value={ccFormData.bidId}
                            onChange={handleChange}
                            error={!!errors.bidId}
                            helperText={errors.bidId}
                            fullWidth
                        />
                        <TextField
                            label="Sales DM"
                            name="salesDm"
                            value={ccFormData.salesDm}
                            onChange={handleChange}
                            error={!!errors.salesDm}
                            helperText={errors.salesDm}
                            fullWidth
                        />
                        <TextField
                            label="Compliance DM"
                            name="compilanceDm"
                            value={ccFormData.compilanceDm}
                            onChange={handleChange}
                            error={!!errors.compilanceDm}
                            helperText={errors.compilanceDm}
                            fullWidth
                        />
                        <TextField
                            label="Dist"
                            name="dist"
                            value={ccFormData.dist}
                            onChange={handleChange}
                            error={!!errors.dist}
                            helperText={errors.dist}
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

export default AddMemphisStructure