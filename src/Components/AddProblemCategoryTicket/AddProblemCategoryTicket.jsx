import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    IconButton,
    MenuItem,
    Modal,
    TextField,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNewCategory } from '../../Services/categoryofproblem.services';
import axios from 'axios';
import { getAllDepartmentsServices } from '../../Services/departments.services';
import { useGlobalState } from '../../Context/context';
import AlertCompo from '../AlertCompo/AlertCompo';


function AddProblemCategoryTicket({ fetchCategory }) {
    const { setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = useGlobalState()

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [departmentEmail, setDepartmentEmail] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [loader, setLoader] = useState(false);

    const [allDepartments, setAllDepartments] = useState([]);
    const fetchAllDepartmentsData = useCallback(async () => {
        try {
            const response = await getAllDepartmentsServices();
            setAllDepartments(response.data.data)
        } catch (error) {
            console.log("ERROR", error.message)
        }
    }, [])
    useEffect(() => {
        fetchAllDepartmentsData()
    }, [fetchAllDepartmentsData])

    const handleCategoryProblems = (event) => {
        const selectedDepartment = JSON.parse(event.target.value);
        setNewDepartment(selectedDepartment);
        setDepartmentEmail(selectedDepartment.email);
    };

    const handleCategoryClose = () => {
        setShowCategoryModal(false);
        setNewCategory('');
        setNewDepartment('');
        setDepartmentEmail('');
    };

    const handleAddCategory = async () => {
        setLoader(true);
        try {
            const response = await axios.post('https://ticketingapi.techno-communications.com/pcategory/addproblemcateroy', {
                name: newCategory,
                department: newDepartment.name,
                department_email: departmentEmail
            });
            if (response.data.status === 200) {
                fetchCategory()
                handleCategoryClose();
                setNewCategory('');
                setNewDepartment('');
                setDepartmentEmail('');
                setLoader(false);
                setSnackbarMessage('New problem category created successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
        } catch (error) {
            setLoader(false);
            console.error("Error adding category:", error.message);
            setSnackbarMessage('Error occurred: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <Button variant='contained' aria-label="add" onClick={() => setShowCategoryModal(true)}>
                <AddIcon /> Add New Category
            </Button>
            <Modal open={showCategoryModal} onClose={handleCategoryClose}>
                <Box
                    sx={{
                        width: 400,
                        p: 4,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        mx: 'auto',
                        mt: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Add New Category
                    </Typography>

                    <TextField
                        fullWidth
                        label="New Category"
                        variant="outlined"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Select Department"
                        variant="outlined"
                        value={JSON.stringify(newDepartment) || ''}
                        onChange={handleCategoryProblems}
                    >
                        {allDepartments?.map((dept, index) => (
                            <MenuItem key={index} value={JSON.stringify(dept)}>
                                {dept.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {departmentEmail && (
                        <TextField
                            fullWidth
                            label="Department Email"
                            variant="outlined"
                            disabled
                            value={departmentEmail}
                            InputProps={{ readOnly: true }}
                        />
                    )}

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <Button onClick={handleCategoryClose}>Cancel</Button>
                        <Button disabled={loader} variant="contained" onClick={handleAddCategory}>
                            {loader ? <CircularProgress size={25} /> : "Add"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <AlertCompo />

        </div>
    );
}

export default AddProblemCategoryTicket