import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Typography, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import UploadFiles from '../Components/UploadFiles/UploadFiles';
import { useGlobalState } from '../Context/context';
// import ManagerCreateTicketBttn from './ManagerCreateTicketBttn/ManagerCreateTicketBttn';
import AddTicketProblemCategory from '../Components/AddTicketProblemCategory/AddTicketProblemCategory';
import Cookies from 'js-cookie'
import { getAllStores } from '../Services/stores.services';
import { getAllProblemCategory } from '../Services/categoryofproblem.services';
import { getAllUsers } from '../Services/auth.services';
import MarketManagerCreateTicketBttn from './MarketManagerCreateTicketBttn';
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
function MarketManagerCreateTickets({ fetchTickets }) {
    const { ticketData, setTicketData, reset, ticketErrors } = useGlobalState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { reset(); setOpen(false) };
    const [currentUserData, setCurrentUserData] = useState([]);
    const [typeofticket, setTypeofticket] = useState([]);
    const [stores, setStores] = useState([]);
    const [managerData, setManagerData] = useState([]);
    const id = Cookies.get('id')
    const MARKETS = useMemo(() => ([
        "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
        "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
        "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
        "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
    ]), []);
    const fetchCUrrentUser = useCallback(async () => {
        try {
            const response = await getAllUsers();
            const filteration = response.data.data.filter((data) => data._id === id)
            setCurrentUserData(filteration)
            console.log(filteration[0]?.name)
            setTicketData((prevData) => ({
                ...prevData,
                name: filteration[0]?.name,
                email: filteration[0]?.email,
                phone: filteration[0]?.phone,
                userId: filteration[0]?._id,
                creatordepartment: filteration[0]?.subDepartment || filteration[0]?.department,
                market: filteration[0]?.markets[0],
                marketManager_id: filteration[0]?._id,
                market_manager_email: filteration[0]?.email,
                market_manager_name: filteration[0]?.name,
                market_manager_phone: filteration[0]?.phone,
            }));
            // setTicketData({ ...ticketData, market: filteration[0]?.markets[0]})
        } catch (error) {
            console.log("error", error.message)
        }
    }, [id]);

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
            setTypeofticket(resposne.data.data)
        } catch (error) {
            console.log("Error", error.message)
        }
    }, [])
    const filterationManager = useCallback(async () => {
        try {
            const response = await getAllUsers();
            const filterationData = response?.data?.data?.filter((data) => data.department === ticketData.department && data.subDepartment === "Manager");
            // setManagerData(filterationData)
            if (filterationData.length === 1) {
                setTicketData({
                    ...ticketData,
                    managerID: "N/A",
                    managerName: 'N/A',
                    managerName_email: 'N/A',
                    senior_managers: 'Admin Manager'
                });
            } else {
                setTicketData({
                    ...ticketData,
                    managerID: "N/A",
                    managerName: 'N/A',
                    managerName_email: 'N/A',
                    senior_managers: 'Admin Manager'
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
        try {
            const selectedStore = stores.find(store => store._id === e.target.value);
            setTicketData({
                ...ticketData,
                storeId: e.target.value,
                store: selectedStore?.store_name,
                store_email: selectedStore?.stroe_email,
                store_phone: selectedStore?.store_phone,
                store_Tech_id: selectedStore?.bdi_id,
                store_detail: selectedStore,
            });
        } catch (error) {
            console.log('error', error.message)
        }
    }

    const handleCategory = async (e) => {
        try {
            const resposne = await getAllProblemCategory();
            const filterationType = resposne.data.data.filter((data) => data._id === e.target.value)
            setTicketData({
                ...ticketData,
                categoryId: filterationType[0]?._id,
                category: filterationType[0]?.name,
                department: filterationType[0]?.department,
                department_email: filterationType[0]?.department_email,
            });
        } catch (error) {
            console.log('error', error.message)
        }
    }

    // const handleDepartmentChange = (event) => {
    //     const selectedManager = managerData.find(user => user.name === event.target.value);
    //     console.log("selectedManager", selectedManager)
    //     setTicketData({
    //         ...ticketData,
    //         managerID: selectedManager._id,
    //         managerName: selectedManager.name,
    //         managerName_email: selectedManager.email,
    //     });
    // };

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
                            p: 2, // Padding for the header
                            borderBottom: '1px solid #ccc', // Separator line
                        }}
                    >
                        {/* Title */}
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

                        {/* Close Button */}
                        <IconButton
                            aria-label="close"
                            // onClick={handleClose}
                            sx={{
                                color: '#666', // Subtle color for the close button
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Hover effect
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
                                        fullWidth
                                        size='medium'
                                        defaultValue={currentUserData[0]?.markets[0]}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                    {/* <TextField
                                        select
                                        fullWidth
                                        size='medium'
                                        label="Markets"
                                        name="market"
                                        variant="outlined"
                                        value={ticketData.market || ''}
                                        onChange={(e) => { setTicketData({ ...ticketData, market: e.target.value }) }}
                                        error={!!ticketErrors.market}
                                        helperText={ticketErrors.market}
                                    >
                                        {MARKETS?.map((market, index) => (
                                            <MenuItem key={index} value={market}>{market}</MenuItem>
                                        ))}
                                    </TextField> */}
                                </div>
                                <div className="col-md-6">
                                    <FormControl size="medium" fullWidth >
                                        <InputLabel>Stores</InputLabel>
                                        <Select
                                            label="Stores"
                                            name="store"
                                            disabled={!ticketData.market}
                                            value={ticketData.storeId || ""}
                                            onChange={handleStore}
                                            error={!!ticketErrors.store}
                                            helperText={ticketErrors.store}
                                        >
                                            <MenuItem value="">Select Store</MenuItem>
                                            {stores.length > 0 ?
                                                stores.map((store, index) => (
                                                    <MenuItem key={index} value={store._id}>{store.store_name}</MenuItem>
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
                                                    <MenuItem value={data._id}>{data.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <AddTicketProblemCategory fetchCategory={fetchCategory} />
                                </div>
                                {/* <div className="col-md-6">
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
                                                // onChange={handleDepartmentChange}
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
                                </div> */}
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
                                    <UploadFiles />
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
                        <MarketManagerCreateTicketBttn handleClose={handleClose} fetchTickets={fetchTickets} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default MarketManagerCreateTickets