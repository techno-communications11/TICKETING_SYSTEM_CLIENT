import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Tabs, Tab, Box
} from '@mui/material';
import { useGlobalState } from '../Context/context';
import SuperAdminAddStoreForm from './SuperAdminAddStoreForm';
import SuperAdminAddStoreFormBtn from './SuperAdminAddStoreFormBtn';
import UploadSheetComponent from '../SuperAdminComponent/UploadSheetComponent';

function SuperAdminAddStores({fetchAllStores}) {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const { formData, setFormData, errors, setErrors } = useGlobalState();

    const validate = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log("Form Data: ", formData);
            setOpen(false);
        }
    };

    const handleTabChange = (e, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <Button variant='contained' onClick={() => setOpen(true)}>Add Store</Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Store</DialogTitle>

                <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab label="Manual Store" />
                    <Tab label="Upload Sheet" />
                </Tabs>

                <DialogContent dividers>
                    {tab === 0 && (
                        <SuperAdminAddStoreForm />
                    )}

                    {tab === 1 && <UploadSheetComponent />}
                </DialogContent>

                <DialogActions>
                    <SuperAdminAddStoreFormBtn tab={tab} setOpen={setOpen} fetchAllStores={fetchAllStores}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SuperAdminAddStores;
