import React, { useCallback, useEffect, useState } from 'react';
import {
    Button, Typography, TextField, Box, IconButton,
    FormControl, InputLabel, Select, MenuItem, CircularProgress
} from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import UploadFiles from '../Components/UploadFiles/UploadFiles';
import { useGlobalState } from '../Context/context';
import Cookies from 'js-cookie';
import { getAllStores } from '../Services/stores.services';
import { getAllProblemCategory } from '../Services/categoryofproblem.services';
import { getAllUser } from '../Services/auth.services';
import { useSelector } from 'react-redux';
import StoreCreateTicketBttn from './StoreCreateTicketBttn';
import UploadAttachments from '../Components/UploadAttachnents/UploadAttachnents';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 600,
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
};

const contentStyle = {
    height: 'calc(100% - 150px)',
    overflowY: 'auto',
    padding: '20px',
};

function StoreCreateTickteBtnCompo({ fetchTickets }) {
    const { ticketData, setTicketData, reset, ticketErrors } = useGlobalState();
    const { user } = useSelector((state) => state.currentUser);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentUserData, setCurrentUserData] = useState(null);
    const [typeOfTicket, setTypeOfTicket] = useState([]);
    const [stores, setStores] = useState([]);
    const [managerData, setManagerData] = useState([]);
    const [currentDatauser, setCurrentDatauser] = useState([])

    const id = Cookies.get('id');
    const getCurrentUser = useCallback(async () => {
        const curremntUsre = await user;
        setCurrentDatauser(curremntUsre)
    }, [])
    useEffect(() => {
        getCurrentUser()
    }, [getCurrentUser])
    // ✅ Fetch all data before opening modal
    const fetchAllDataBeforeOpen = useCallback(async () => {
        try {
            setLoading(true);
            // console.log("currentDatauser", currentDatauser)
            const [allUsers, allStores, allCategories] = await Promise.all([
                getAllUser(),
                getAllStores(),
                getAllProblemCategory(),
            ]);

            const userList = allUsers?.data?.data || [];
            const storeList = allStores || [];
            const categoryList = allCategories?.data?.data || [];

            // ✅ Find current user
            const loggedInUser = userList.find(u => u.id === id);
            const filteredStore = storeList.find(store => store.door_code === loggedInUser?.doorcode);

            setCurrentUserData(loggedInUser);
            setTypeOfTicket(categoryList);

            setTicketData(prev => ({
                ...prev,
                name: currentDatauser?.name || loggedInUser?.name || '',
                email: currentDatauser?.email || loggedInUser?.email || '',
                phone: currentDatauser?.phone || loggedInUser?.phone || '',
                userId: currentDatauser?.id || id,
                currentOwnerId: currentDatauser?.id || id,
                creatordepartment: currentDatauser?.subDepartment || loggedInUser?.subDepartment || '',
                store_id: currentDatauser?.id || filteredStore?.id || '',
                store: currentDatauser?.name || filteredStore?.store_name || '',
                store_email: currentDatauser?.email || filteredStore?.store_email || '',
                store_phone: currentDatauser?.phone || filteredStore?.store_phone || '',
                store_Tech_id: filteredStore?.bdi_id || '',
                store_detail: filteredStore || '',
                market: currentDatauser?.markets || filteredStore?.market || '',
            }));

            // ✅ Managers (department based)
            const managers = userList.filter(
                u => u.department === loggedInUser?.department && u.subDepartment === 'Manager'
            );
            setManagerData(managers);

            // ✅ Set available stores for this market
            setStores(storeList.filter(store => store.market === filteredStore?.market));

        } catch (error) {
            console.error('❌ Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [id, setTicketData]);

    // ✅ Modal open (ensure data loaded before)
    const handleOpen = async () => {
        await fetchAllDataBeforeOpen();
        setOpen(true);
    };

    const handleClose = () => {
        getCurrentUser()
        reset();
        setOpen(false);
    };

    // ===========================
    // Handlers
    // ===========================
    const handleCategory = async (e) => {
        const value = e.target.value;
        const selectedCat = typeOfTicket.find(cat => cat.id === value);

        if (selectedCat) {
            // Set category + department
            setTicketData(prev => ({
                ...prev,
                categoryId: selectedCat.id,
                category: selectedCat.name,
                department: selectedCat.department,
                department_email: selectedCat.department_email,
                name: currentDatauser?.name || '',
                email: currentDatauser?.email || '',
                phone: currentDatauser?.phone || '',
                userId: currentDatauser?.id || id,
                currentOwnerId: currentDatauser?.id || id,
                creatordepartment: currentDatauser?.subDepartment || '',
                store_id: currentDatauser?.id || '',
                store: currentDatauser?.name || '',
                store_email: currentDatauser?.email || '',
                store_phone: currentDatauser?.phone || '',
                market: currentDatauser?.markets
            }));

            // ✅ Fetch managers for this department
            try {
                const response = await getAllUser();
                const userList = response.data.data;
                const filteredManagers = userList.filter(
                    u => u.department === selectedCat.department && u.subDepartment === 'Manager'
                );
                setManagerData(filteredManagers);

                if (filteredManagers.length === 1) {
                    setTicketData(prev => ({
                        ...prev,
                        managerID: filteredManagers[0].id,
                        managerName: filteredManagers[0].name,
                        managerName_email: filteredManagers[0].email,
                        name: currentDatauser?.name || '',
                        email: currentDatauser?.email || '',
                        phone: currentDatauser?.phone || '',
                        userId: currentDatauser?.id || id,
                        currentOwnerId: currentDatauser?.id || id,
                        creatordepartment: currentDatauser?.subDepartment || '',
                        store_id: currentDatauser?.id || '',
                        store: currentDatauser?.name || '',
                        store_email: currentDatauser?.email || '',
                        store_phone: currentDatauser?.phone || '',
                        market: currentDatauser?.markets
                    }));
                } else {
                    setTicketData(prev => ({
                        ...prev,
                        managerID: '',
                        managerName: '',
                        managerName_email: '',
                    }));
                }
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        }
    };

    const handleManagerChange = (e) => {
        const selected = managerData.find(m => m.name === e.target.value);
        if (selected) {
            setTicketData(prev => ({
                ...prev,
                managerID: selected.id,
                managerName: selected.name,
                managerName_email: selected.email,
                name: currentDatauser?.name || '',
                email: currentDatauser?.email || '',
                phone: currentDatauser?.phone || '',
                userId: currentDatauser?.id || id,
                currentOwnerId: currentDatauser?.id || id,
                creatordepartment: currentDatauser?.subDepartment || '',
                store_id: currentDatauser?.id || '',
                store: currentDatauser?.name || '',
                store_email: currentDatauser?.email || '',
                store_phone: currentDatauser?.phone || '',
                market: currentDatauser?.markets
            }));
        }
    };

    const handlePriority = (e) => {
        setTicketData(prev => ({ ...prev, priority: e.target.value }));
    };

    const handleDescription = (e) => {
        setTicketData(prev => ({ ...prev, ticketDescription: e.target.value }));
    };

    // ===========================
    // Render
    // ===========================
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    padding: '10px 20px',
                }}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Create New Ticket'}
            </Button>

            <Modal keepMounted open={open} onClose={handleClose}>
                <Box sx={style}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Create New Ticket
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={contentStyle}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div className="container">
                                <div className="row" style={{ gap: '10px 0px' }}>
                                    {/* User Info */}
                                    <div className="col-md-6">
                                        <TextField fullWidth label="Name" value={ticketData?.name || ''} disabled />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField fullWidth label="Email" value={ticketData?.email || ''} disabled />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField fullWidth label="Phone" value={ticketData?.phone || ''} disabled />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField fullWidth label="Market" value={ticketData?.market || ''} disabled />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField fullWidth label="Store" value={ticketData?.store || ''} disabled />
                                    </div>

                                    {/* Category */}
                                    <div className="col-md-6">
                                        <FormControl fullWidth>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={ticketData?.categoryId || ''}
                                                onChange={handleCategory}
                                            >
                                                <MenuItem value="">Select Category</MenuItem>
                                                {typeOfTicket.map(cat => (
                                                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Department */}
                                    <div className="col-md-6">
                                        <TextField
                                            fullWidth
                                            label="Department"
                                            value={ticketData?.department || ''}
                                            disabled
                                        />
                                    </div>

                                    {/* Manager */}
                                    <div className="col-md-6">
                                        {managerData.length > 1 ? (
                                            <TextField
                                                select
                                                fullWidth
                                                label="Manager"
                                                value={ticketData?.managerName || ''}
                                                onChange={handleManagerChange}
                                            >
                                                {managerData.map(m => (
                                                    <MenuItem key={m.id} value={m.name}>{m.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        ) : (
                                            <TextField
                                                fullWidth
                                                label="Manager"
                                                value={managerData[0]?.name || ''}
                                                disabled
                                            />
                                        )}
                                    </div>

                                    {/* Priority */}
                                    <div className="col-md-6">
                                        <FormControl fullWidth>
                                            <InputLabel>Priority</InputLabel>
                                            <Select
                                                value={ticketData?.priority || ''}
                                                onChange={handlePriority}
                                            >
                                                <MenuItem value="">Select Priority</MenuItem>
                                                <MenuItem value="Low">Low</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="High">High</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Description */}
                                    <div className="col-md-12">
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            multiline
                                            rows={4}
                                            value={ticketData?.ticketDescription || ''}
                                            onChange={handleDescription}
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div className="col-md-12">
                                        <Typography>Uplaod Image:</Typography>
                                        <UploadFiles setTicketData={setTicketData} />
                                    </div>
                                    <div className="col-md-12">
                                        <Typography>Uplaod attachments:</Typography>
                                        <UploadAttachments setTicketData={setTicketData} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </Box>

                    {/* Footer */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, borderTop: '1px solid #ccc' }}>
                        <StoreCreateTicketBttn
                            handleClose={handleClose}
                            fetchTickets={fetchTickets}
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default StoreCreateTickteBtnCompo;
