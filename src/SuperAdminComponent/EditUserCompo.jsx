import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog, DialogContent, DialogActions, TextField, Select, MenuItem,
    InputLabel, FormControl, IconButton, Box, Typography, Button, FormHelperText,
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { getAllUser, userUpdatedServices } from '../Services/auth.services';
import { getAllDepartmentsServices } from '../Services/departments.services';
// import { updateUserService } from '../Services/auth.services'; // 👈 yeh service aapko banana hoga

function EditUserCompo({ selectedRows, fetchAllUserData }) {
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        mainDoorCode: ''
    });
    const [errors, setErrors] = useState({});

    // Departments (same as AddUserCompo)
    const [allDepartments, setAllDepartments] = useState([
        "COO", "DCO", "SuperAdmin", "Admin", "Admin / IT", "Admin Manager", "Senior Manager", "Market Manager", "District Manager", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Internal",
        "Reporting", "Inventory", "Maintenance", "Sales", "Commission", "Compliance",
        "AR", "Employee", "Store", "Managment", "SCM", "QA", "Vigilence", "MIS", "CMG", "Data Analytics", "Supervisor", "Local IT"
    ]);
    const fectAllDepartments = useCallback(async () => {
        try {
            // const response = await getAllDepartmentsServices();
            const response = await getAllDepartmentsServices();
            const departments = response?.data?.data || [];

            // ✅ Sort departments alphabetically by name
            const sortedDepartments = departments.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            // ✅ Set sorted data
            setAllDepartments(sortedDepartments);

        } catch (error) {
            console.log("ERROR", error.message);
        }
    }, [])
    useEffect(() => {
        fectAllDepartments();
    }, [fectAllDepartments])
    // Load data when modal opens
    const fetchAllUsersdata = useCallback(async () => {
        if (open && selectedRows && selectedRows.length === 1) {
            try {
                // const response = await getAllUserS();
                const response2 = await getAllUser();
                const filteredData = response2.data.data.filter((data) => data.id === selectedRows[0])
                setFormData({
                    name: filteredData[0].name || '',
                    email: filteredData[0].email || '',
                    phone: filteredData[0].phone || '',
                    department: filteredData[0].department || '',
                    role: filteredData[0].subDepartment || '',
                    mainDoorCode: filteredData[0].doorcode || ''
                });
                setUserId(filteredData[0].id)
                // console.log(filteredData[0].id);
            } catch (error) {
                console.log(error);
            }
        }
    }, [open, selectedRows])
    useEffect(() => {
        fetchAllUsersdata()
    }, [fetchAllUsersdata]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validate = () => {
        const tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Name is required";
        if (!formData.email.trim()) tempErrors.email = "Email is required";
        if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
        if (!formData.department) tempErrors.department = "Department is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleUpdate = async () => {
        setLoader(true);
        if (!validate()) return setLoader(false);
        try {
            const payload = {
                ...formData,
                _id: selectedRows[0]._id,
                subDepartment: formData.role
            };
            const updatedResponse = await userUpdatedServices(userId, payload); // 👈 backend update call
            // console.log(updatedResponse)
            if (updatedResponse.status === 200) {
                // console.log(payload)
                setLoader(false);
                fetchAllUserData(); // refresh table
                handleClose();
            }
        } catch (error) {
            setLoader(false);
            console.error("Update failed:", error);
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen} sx={{
                '& .MuiSvgIcon-root': {
                    transition: 'color 0.3s ease',
                }
            }}>
                <EditIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #ccc' }}>
                    <Typography variant="h6">Edit User</Typography>
                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </Box>

                <DialogContent dividers sx={{ overflowY: 'auto', maxHeight: '70vh' }}>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} fullWidth />
                        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth />
                        <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} fullWidth />

                        <FormControl fullWidth error={!!errors.department}>
                            <InputLabel>Department</InputLabel>
                            <Select name="department" value={formData.department} onChange={handleChange}>
                                {allDepartments?.map((dept, index) => (
                                    <MenuItem key={index} value={dept?.name}>{dept?.name}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.department}</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select name="role" value={formData.role} onChange={handleChange}>
                                <MenuItem value="SuperAdmin">Super Admin</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Agent">Agent</MenuItem>
                            </Select>
                        </FormControl>

                        {["Employee", "Store", "Sales"].includes(formData.department) && (
                            <TextField label="Door Code" name="mainDoorCode" value={formData.mainDoorCode} onChange={handleChange} type="number" fullWidth />
                        )}
                    </Box>
                </DialogContent>

                <DialogActions sx={{ borderTop: '1px solid #ccc', p: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" disabled={loader} onClick={handleUpdate}>{loader ? <CircularProgress size={25} /> : "Update"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditUserCompo;
