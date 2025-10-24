import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
} from "@mui/material";
import { addDepartmentsServices } from "../Services/departments.services";
import AlertCompo from "../Components/AlertCompo/AlertCompo";
import { useGlobalState } from "../Context/context";

function SuperAdminAddDepartments({ fetchAllDepartmentsData }) {
    const { setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = useGlobalState()

    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [department, setDepartment] = useState({
        name: "",
        email: "",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setLoader(true);
        try {
            const response = await addDepartmentsServices(department);
            // console.log("RESPONSE");
            if (response.data.status === 200) {
                fetchAllDepartmentsData()
                setLoader(false);
                setSnackbarMessage('New department has been created successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setDepartment({ name: "", email: "" });
                setOpen(false);
            }
        } catch (error) {
            setLoader(false);
            console.log("ERROR", error.message)
            setSnackbarMessage('Error occurred: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

    };

    return (
        <div>
            {/* Main Add Button */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Department
            </Button>

            {/* Add Department Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Department</DialogTitle>

                <DialogContent dividers>
                    <TextField
                        label="Department Name"
                        name="name"
                        value={department.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Department Email"
                        name="email"
                        value={department.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!department.name || loader}
                    >
                        {loader ? <CircularProgress size={28} /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertCompo />

        </div>
    );
}

export default SuperAdminAddDepartments;
