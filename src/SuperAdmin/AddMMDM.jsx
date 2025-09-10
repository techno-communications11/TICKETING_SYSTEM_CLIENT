import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
} from '@mui/material';
import AddMMDMCompo from '../SuperAdminComponent/AddMMDMCompo';
import FileUploads from './FileUploads';
import AddMMDMCompoBtn from '../SuperAdminComponent/AddMMDMCompoBtn';

function AddMMDM() {
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTabChange = (_, newValue) => setTabIndex(newValue);
    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Add
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>📝 Add MM/DM</DialogTitle>

                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Form" />
                    <Tab label="Upload File" />
                </Tabs>

                <DialogContent dividers>
                    {tabIndex === 0 && (
                        <AddMMDMCompo />
                    )}

                    {tabIndex === 1 && (
                        <FileUploads />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <AddMMDMCompoBtn handleClose={handleClose}/>
                    {/* <Button variant="contained" onClick={handleAdd}>Add</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddMMDM;
