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

function SuperAdminAddDepartments({ fetchAllDepartmentsData }) {
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
        // console.log("New Department Added (Dummy):", department);
        try {
            const response = await addDepartmentsServices(department);
            // console.log("RESPONSE");
            if (response.data.status === 200) {
                fetchAllDepartmentsData()
                setLoader(false);
                setDepartment({ name: "", email: "" });
                setOpen(false);
            }
        } catch (error) {
            setLoader(false);
            console.log("ERROR", error.message)
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
                        disabled={!department.name || !department.email || loader}
                    >
                        {loader ? <CircularProgress size={28} /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SuperAdminAddDepartments;
