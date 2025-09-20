import React, { useCallback, useEffect, useState } from 'react';
import {
    Button, Dialog, DialogContent, DialogActions, TextField, Select, MenuItem,
    InputLabel, FormControl, IconButton, Box, Typography, FormHelperText,
    Grid, Checkbox, FormControlLabel, Radio,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllStores } from '../Services/stores.services';
import { addUsersServices } from '../Services/auth.services';

function AddUserCompo({ fetchAllUserData }) {
    const [open, setOpen] = useState(false);

    // "Finance",
    const [departments] = useState([
        "COO", "DCO", "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager", "District Manager", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Internal",
        "Reporting", "Inventory", "Maintenance", "Sales", "Commission", "Compliance", "MIS",
        "AR", "Employee", "Store", "Managment", "SCM", "QA", "Vigilence", "MIS", "CMG", "Data Analytics","Supervisor","Local IT"
    ]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        mainDoorCode: ''
    });

    const [errors, setErrors] = useState({});
    const [selectedDepts, setSelectedDepts] = useState([]);
    const [stores, setStores] = useState([]);
    const [markets] = useState(["ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"]);
    const [selectedMarkets, setSelectedMarkets] = useState([]);
    const [marketSelectionVisible, setMarketSelectionVisible] = useState(true);
    const [selectedStores, setSelectedStores] = useState([]);
    const [storeDetail, setStoreDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchAllStores = useCallback(async () => {
        try {
            const response = await getAllStores();
            setStores(response);
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllStores();
    }, [fetchAllStores]);

    const filterationStoresData = useCallback(async () => {
        try {
            const response = await stores;
            const filteredStore = response.filter((store) => store.door_code === formData.mainDoorCode)
            setStoreDetail(filteredStore)
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    }, [stores, formData.mainDoorCode]);
    const filteredStores = searchTerm
        ? stores.filter(store =>
            store.store_name?.toLowerCase() === searchTerm.toLowerCase() ||
            store.store_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.door_code?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : stores;


    useEffect(() => {
        filterationStoresData()
    }, [filterationStoresData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleOpen = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            department: '',
            role: '',
            mainDoorCode: ''
        });
        setSelectedDepts([]);
        setSelectedMarkets([]);
        setSelectedStores([]);
        setErrors({});
        setMarketSelectionVisible(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDepts([]);
        setSelectedMarkets([]);
        setSelectedStores([]);
    };

    const handleCheckboxChange = (dept) => {
        setSelectedDepts(prev =>
            prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
        );
    };

    const handleMarketSelection = (market) => {
        setSelectedMarkets([market]);
    };

    const handleDisMarketSelection = (market) => {
        setSelectedMarkets([market]);
        setMarketSelectionVisible(false);
    };

    const handleMarketSelectionDis = (storeId) => {
        setSelectedStores(prev =>
            prev.includes(storeId) ? prev.filter(id => id !== storeId) : [...prev, storeId]
        );
    };

    const validate = () => {
        const tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Name is required";
        if (!formData.email.trim()) tempErrors.email = "Email is required";
        if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
        if (!formData.department) tempErrors.department = "Department is required";

        const roleDepts = ["Admin", "General Ledger (GL)", "HR", "Finance", "IT", "Software India", "Internal", "Reporting", "Inventory", "Maintenance", "Commission"];
        const doorCodeDepts = ["Employee", "Store", "Sales"];

        if (roleDepts.includes(formData.department) && !formData.role) {
            tempErrors.role = "Role is required";
        }

        if (doorCodeDepts.includes(formData.department) && !formData.mainDoorCode.trim()) {
            tempErrors.mainDoorCode = "Door Code is required";
        }

        if (formData.department === "Senior Manager" && selectedDepts.length === 0) {
            tempErrors.selectedDepts = "At least one department must be selected";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {

        setLoading(true);
        if (!validate()) return setLoading(false);
        const finalData = {
            ...formData,
            selectedDepts: formData.department === "Senior Manager" ? selectedDepts : [],
            selectedMarkets: (formData.department === "Market Manager" || formData.department === "District Manager") ? selectedMarkets : [],
            selectedStores: (formData.department === "District Manager") ? selectedStores : []
        };
        const obj = {
            name: finalData.name,
            email: finalData.email,
            password: '123456',
            phone: finalData.phone,
            department: finalData.department,
            subDepartment: finalData.role,
            doorcode: finalData.mainDoorCode,
            markets: finalData.selectedMarkets,
            stores: finalData.selectedStores,
            store_detail: storeDetail,
            managedDepartments: finalData.selectedDepts
        }
        try {
            const resposne = await addUsersServices(obj);
            console.log(resposne)
            fetchAllUserData()
            setLoading(false);
            // handleClose();
        } catch (error) {
            setLoading(false);
            console.log(error.message, 'error.message');
        } finally {
            setLoading(false);
        }
    };
    // console.log(selectedStores, 'selectedStores');
    return (
        <div>
            <Button variant='contained' onClick={handleOpen}>Add User</Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #ccc' }}>
                    <Typography variant="h6">Add New User</Typography>
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
                                {departments.map((dept, index) => (
                                    <MenuItem key={index} value={dept}>{dept}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.department}</FormHelperText>
                        </FormControl>

                        {/* {["Admin", "Finance (GL)", "HR", "Finance", "IT", "Software India", "Internal", "Reporting", "Inventory", "Maintenance", "Commission", "Compliance"].includes(formData.department) && ( */}
                        {departments.includes(formData.department) && (
                            <FormControl fullWidth error={!!errors.role}>
                                <InputLabel>Role</InputLabel>
                                <Select name="role" value={formData.role} onChange={handleChange}>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="Agent">Agent</MenuItem>
                                </Select>
                                <FormHelperText>{errors.role}</FormHelperText>
                            </FormControl>
                        )}

                        {["Employee", "Store", "Sales"].includes(formData.department) && (
                            <TextField label="Door Code" name="mainDoorCode" value={formData.mainDoorCode} onChange={handleChange} type="number" error={!!errors.mainDoorCode} helperText={errors.mainDoorCode} fullWidth />
                        )}

                        {formData.department === 'Senior Manager' && (
                            <>
                                <Typography>Select Departments (for Senior Manager)</Typography>
                                <Grid container spacing={1}>
                                    {departments.map((dept, index) => (
                                        <Grid item xs={6} key={index}>
                                            <FormControlLabel
                                                control={<Checkbox checked={selectedDepts.includes(dept)} onChange={() => handleCheckboxChange(dept)} />}
                                                label={dept}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                {errors.selectedDepts && <FormHelperText error>{errors.selectedDepts}</FormHelperText>}
                            </>
                        )}

                        {formData.department === 'Market Manager' && (
                            <>
                                <Typography>Select Market:</Typography>
                                <Grid container spacing={2}>
                                    {markets.map((market, index) => (
                                        <Grid item xs={6} key={index}>
                                            <FormControlLabel
                                                control={<Radio checked={selectedMarkets.includes(market)} onChange={() => handleMarketSelection(market)} />}
                                                label={market}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}

                        {formData.department === 'District Manager' && (
                            <>
                                {!marketSelectionVisible ? (
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography className='border px-3 py-2 rounded'>{selectedMarkets}</Typography>
                                        <Button variant="outlined" onClick={() => setMarketSelectionVisible(true)}>Change</Button>
                                    </Box>
                                ) : (
                                    <>
                                        <Typography>Select Market:</Typography>
                                        <Grid container spacing={2}>
                                            {markets.map((market, index) => (
                                                <Grid item xs={6} key={index}>
                                                    <FormControlLabel
                                                        control={<Radio checked={selectedMarkets.includes(market)} onChange={() => handleDisMarketSelection(market)} />}
                                                        label={market}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </>
                                )}

                                <Typography className='mt-3'>Select Stores:</Typography>
                                <TextField
                                    label="Search Stores"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Grid container spacing={2}>
                                    {filteredStores.map((store, index) => (
                                        <Grid item xs={6} md={6} key={store._id}>
                                            <FormControlLabel
                                                control={<Checkbox checked={selectedStores.includes(store._id)} onChange={() => handleMarketSelectionDis(store._id)} />}
                                                label={store.store_name}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions sx={{ borderTop: '1px solid #ccc', p: 2 }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="">
                            {selectedStores > 0 && (
                                <Box mt={2}>
                                    <Typography variant="subtitle1">Total Stores: {selectedStores.length}</Typography>
                                </Box>
                            )}
                        </div>
                        <div className="">
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" disabled={loading} onClick={handleSubmit}>{loading ? <CircularProgress size={23} /> : "Add"}</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddUserCompo;
