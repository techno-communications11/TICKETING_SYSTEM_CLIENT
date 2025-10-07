import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Typography, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import UploadFiles from '../Components/UploadFiles/UploadFiles';
import { useGlobalState } from '../Context/context';
import ManagerCreateTicketBttn from './ManagerCreateTicketBttn/ManagerCreateTicketBttn';
import AddTicketProblemCategory from '../Components/AddTicketProblemCategory/AddTicketProblemCategory';
import Cookies from 'js-cookie'
import { getAllStores } from '../Services/stores.services';
import { getAllProblemCategory } from '../Services/categoryofproblem.services';
import { getAllUser } from '../Services/auth.services';
import { useSelector } from 'react-redux';
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

function ManagerCreateTickets({ fetchTickets }) {
    const { ticketData, setTicketData, reset, ticketErrors } = useGlobalState();
    const { user } = useSelector((state) => state.currentUser);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { reset(); setOpen(false) };
    const [currentUserData, setCurrentUserData] = useState([]);
    const [typeofticket, setTypeofticket] = useState([]);
    const [stores, setStores] = useState([]);
    const [managerData, setManagerData] = useState([]);
    const [currentDatauser, setCurrentDatauser] = useState([])
    const id = Cookies.get('id')
    const [isBlockedBtn, setIsBlockBtn] = useState(false);
    const MARKETS = useMemo(() => ([
        "BOPK", "ALL MARKETS", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
        "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
        "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DEIGO",
        "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
    ]), []);
    const getCurrentUser = useCallback(async () => {
        const curremntUsre = await user;
        setCurrentDatauser(curremntUsre)
    }, [])
    useEffect(() => {
        getCurrentUser()
    }, [getCurrentUser])
    const fetchCUrrentUser = useCallback(async () => {
        try {
            const response = await getAllUser();
            const filteration = response.data.data.filter((data) => data.id === id)
            setCurrentUserData(filteration)
            setTicketData((prevData) => ({
                ...prevData,
                name: currentDatauser?.name || filteration[0]?.name,
                email: currentDatauser?.email || filteration[0]?.email,
                phone: currentDatauser?.phone || filteration[0]?.phone,
                userId: id || currentDatauser?.id,
                currentOwnerId: id || currentDatauser?.id,
                creatordepartment: filteration[0]?.subDepartment,
            }));
        } catch (error) {
            console.log("error", error.message)
        }
    }, [id, user]);

    const fetchStore = useCallback(async () => {
        try {
            const response = await getAllStores();
            const filteration = response.filter((data) => data.market === ticketData?.market);
            setStores(filteration)
        } catch (error) {
            console.log('error', error.message)
        }
    }, [ticketData?.market])

    const fetchCategory = useCallback(async () => {
        try {
            const resposne = await getAllProblemCategory();
            const filteration = resposne.data.data;
            setTypeofticket(filteration)
        } catch (error) {
            console.log("Error", error.message)
        }
    }, [currentUserData[0]?.department])
    const filterationManager = useCallback(async () => {
        try {
            const response = await getAllUser();
            const filterationData = response?.data?.data?.filter((data) => data.department === ticketData.department && data.subDepartment === "Manager");
            setManagerData(filterationData)
            if (filterationData.length === 1) {
                setTicketData({
                    ...ticketData,
                    managerID: filterationData[0].id,
                    managerName: filterationData[0].name,
                    managerName_email: filterationData[0].email,
                    userId: id,
                    currentOwnerId: id,
                    name: currentDatauser?.name,
                    email: currentDatauser?.email,
                    phone: currentDatauser?.phone,
                });
            } else {
                setTicketData({
                    ...ticketData,
                    managerID: '',
                    managerName: '',
                    managerName_email: '',
                });
            }

        } catch (error) {
            console.log('error')
        }
    }, [ticketData.department])


    useEffect(() => {
        filterationManager()
    }, [filterationManager])
    useEffect(() => {
        fetchCUrrentUser()
    }, [fetchCUrrentUser])
    useEffect(() => {
        fetchStore()
    }, [fetchStore])
    useEffect(() => {
        fetchCategory()
    }, [fetchCategory])

    const handleStore = async (e) => {
        const value = e.target.value;
        if (value === 'All Stores') {
            setTicketData(prev => ({
                ...prev,
                storeId: 'All Stores',
                store: 'All Stores',
                store_email: 'All Stores',
                store_phone: 'All Stores',
                store_Tech_id: 'All Stores',
                store_detail: 'All Stores',
            }));
            return;
        }
        const selectedStore = stores.find(store => store.id === value);
        if (selectedStore) {
            setTicketData(prev => ({
                ...prev,
                storeId: selectedStore.id,
                store: selectedStore.store_name || '',
                store_email: selectedStore.stroe_email || '',
                store_phone: selectedStore.store_phone || '',
                store_Tech_id: selectedStore.bdi_id || '',
                store_detail: selectedStore,
                userId: id,
                currentOwnerId: id,
                name: currentDatauser?.name,
                email: currentDatauser?.email,
                phone: currentDatauser?.phone,
            }));
        } else {
            console.warn('Selected store not found!');
        }
    };

    const handleCategory = async (e) => {
        try {
            const resposne = await getAllProblemCategory();
            const filterationType = resposne.data.data.filter((data) => data.id === e.target.value)
            setTicketData({
                ...ticketData,
                categoryId: filterationType[0]?.id,
                category: filterationType[0]?.name,
                department: filterationType[0]?.department,
                department_email: filterationType[0]?.department_email,
                name: currentDatauser?.name,
                email: currentDatauser?.email,
                phone: currentDatauser?.phone,
            });
        } catch (error) {
            console.log('error', error.message)
        }
    }

    const handleDepartmentChange = (event) => {
        const selectedManager = managerData.find(user => user.name === event.target.value);
        setTicketData({
            ...ticketData,
            managerID: selectedManager.id,
            managerName: selectedManager.name,
            managerName_email: selectedManager.email,
        });
    };

    const handleDescription = (e) => {
        setTicketData({
            ...ticketData,
            ticketDescription: e,
        });
    }

    const handlePriority = (e) => {
        setTicketData({
            ...ticketData,
            priority: e,
        });
    }

    const handleMaretBtn = async (e) => {
        if (e === "BOPK") {
            setIsBlockBtn(true)
            setTicketData({
                ...ticketData,
                market: e,
                storeId: 'BOPK',
                store: 'BOPK',
                store_email: 'BOPK',
                store_phone: 'BOPK',
                store_Tech_id: 'BOPK',
                store_detail: 'BOPK',
            });
            return;
        } else {
            setIsBlockBtn(false)
            setTicketData({
                ...ticketData,
                market: e,
            });
        }
    }

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
            >
                Create New Ticket
            </Button>

            <Modal
                keepMounted
                open={open}

                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        <Typography
                            id="keep-mounted-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            Create New Ticket
                        </Typography>
                        <IconButton
                            aria-label="close"
                            sx={{
                                color: '#666',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={contentStyle}>
                        <div className="container">
                            <div className="row d-flex align-items-center" style={{ gap: "10px 0px" }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        defaultValue={currentUserData[0]?.name}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        defaultValue={currentUserData[0]?.email}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        defaultValue={currentUserData[0]?.phone}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        select
                                        fullWidth
                                        size='medium'
                                        label="Markets"
                                        name="market"
                                        variant="outlined"
                                        value={ticketData.market || ''}
                                        onChange={(e) => { handleMaretBtn(e.target.value) }}
                                        // onChange={(e) => { setTicketData({ ...ticketData, market: e.target.value }) }}
                                        error={!!ticketErrors.market}
                                        helperText={ticketErrors.market}
                                    >
                                        {MARKETS?.map((market, index) => (
                                            <MenuItem key={index} value={market}>{market}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-6">
                                    <FormControl size="medium" fullWidth >
                                        <InputLabel>Stores</InputLabel>
                                        <Select
                                            label="Stores"
                                            name="store"
                                            disabled={!ticketData.market || isBlockedBtn}
                                            value={ticketData.storeId || ""}
                                            onChange={handleStore}
                                            error={!!ticketErrors.store}
                                            helperText={ticketErrors.store}
                                        >
                                            <MenuItem value="">Select Store</MenuItem>
                                            <MenuItem value="All Stores">All Stores</MenuItem>
                                            {stores.length > 0 ?
                                                stores.map((store, index) => (
                                                    <MenuItem key={index} value={store.id}>{store.store_name}</MenuItem>
                                                )) : <MenuItem value=""><CircularProgress size={25} /></MenuItem>}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <FormControl size="medium" fullWidth>
                                        <InputLabel>Select Category</InputLabel>
                                        <Select
                                            label="Type of Problem"
                                            value={ticketData.categoryId}
                                            onChange={handleCategory}
                                            error={!!ticketErrors.category}
                                            helperText={ticketErrors.category}
                                        >
                                            <MenuItem value="">Select Category of Problem</MenuItem>
                                            {
                                                typeofticket?.map((data) => (
                                                    <MenuItem value={data.id}>{data.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        label="Department"
                                        size='medium'
                                        value={ticketData.department}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    {
                                        managerData && managerData.length === 1 ? (
                                            <TextField
                                                fullWidth
                                                label="Manager Name"
                                                variant="outlined"
                                                disabled
                                                value={managerData[0].name}
                                                InputProps={{ readOnly: true }}
                                            />
                                        ) : managerData.length > 1 ? (
                                            <TextField
                                                select
                                                fullWidth
                                                label="Manager's Name"
                                                value={ticketData.managerName}
                                                onChange={handleDepartmentChange}
                                                variant="outlined"
                                                error={!!ticketErrors.managerName}
                                                helperText={ticketErrors.managerName}
                                            >
                                                {managerData.map((user, index) => (
                                                    <MenuItem key={index} value={user.name}>
                                                        {user.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )
                                            : (
                                                <TextField
                                                    fullWidth
                                                    label="Manager Name"
                                                    variant="outlined"
                                                    disabled
                                                    value={ticketData.managerName}
                                                    InputProps={{ readOnly: true }}
                                                />
                                                // ""
                                            )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <FormControl size="medium" fullWidth>
                                        <InputLabel>Priority</InputLabel>
                                        <Select
                                            fullWidth
                                            label="Priority"
                                            value={ticketData.priority}
                                            onChange={(e) => { handlePriority(e.target.value) }}
                                            error={!!ticketErrors.priority}
                                            helperText={ticketErrors.priority}
                                        >
                                            <MenuItem value="">Select Priority</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="High">High</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-12">
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        margin="normal"
                                        multiline
                                        rows={4}
                                        value={ticketData.ticketDescription}
                                        onChange={(e) => { handleDescription(e.target.value) }}
                                        error={!!ticketErrors.ticketDescription}
                                        helperText={ticketErrors.ticketDescription}
                                    />
                                </div>
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
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2,
                            borderTop: '1px solid #ccc',
                        }}
                    >
                        <ManagerCreateTicketBttn handleClose={handleClose} fetchTickets={fetchTickets} getCurrentUser={getCurrentUser} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ManagerCreateTickets;