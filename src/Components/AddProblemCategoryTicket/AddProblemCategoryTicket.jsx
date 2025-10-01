import React, { useState } from 'react';
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


function AddProblemCategoryTicket({fetchCategory}) {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [departmentEmail, setDepartmentEmail] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [loader, setLoader] = useState(false);

    const departments = [
        { name: 'Admin', email: 'admin@example.com' },
        { name: 'Admin / IT', email: 'admin@example.com' },
        { name: 'Management', email: 'superadmin@example.com' },

        { name: 'Compliance', email: 'compliance@techno-communications.com' },
        { name: 'Supervisor', email: 'commission@example.com' },
        { name: 'Vigilance', email: 'commission@example.com' },

        { name: 'Finance (GL)', email: 'finance@example.com' },
        { name: 'Finance AR', email: 'finance@example.com' },

        { name: 'HR', email: 'HR@techno-communications.com' },
        { name: 'IT', email: 'it@techno-communications.com' },
        { name: 'Local IT', email: 'it@techno-communications.com' },

        { name: 'Inventory', email: 'reporting@techno-communications.com' },
        { name: 'QA', email: 'reporting@techno-communications.com' },
        { name: 'Reporting', email: 'reporting@example.com' }
    ];
    //  "COO", "DCO", "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager", "District Manager", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Internal",
    //         "Reporting", "Inventory", "Maintenance", "Sales", "Commission", "Compliance",
    //         "AR", "Employee", "Store", "Managment", "SCM", "QA", "Vigilence", "MIS", "CMG", "Data Analytics", "Supervisor", "Local IT"
    // const departments = [
    //   { name: 'Admin', email: 'admin@example.com' },
    //   { name: 'Compliance', email: 'commission@example.com' },
    //   { name: 'Finance - GL', email: 'finance@example.com' },
    //   { name: 'Finance - AR', email: 'finance@example.com' },
    //   { name: 'HR', email: 'hr@example.com' },
    //   { name: 'Inventory', email: 'inventory@example.com' },
    //   { name: 'Management', email: 'superadmin@example.com' },
    //   { name: 'QA', email: 'qa@example.com' },
    //   { name: 'Reporting', email: 'reporting@example.com' },
    //   { name: 'Supervisor', email: 'commission@example.com' },
    //   { name: 'Vigilance', email: 'commission@example.com' },
    //   { name: 'IT', email: 'hr@example.com' },
    // ];
    // // { name: 'Market Manager', email: 'marketmanager@example.com' },
    // // { name: 'District Manager', email: 'districtmanager@example.com' },
    // // { name: 'Employee', email: 'employee@example.com' },
    // { name: 'Software India', email: 'softwareindia@example.com' },
    // { name: 'Finance (AR)', email: 'finance@example.com' },
    // // { name: 'Internal', email: 'internal@example.com' },
    // { name: 'Maintenance', email: 'maintenance@example.com' },
    // // { name: 'Commission', email: 'commission@example.com' }


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
            // console.log({ name: newCategory, department: newDepartment.name, departmentEmail })

            // const response = await addNewCategory({ name: newCategory, department:  newDepartment.name, departmentEmail });
            // const response = await axios.post('https://ticketing-system-sever.vercel.app/pcategory/addproblemcateroy', {
            const response = await axios.post('https://ticketingapi.techno-communications.com/pcategory/addproblemcateroy', {
                name: newCategory,
                department: newDepartment.name,
                department_email: departmentEmail
            });
            // console.log('Category added successfully:', response.data);
            fetchCategory()
            handleCategoryClose(); // Close the modal after successful addition
            setNewCategory('');
            setNewDepartment('');
            setDepartmentEmail('');
        } catch (error) {
            setLoader(false);
            console.error("Error adding category:", error.message);
        } finally {
            setLoader(false);
            handleCategoryClose();
        }
        // handleCategoryClose();
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
                        {departments.map((dept, index) => (
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
        </div>
    );
}

export default AddProblemCategoryTicket