// // // import React, { useCallback, useEffect, useMemo, useState } from 'react';
// // // import { Button, Typography, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// // // import Modal from '@mui/material/Modal';
// // // import CloseIcon from '@mui/icons-material/Close';
// // // import UploadFiles from '../Components/UploadFiles/UploadFiles';
// // // import { useGlobalState } from '../Context/context';
// // // import AddTicketProblemCategory from '../Components/AddTicketProblemCategory/AddTicketProblemCategory';
// // // import Cookies from 'js-cookie'
// // // import { getAllStores } from '../Services/stores.services';
// // // import { getAllProblemCategory } from '../Services/categoryofproblem.services';
// // // import { getAllUser, getAllUsers } from '../Services/auth.services';
// // // import SuperAdminCreateTicketbtn from './SuperAdminCreateTicketbtn';
// // // import UploadAttachments from '../Components/UploadAttachnents/UploadAttachnents';
// // // // import SeniorManagerCreateTicketBttn from './SeniorManagerCreateTicketBttn';
// // // const style = {
// // //     position: 'absolute',
// // //     top: '50%',
// // //     left: '50%',
// // //     transform: 'translate(-50%, -50%)',
// // //     width: 650,
// // //     height: 600,
// // //     bgcolor: 'background.paper',
// // //     border: '1px solid #ccc',
// // //     borderRadius: '8px',
// // //     boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
// // // };

// // // const contentStyle = {
// // //     height: 'calc(100% - 150px)',
// // //     overflowY: 'auto',
// // //     padding: '20px',
// // // };


// // // function SuperAdminCreateTicket({ fetchTickets }) {
// // //     const { ticketData, setTicketData, reset, ticketErrors } = useGlobalState();
// // //     const [open, setOpen] = useState(false);

// // //     const [currentUserData, setCurrentUserData] = useState([]);
// // //     const [typeofticket, setTypeofticket] = useState([]);
// // //     const [stores, setStores] = useState([]);
// // //     const [managerData, setManagerData] = useState([]);
// // //     const id = Cookies.get('id')
// // //     const MARKETS = useMemo(() => ([
// // //         "ALL MARKETS", "HO", "BOPK", "BOIN", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
// // //         "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
// // //         "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
// // //     ]), []);
// // //     const fetchCUrrentUser = useCallback(async () => {
// // //         try {
// // //             const response = await getAllUser();
// // //             const filteration = response.data.data.filter((data) => data.id == id)
// // //             setCurrentUserData(filteration)
// // //             // console.log("filteration", filteration)
// // //             setTicketData((prevData) => ({
// // //                 ...prevData,
// // //                 name: filteration[0]?.name,
// // //                 email: filteration[0]?.email,
// // //                 phone: filteration[0]?.phone,
// // //                 userId: filteration[0]?.id,
// // //                 creatordepartment: filteration[0]?.subDepartment || filteration[0]?.department,
// // //                 senior_managers: filteration[0]?.subDepartment || filteration[0]?.department
// // //             }));
// // //         } catch (error) {
// // //             console.log("error", error.message)
// // //         }
// // //     }, [id]);
// // //     const handleDepartmentChange = (event) => {
// // //         const selectedManager = managerData.find(user => user.name === event.target.value);
// // //         // console.log("selectedManager", selectedManager)
// // //         setTicketData({
// // //             ...ticketData,
// // //             managerID: selectedManager.id,
// // //             managerName: selectedManager.name,
// // //             managerName_email: selectedManager.email,
// // //         });
// // //     };
// // //     const fetchStore = useCallback(async () => {
// // //         try {
// // //             const response = await getAllStores();
// // //             const filteration = response.filter((data) => data.market === ticketData?.market);
// // //             setStores(filteration)
// // //         } catch (error) {
// // //             console.log('error', error.message)
// // //         }
// // //     }, [ticketData?.market])

// // //     const fetchCategory = useCallback(async () => {
// // //         try {
// // //             const resposne = await getAllProblemCategory();
// // //             setTypeofticket(resposne.data.data)
// // //         } catch (error) {
// // //             console.log("Error", error.message)
// // //         }
// // //     }, [])
// // //     const filterationManager = useCallback(async () => {
// // //         try {
// // //             const response = await getAllUsers();
// // //             const filterationData = response?.data?.data?.filter((data) => data.department === ticketData.department && data.subDepartment === "Manager");
// // //             setManagerData(filterationData)
// // //             if (filterationData.length === 1) {
// // //                 setTicketData({
// // //                     ...ticketData,
// // //                     managerID: "N/A",
// // //                     managerName: 'N/A',
// // //                     managerName_email: 'N/A',
// // //                     department: ticketData.department
// // //                 });
// // //             } else {
// // //                 setTicketData({
// // //                     ...ticketData,
// // //                     managerID: "N/A",
// // //                     managerName: 'N/A',
// // //                     managerName_email: 'N/A',
// // //                     department: ticketData.department
// // //                 });
// // //             }

// // //         } catch (error) {
// // //             console.log('error')
// // //         }
// // //     }, [ticketData.department])
// // //     const handleOpen = () => { setOpen(true); fetchCUrrentUser() }
// // //     const handleClose = () => { reset(); setOpen(false) };

// // //     useEffect(() => {
// // //         filterationManager()
// // //     }, [filterationManager])
// // //     useEffect(() => {
// // //         fetchCUrrentUser()
// // //     }, [fetchCUrrentUser, id])
// // //     useEffect(() => {
// // //         fetchStore()
// // //     }, [fetchStore])
// // //     useEffect(() => {
// // //         fetchCategory()
// // //     }, [fetchCategory])

// // //     const handleStore = async (e) => {
// // //         try {
// // //             const value = e.target.value;
// // //             if (value === 'All Stores') {
// // //                 setTicketData(prev => ({
// // //                     ...prev,
// // //                     storeId: 'All Stores',
// // //                     store: 'All Stores',
// // //                     store_email: 'All Stores',
// // //                     store_phone: 'All Stores',
// // //                     store_Tech_id: 'All Stores',
// // //                     store_detail: 'All Stores',
// // //                 }));
// // //                 return;
// // //             }
// // //             if (value === 'HO') {
// // //                 setTicketData(prev => ({
// // //                     ...prev,
// // //                     storeId: 'HO',
// // //                     store: 'HO',
// // //                     store_email: 'HO',
// // //                     store_phone: 'HO',
// // //                     store_Tech_id: 'HO',
// // //                     store_detail: 'HO',
// // //                 }));
// // //                 return;
// // //             }
// // //             if (value === 'BOPK') {
// // //                 setTicketData(prev => ({
// // //                     ...prev,
// // //                     storeId: 'BOPK',
// // //                     store: 'BOPK',
// // //                     store_email: 'BOPK',
// // //                     store_phone: 'BOPK',
// // //                     store_Tech_id: 'BOPK',
// // //                     store_detail: 'BOPK',
// // //                 }));
// // //                 return;
// // //             }
// // //             if (value === 'BOIN') {
// // //                 setTicketData(prev => ({
// // //                     ...prev,
// // //                     storeId: 'BOIN',
// // //                     store: 'BOIN',
// // //                     store_email: 'BOIN',
// // //                     store_phone: 'BOIN',
// // //                     store_Tech_id: 'BOIN',
// // //                     store_detail: 'BOIN',
// // //                 }));
// // //                 return;
// // //             }
// // //             const selectedStore = stores.find(store => store.id === e.target.value);
// // //             setTicketData({
// // //                 ...ticketData,
// // //                 storeId: e.target.value,
// // //                 store: selectedStore?.store_name,
// // //                 store_email: selectedStore?.stroe_email,
// // //                 store_phone: selectedStore?.store_phone,
// // //                 store_Tech_id: selectedStore?.bdi_id,
// // //                 store_detail: selectedStore,
// // //             });
// // //         } catch (error) {
// // //             console.log('error', error.message)
// // //         }
// // //     }

// // //     const handleCategory = async (e) => {
// // //         try {
// // //             const resposne = await getAllProblemCategory();
// // //             const filterationType = resposne.data.data.filter((data) => data.id === e.target.value)
// // //             console.log(filterationType)
// // //             setTicketData({
// // //                 ...ticketData,
// // //                 categoryId: filterationType[0]?.id,
// // //                 category: filterationType[0]?.name,
// // //                 department: filterationType[0]?.department,
// // //                 department_email: filterationType[0]?.department_email,
// // //             });
// // //         } catch (error) {
// // //             console.log('error', error.message)
// // //         }
// // //     }

// // //     const handleDescription = (e) => {
// // //         setTicketData({
// // //             ...ticketData,
// // //             ticketDescription: e,
// // //         });
// // //     }

// // //     const handlePriority = (e) => {
// // //         setTicketData({
// // //             ...ticketData,
// // //             priority: e,
// // //         });
// // //     }

// // //     return (
// // //         <div>
// // //             <Button
// // //                 variant="contained"
// // //                 color="primary"
// // //                 onClick={handleOpen}
// // //                 sx={{
// // //                     textTransform: 'none',
// // //                     fontSize: '1rem',
// // //                     padding: '10px 20px',
// // //                 }}
// // //             >
// // //                 Create New Ticket
// // //             </Button>

// // //             <Modal
// // //                 keepMounted
// // //                 open={open}

// // //                 onClose={handleClose}
// // //                 aria-labelledby="keep-mounted-modal-title"
// // //                 aria-describedby="keep-mounted-modal-description"
// // //             >
// // //                 <Box sx={style}>
// // //                     <Box
// // //                         sx={{
// // //                             display: 'flex',
// // //                             justifyContent: 'space-between',
// // //                             alignItems: 'center',
// // //                             p: 2, // Padding for the header
// // //                             borderBottom: '1px solid #ccc', // Separator line
// // //                         }}
// // //                     >
// // //                         {/* Title */}
// // //                         <Typography
// // //                             id="keep-mounted-modal-title"
// // //                             variant="h5"
// // //                             component="h2"
// // //                             sx={{
// // //                                 fontWeight: 'bold',
// // //                             }}
// // //                         >
// // //                             Create New Ticket
// // //                         </Typography>
// // //                         {/* Close Button */}
// // //                         <IconButton
// // //                             aria-label="close"
// // //                             // onClick={handleClose}
// // //                             sx={{
// // //                                 color: '#666', // Subtle color for the close button
// // //                                 '&:hover': {
// // //                                     backgroundColor: 'rgba(0, 0, 0, 0.04)', // Hover effect
// // //                                 },
// // //                             }}
// // //                             onClick={handleClose}
// // //                         >
// // //                             <CloseIcon />
// // //                         </IconButton>
// // //                     </Box>
// // //                     <Box sx={contentStyle}>
// // //                         <div className="container">
// // //                             <div className="row d-flex align-items-center" style={{ gap: "10px 0px" }}>
// // //                                 <div className="col-md-6">
// // //                                     <TextField
// // //                                         fullWidth
// // //                                         size='medium'
// // //                                         defaultValue={currentUserData[0]?.name}
// // //                                         InputProps={{ readOnly: true }}
// // //                                         disabled
// // //                                         variant="outlined"
// // //                                     />
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     <TextField
// // //                                         fullWidth
// // //                                         size='medium'
// // //                                         defaultValue={currentUserData[0]?.email}
// // //                                         InputProps={{ readOnly: true }}
// // //                                         disabled
// // //                                         variant="outlined"
// // //                                     />
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     <TextField
// // //                                         fullWidth
// // //                                         size='medium'
// // //                                         defaultValue={currentUserData[0]?.phone}
// // //                                         InputProps={{ readOnly: true }}
// // //                                         disabled
// // //                                         variant="outlined"
// // //                                     />
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     <TextField
// // //                                         select
// // //                                         fullWidth
// // //                                         size='medium'
// // //                                         label="Markets"
// // //                                         name="market"
// // //                                         variant="outlined"
// // //                                         value={ticketData.market || ''}
// // //                                         onChange={(e) => { setTicketData({ ...ticketData, market: e.target.value }) }}
// // //                                         error={!!ticketErrors.market}
// // //                                         helperText={ticketErrors.market}
// // //                                     >
// // //                                         {MARKETS?.map((market, index) => (
// // //                                             <MenuItem key={index} value={market}>{market}</MenuItem>
// // //                                         ))}
// // //                                     </TextField>
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     <FormControl size="medium" fullWidth >
// // //                                         <InputLabel>Stores</InputLabel>
// // //                                         <Select
// // //                                             label="Stores"
// // //                                             name="store"
// // //                                             disabled={!ticketData.market}
// // //                                             value={ticketData.storeId || ""}
// // //                                             onChange={handleStore}
// // //                                             error={!!ticketErrors.store}
// // //                                             helperText={ticketErrors.store}
// // //                                         >
// // //                                             <MenuItem value="">Select Store</MenuItem>
// // //                                             <MenuItem value="All Stores">All Stores</MenuItem>
// // //                                             <MenuItem value="BOPK">BOPK</MenuItem>
// // //                                             <MenuItem value="BOIN">BOIN</MenuItem>
// // //                                             {stores.length > 0 ?
// // //                                                 stores.map((store, index) => (
// // //                                                     <MenuItem key={index} value={store.id}>{store.store_name}</MenuItem>
// // //                                                 )) : <MenuItem value=""><CircularProgress size={25} /></MenuItem>}
// // //                                         </Select>
// // //                                     </FormControl>
// // //                                 </div>
// // //                                 <div className="col-md-6 d-flex align-items-center">
// // //                                     <FormControl size="medium" fullWidth>
// // //                                         <InputLabel>Select Category</InputLabel>
// // //                                         <Select
// // //                                             label="Type of Problem"
// // //                                             value={ticketData.categoryId}
// // //                                             onChange={handleCategory}
// // //                                             error={!!ticketErrors.category}
// // //                                             helperText={ticketErrors.category}
// // //                                         >
// // //                                             <MenuItem value="">Select Category of Problem</MenuItem>
// // //                                             {
// // //                                                 typeofticket?.map((data) => (
// // //                                                     <MenuItem value={data.id}>{data.name}</MenuItem>
// // //                                                 ))
// // //                                             }
// // //                                         </Select>
// // //                                     </FormControl>
// // //                                     {/*<AddTicketProblemCategory fetchCategory={fetchCategory} />*/}
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     <TextField
// // //                                         fullWidth
// // //                                         label="Department"
// // //                                         size='medium'
// // //                                         value={ticketData.department}
// // //                                         InputProps={{ readOnly: true }}
// // //                                         disabled
// // //                                         variant="outlined"
// // //                                     />
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     {
// // //                                         managerData && managerData.length === 1 ? (
// // //                                             <TextField
// // //                                                 fullWidth
// // //                                                 label="Manager Name"
// // //                                                 variant="outlined"
// // //                                                 disabled
// // //                                                 value={managerData[0].name}
// // //                                                 InputProps={{ readOnly: true }}
// // //                                             />
// // //                                         ) : managerData.length > 1 ? (
// // //                                             <TextField
// // //                                                 select
// // //                                                 fullWidth
// // //                                                 label="Manager's Name"
// // //                                                 value={ticketData.managerName}
// // //                                                 onChange={handleDepartmentChange}
// // //                                                 variant="outlined"
// // //                                                 error={!!ticketErrors.managerName}
// // //                                                 helperText={ticketErrors.managerName}
// // //                                             >
// // //                                                 {managerData.map((user, index) => (
// // //                                                     <MenuItem key={index} value={user.name}>
// // //                                                         {user.name}
// // //                                                     </MenuItem>
// // //                                                 ))}
// // //                                             </TextField>
// // //                                         )
// // //                                             : (
// // //                                                 <TextField
// // //                                                     fullWidth
// // //                                                     label="Manager Name"
// // //                                                     variant="outlined"
// // //                                                     disabled
// // //                                                     value={ticketData.managerName}
// // //                                                     InputProps={{ readOnly: true }}
// // //                                                 />
// // //                                                 // ""
// // //                                             )
// // //                                     }
// // //                                 </div>
// // //                                 <div className="col-md-6">
// // //                                     <FormControl size="medium" fullWidth>
// // //                                         <InputLabel>Priority</InputLabel>
// // //                                         <Select
// // //                                             fullWidth
// // //                                             label="Priority"
// // //                                             value={ticketData.priority}
// // //                                             onChange={(e) => { handlePriority(e.target.value) }}
// // //                                             error={!!ticketErrors.priority}
// // //                                             helperText={ticketErrors.priority}
// // //                                         >
// // //                                             <MenuItem value="">Select Priority</MenuItem>
// // //                                             <MenuItem value="Low">Low</MenuItem>
// // //                                             <MenuItem value="Medium">Medium</MenuItem>
// // //                                             <MenuItem value="High">High</MenuItem>
// // //                                         </Select>
// // //                                     </FormControl>
// // //                                 </div>
// // //                                 <div className="col-md-12">
// // //                                     <TextField
// // //                                         fullWidth
// // //                                         label="Description"
// // //                                         variant="outlined"
// // //                                         margin="normal"
// // //                                         multiline
// // //                                         rows={4}
// // //                                         value={ticketData.ticketDescription}
// // //                                         onChange={(e) => { handleDescription(e.target.value) }}
// // //                                         error={!!ticketErrors.ticketDescription}
// // //                                         helperText={ticketErrors.ticketDescription}
// // //                                     />
// // //                                 </div>
// // //                                 <div className="col-md-12">
// // //                                     <Typography>Uplaod Images:</Typography>

// // //                                     <UploadFiles setTicketData={setTicketData} />
// // //                                 </div>
// // //                                 <div className="col-md-12">
// // //                                     <Typography>Uplaod attachments:</Typography>
// // //                                     <UploadAttachments setTicketData={setTicketData} />
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </Box>
// // //                     <Box
// // //                         sx={{
// // //                             display: 'flex',
// // //                             justifyContent: 'flex-end',
// // //                             p: 2,
// // //                             borderTop: '1px solid #ccc',
// // //                         }}
// // //                     >
// // //                         <SuperAdminCreateTicketbtn handleClose={handleClose} fetchTickets={fetchTickets} />
// // //                         {/* <SeniorManagerCreateTicketBttn handleClose={handleClose} fetchTickets={fetchTickets} /> */}
// // //                     </Box>
// // //                 </Box>
// // //             </Modal>
// // //         </div>
// // //     );
// // // }

// // // export default SuperAdminCreateTicket


// // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import {
// //     Button,
// //     Typography,
// //     TextField,
// //     Box,
// //     IconButton,
// //     FormControl,
// //     InputLabel,
// //     Select,
// //     MenuItem,
// //     CircularProgress,
// // } from "@mui/material";
// // import Modal from "@mui/material/Modal";
// // import CloseIcon from "@mui/icons-material/Close";
// // import UploadFiles from "../Components/UploadFiles/UploadFiles";
// // import UploadAttachments from "../Components/UploadAttachnents/UploadAttachnents";
// // import { useGlobalState } from "../Context/context";
// // import Cookies from "js-cookie";
// // import { getAllStores } from "../Services/stores.services";
// // import { getAllProblemCategory } from "../Services/categoryofproblem.services";
// // import { getAllUsers } from "../Services/auth.services";
// // import SuperAdminCreateTicketbtn from "./SuperAdminCreateTicketbtn";

// // const modalStyle = {
// //     position: "absolute",
// //     top: "50%",
// //     left: "50%",
// //     transform: "translate(-50%, -50%)",
// //     width: 650,
// //     height: 600,
// //     bgcolor: "background.paper",
// //     border: "1px solid #ccc",
// //     borderRadius: "8px",
// //     boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
// //     display: "flex",
// //     flexDirection: "column",
// // };

// // const contentStyle = {
// //     flexGrow: 1,
// //     overflowY: "auto",
// //     padding: "20px",
// // };

// // function SuperAdminCreateTicket({ fetchTickets }) {
// //     const { ticketData, setTicketData, reset, ticketErrors } = useGlobalState();
// //     const [open, setOpen] = useState(false);
// //     const [currentUser, setCurrentUser] = useState(null);
// //     const [categories, setCategories] = useState([]);
// //     const [stores, setStores] = useState([]);
// //     const [managers, setManagers] = useState([]);
// //     const [loadingStores, setLoadingStores] = useState(false);

// //     const id = Cookies.get("id");

// //     const MARKETS = useMemo(
// //         () => [
// //             "ALL MARKETS",
// //             "HO",
// //             "BOPK",
// //             "BOIN",
// //             "ARIZONA",
// //             "BAY AREA",
// //             "COLORADO",
// //             "DALLAS",
// //             "EL PASO",
// //             "FLORIDA",
// //             "HOUSTON",
// //             "LOS ANGELES",
// //             "MEMPHIS",
// //             "NASHVILLE",
// //             "NORTH CAROLINA",
// //             "OXNARD",
// //             "PALMDALE",
// //             "SACRAMENTO",
// //             "SAN DIEGO",
// //             "SAN FRANCISCO",
// //             "SAN JOSE",
// //             "SOLANO COUNTY",
// //         ],
// //         []
// //     );

// //     /** 🔹 Fetch current user details */
// //     const fetchCurrentUser = useCallback(async () => {
// //         try {
// //             const res = await getAllUsers();
// //             const user = res?.data?.data?.find((u) => u.id == id);
// //             if (user) {
// //                 setCurrentUser(user);
// //                 setTicketData((prev) => ({
// //                     ...prev,
// //                     name: user.name,
// //                     email: user.email,
// //                     phone: user.phone,
// //                     userId: user.id,
// //                     creatordepartment: user.subDepartment || user.department,
// //                     senior_managers: user.subDepartment || user.department,
// //                 }));
// //             }
// //         } catch (err) {
// //             console.error("Error fetching user:", err);
// //         }
// //     }, [id, setTicketData]);

// //     /** 🔹 Fetch all categories */
// //     const fetchCategories = useCallback(async () => {
// //         try {
// //             const res = await getAllProblemCategory();
// //             setCategories(res?.data?.data || []);
// //         } catch (err) {
// //             console.error("Error fetching categories:", err);
// //         }
// //     }, []);

// //     /** 🔹 Fetch stores for selected market */
// //     const fetchStores = useCallback(async () => {
// //         if (!ticketData?.market) return;
// //         try {
// //             setLoadingStores(true);
// //             const res = await getAllStores();
// //             const filtered = res?.filter(
// //                 (store) => store.market === ticketData.market
// //             );
// //             setStores(filtered || []);
// //         } catch (err) {
// //             console.error("Error fetching stores:", err);
// //         } finally {
// //             setLoadingStores(false);
// //         }
// //     }, [ticketData?.market]);

// //     /** 🔹 Fetch managers for department */
// //     const fetchManagers = useCallback(async () => {
// //         if (!ticketData.department) return;
// //         try {
// //             const res = await getAllUsers();
// //             const filtered = res?.data?.data?.filter(
// //                 (u) =>
// //                     u.department === ticketData.department &&
// //                     u.subDepartment === "Manager"
// //             );
// //             setManagers(filtered || []);
// //         } catch (err) {
// //             console.error("Error fetching managers:", err);
// //         }
// //     }, [ticketData.department]);

// //     useEffect(() => {
// //         if (open) {
// //             fetchCurrentUser();
// //             fetchCategories();
// //         }
// //     }, [open, fetchCurrentUser, fetchCategories]);

// //     useEffect(() => {
// //         fetchStores();
// //     }, [fetchStores]);

// //     useEffect(() => {
// //         fetchManagers();
// //     }, [fetchManagers]);

// //     /** 🔹 Handlers */
// //     const handleOpen = () => setOpen(true);
// //     const handleClose = () => {
// //         reset();
// //         setOpen(false);
// //     };

// //     const handleCategory = (e) => {
// //         const selectedId = e.target.value;
// //         const category = categories.find((c) => c.id === selectedId);
// //         if (category) {
// //             setTicketData((prev) => ({
// //                 ...prev,
// //                 categoryId: category.id,
// //                 category: category.name,
// //                 department: category.department,
// //                 department_email: category.department_email,
// //             }));
// //         }
// //     };

// //     const handleStore = (e) => {
// //         const value = e.target.value;
// //         if (
// //             ["All Stores", "HO", "BOPK", "BOIN"].includes(value)
// //         ) {
// //             setTicketData((prev) => ({
// //                 ...prev,
// //                 storeId: value,
// //                 store: value,
// //                 store_email: value,
// //                 store_phone: value,
// //                 store_Tech_id: value,
// //                 store_detail: value,
// //             }));
// //             return;
// //         }

// //         const selectedStore = stores.find((s) => s.id === value);
// //         if (selectedStore) {
// //             setTicketData((prev) => ({
// //                 ...prev,
// //                 storeId: selectedStore.id,
// //                 store: selectedStore.store_name,
// //                 store_email: selectedStore.store_email,
// //                 store_phone: selectedStore.store_phone,
// //                 store_Tech_id: selectedStore.bdi_id,
// //                 store_detail: selectedStore,
// //             }));
// //         }
// //     };

// //     const handleManagerChange = (e) => {
// //         const selectedManager = managers.find((m) => m.name === e.target.value);
// //         if (selectedManager) {
// //             setTicketData((prev) => ({
// //                 ...prev,
// //                 managerID: selectedManager.id,
// //                 managerName: selectedManager.name,
// //                 managerName_email: selectedManager.email,
// //             }));
// //         }
// //     };

// //     const handleDescription = (e) =>
// //         setTicketData((prev) => ({ ...prev, ticketDescription: e.target.value }));

// //     const handlePriority = (e) =>
// //         setTicketData((prev) => ({ ...prev, priority: e.target.value }));

// //     return (
// //         <>
// //             <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={handleOpen}
// //                 sx={{ textTransform: "none", fontSize: "1rem", p: "10px 20px" }}
// //             >
// //                 Create New Ticket
// //             </Button>

// //             <Modal open={open} onClose={handleClose}>
// //                 <Box sx={modalStyle}>
// //                     {/* Header */}
// //                     <Box
// //                         sx={{
// //                             display: "flex",
// //                             justifyContent: "space-between",
// //                             alignItems: "center",
// //                             p: 2,
// //                             borderBottom: "1px solid #ccc",
// //                         }}
// //                     >
// //                         <Typography variant="h5" fontWeight="bold">
// //                             Create New Ticket
// //                         </Typography>
// //                         <IconButton onClick={handleClose}>
// //                             <CloseIcon />
// //                         </IconButton>
// //                     </Box>

// //                     {/* Content */}
// //                     <Box sx={contentStyle}>
// //                         <div className="container">
// //                             <div className="row d-flex align-items-center" style={{ gap: "10px 0" }}>
// //                                 {/* User Info */}
// //                                 <div className="col-md-6">
// //                                     <TextField fullWidth value={currentUser?.name || ""} label="Name" disabled />
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                     <TextField fullWidth value={currentUser?.email || ""} label="Email" disabled />
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                     <TextField fullWidth value={currentUser?.phone || ""} label="Phone" disabled />
// //                                 </div>

// //                                 {/* Market */}
// //                                 <div className="col-md-6">
// //                                     <TextField
// //                                         select
// //                                         fullWidth
// //                                         label="Market"
// //                                         value={ticketData.market || ""}
// //                                         onChange={(e) => setTicketData((prev) => ({ ...prev, market: e.target.value }))}
// //                                         error={!!ticketErrors.market}
// //                                         helperText={ticketErrors.market}
// //                                     >
// //                                         {MARKETS.map((m, i) => (
// //                                             <MenuItem key={i} value={m}>
// //                                                 {m}
// //                                             </MenuItem>
// //                                         ))}
// //                                     </TextField>
// //                                 </div>

// //                                 {/* Stores */}
// //                                 <div className="col-md-6">
// //                                     <FormControl fullWidth>
// //                                         <InputLabel>Stores</InputLabel>
// //                                         <Select
// //                                             label="Stores"
// //                                             value={ticketData.storeId || ""}
// //                                             onChange={handleStore}
// //                                             disabled={!ticketData.market}
// //                                         >
// //                                             <MenuItem value="">Select Store</MenuItem>
// //                                             <MenuItem value="All Stores">All Stores</MenuItem>
// //                                             <MenuItem value="BOPK">BOPK</MenuItem>
// //                                             <MenuItem value="BOIN">BOIN</MenuItem>
// //                                             {loadingStores ? (
// //                                                 <MenuItem disabled>
// //                                                     <CircularProgress size={25} />
// //                                                 </MenuItem>
// //                                             ) : (
// //                                                 stores.map((s) => (
// //                                                     <MenuItem key={s.id} value={s.id}>
// //                                                         {s.store_name}
// //                                                     </MenuItem>
// //                                                 ))
// //                                             )}
// //                                         </Select>
// //                                     </FormControl>
// //                                 </div>

// //                                 {/* Category */}
// //                                 <div className="col-md-6">
// //                                     <FormControl fullWidth>
// //                                         <InputLabel>Category</InputLabel>
// //                                         <Select
// //                                             label="Category"
// //                                             value={ticketData.categoryId || ""}
// //                                             onChange={handleCategory}
// //                                         >
// //                                             <MenuItem value="">Select Category</MenuItem>
// //                                             {categories.map((c) => (
// //                                                 <MenuItem key={c.id} value={c.id}>
// //                                                     {c.name}
// //                                                 </MenuItem>
// //                                             ))}
// //                                         </Select>
// //                                     </FormControl>
// //                                 </div>

// //                                 {/* Department */}
// //                                 <div className="col-md-6">
// //                                     <TextField
// //                                         fullWidth
// //                                         label="Department"
// //                                         value={ticketData.department || ""}
// //                                         disabled
// //                                     />
// //                                 </div>

// //                                 {/* Manager */}
// //                                 <div className="col-md-6">
// //                                     {managers.length > 1 ? (
// //                                         <TextField
// //                                             select
// //                                             fullWidth
// //                                             label="Manager"
// //                                             value={ticketData.managerName || ""}
// //                                             onChange={handleManagerChange}
// //                                         >
// //                                             {managers.map((m) => (
// //                                                 <MenuItem key={m.id} value={m.name}>
// //                                                     {m.name}
// //                                                 </MenuItem>
// //                                             ))}
// //                                         </TextField>
// //                                     ) : (
// //                                         <TextField
// //                                             fullWidth
// //                                             label="Manager"
// //                                             value={managers[0]?.name || "N/A"}
// //                                             disabled
// //                                         />
// //                                     )}
// //                                 </div>

// //                                 {/* Priority */}
// //                                 <div className="col-md-6">
// //                                     <FormControl fullWidth>
// //                                         <InputLabel>Priority</InputLabel>
// //                                         <Select
// //                                             value={ticketData.priority || ""}
// //                                             onChange={handlePriority}
// //                                         >
// //                                             <MenuItem value="">Select Priority</MenuItem>
// //                                             <MenuItem value="Low">Low</MenuItem>
// //                                             <MenuItem value="Medium">Medium</MenuItem>
// //                                             <MenuItem value="High">High</MenuItem>
// //                                         </Select>
// //                                     </FormControl>
// //                                 </div>

// //                                 {/* Description */}
// //                                 <div className="col-md-12">
// //                                     <TextField
// //                                         fullWidth
// //                                         multiline
// //                                         rows={4}
// //                                         label="Description"
// //                                         value={ticketData.ticketDescription || ""}
// //                                         onChange={handleDescription}
// //                                     />
// //                                 </div>

// //                                 {/* Uploads */}
// //                                 <div className="col-md-12">
// //                                     <Typography>Upload Images:</Typography>
// //                                     <UploadFiles setTicketData={setTicketData} />
// //                                 </div>
// //                                 <div className="col-md-12">
// //                                     <Typography>Upload Attachments:</Typography>
// //                                     <UploadAttachments setTicketData={setTicketData} />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </Box>

// //                     {/* Footer */}
// //                     <Box
// //                         sx={{
// //                             display: "flex",
// //                             justifyContent: "flex-end",
// //                             p: 2,
// //                             borderTop: "1px solid #ccc",
// //                         }}
// //                     >
// //                         <SuperAdminCreateTicketbtn handleClose={handleClose} fetchTickets={fetchTickets} />
// //                     </Box>
// //                 </Box>
// //             </Modal>
// //         </>
// //     );
// // }

// // export default SuperAdminCreateTicket;

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import {
//     Button,
//     Typography,
//     TextField,
//     Box,
//     IconButton,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     CircularProgress,
// } from "@mui/material";
// import Modal from "@mui/material/Modal";
// import CloseIcon from "@mui/icons-material/Close";
// import UploadFiles from "../Components/UploadFiles/UploadFiles";
// import UploadAttachments from "../Components/UploadAttachnents/UploadAttachnents";
// import { useGlobalState } from "../Context/context";
// import Cookies from "js-cookie";
// import { getAllStores } from "../Services/stores.services";
// import { getAllProblemCategory } from "../Services/categoryofproblem.services";
// import { getAllUsers } from "../Services/auth.services";
// import SuperAdminCreateTicketbtn from "./SuperAdminCreateTicketbtn";

// const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 650,
//     height: 600,
//     bgcolor: "background.paper",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     flexDirection: "column",
// };

// const contentStyle = {
//     flexGrow: 1,
//     overflowY: "auto",
//     padding: "20px",
// };

// function SuperAdminCreateTicket({ fetchTickets }) {
//     const { ticketData, setTicketData, reset, ticketErrors } = useGlobalState();
//     const [open, setOpen] = useState(false);

//     const [loading, setLoading] = useState(false);
//     const [users, setUsers] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [stores, setStores] = useState([]);
//     const [filteredStores, setFilteredStores] = useState([]);
//     const [managers, setManagers] = useState([]);
//     const [currentUser, setCurrentUser] = useState(null);

//     const id = Cookies.get("id");

//     const MARKETS = useMemo(
//         () => [
//             "ALL MARKETS",
//             "HO",
//             "BOPK",
//             "BOIN",
//             "ARIZONA",
//             "BAY AREA",
//             "COLORADO",
//             "DALLAS",
//             "EL PASO",
//             "FLORIDA",
//             "HOUSTON",
//             "LOS ANGELES",
//             "MEMPHIS",
//             "NASHVILLE",
//             "NORTH CAROLINA",
//             "OXNARD",
//             "PALMDALE",
//             "SACRAMENTO",
//             "SAN DIEGO",
//             "SAN FRANCISCO",
//             "SAN JOSE",
//             "SOLANO COUNTY",
//         ],
//         []
//     );

//     /** ⚡ Preload everything only once (cached) */
//     const preloadData = useCallback(async () => {
//         if (loading || users.length) return; // prevent refetch
//         setLoading(true);
//         try {
//             const [usersRes, storesRes, catRes] = await Promise.all([
//                 getAllUsers(),
//                 getAllStores(),
//                 getAllProblemCategory(),
//             ]);

//             const allUsers = usersRes?.data?.data || [];
//             setUsers(allUsers);
//             setStores(storesRes || []);
//             setCategories(catRes?.data?.data || []);

//             const current = allUsers.find((u) => u.id == id);
//             if (current) {
//                 setCurrentUser(current);
//                 setTicketData((prev) => ({
//                     ...prev,
//                     name: current.name,
//                     email: current.email,
//                     phone: current.phone,
//                     userId: current.id,
//                     creatordepartment: current.subDepartment || current.department,
//                     senior_managers: current.subDepartment || current.department,
//                 }));
//             }
//         } catch (err) {
//             console.error("⚠️ preload error:", err);
//         } finally {
//             setLoading(false);
//         }
//     }, [id, loading, users.length, setTicketData]);

//     /** ⚡ Filter stores when market changes */
//     useEffect(() => {
//         if (!ticketData.market) return;
//         const matched = stores.filter((s) => s.market === ticketData.market);
//         setFilteredStores(matched);
//     }, [ticketData.market, stores]);

//     /** ⚡ Filter managers when department changes */
//     useEffect(() => {
//         if (!ticketData.department) return;
//         const mgrs = users.filter(
//             (u) =>
//                 u.department === ticketData.department && u.subDepartment === "Manager"
//         );
//         setManagers(mgrs);
//     }, [ticketData.department, users]);

//     const handleOpen = async () => {
//         await preloadData();
//         setOpen(true);
//     };

//     const handleClose = () => {
//         reset();
//         setOpen(false);
//     };

//     /** ✅ Category handler */
//     const handleCategory = (e) => {
//         const selected = categories.find((c) => c.id === e.target.value);
//         if (selected) {
//             setTicketData((prev) => ({
//                 ...prev,
//                 categoryId: selected.id,
//                 category: selected.name,
//                 department: selected.department,
//                 department_email: selected.department_email,
//             }));
//         }
//     };

//     /** ✅ Store handler */
//     const handleStore = (e) => {
//         const value = e.target.value;
//         const fixed = ["All Stores", "HO", "BOPK", "BOIN"];

//         if (fixed.includes(value)) {
//             setTicketData((prev) => ({
//                 ...prev,
//                 storeId: value,
//                 store: value,
//                 store_email: value,
//                 store_phone: value,
//                 store_Tech_id: value,
//                 store_detail: value,
//             }));
//             return;
//         }

//         const selected = filteredStores.find((s) => s.id === value);
//         console.log(selected)
//         if (selected) {
//             setTicketData((prev) => ({
//                 ...prev,
//                 storeId: selected?.id,
//                 store: selected?.store_name,
//                 store_email: selected?.store_email,
//                 store_phone: selected?.store_phone,
//                 store_Tech_id: selected?.bdi_id,
//                 store_detail: selected,
//             }));
//         }
//     };

//     /** ✅ Manager handler */
//     const handleManagerChange = (e) => {
//         const selected = managers.find((m) => m.name === e.target.value);
//         console.log(selected)
//         if (selected) {
//             setTicketData((prev) => ({
//                 ...prev,
//                 managerID: selected?.id,
//                 managerName: selected?.name,
//                 managerName_email: selected?.email,
//             }));
//         }
//     };

//     /** ✅ Priority / Description */
//     const handlePriority = (e) =>
//         setTicketData((prev) => ({ ...prev, priority: e.target.value }));

//     const handleDescription = (e) =>
//         setTicketData((prev) => ({ ...prev, ticketDescription: e.target.value }));

//     return (
//         <>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleOpen}
//                 sx={{ textTransform: "none", fontSize: "1rem", p: "10px 20px" }}
//             >
//                 {loading ? "Loading..." : "Create New Ticket"}
//             </Button>

//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={modalStyle}>
//                     {/* Header */}
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             p: 2,
//                             borderBottom: "1px solid #ccc",
//                         }}
//                     >
//                         <Typography variant="h5" fontWeight="bold">
//                             Create New Ticket
//                         </Typography>
//                         <IconButton onClick={handleClose}>
//                             <CloseIcon />
//                         </IconButton>
//                     </Box>

//                     {/* Content */}
//                     <Box sx={contentStyle}>
//                         {loading ? (
//                             <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                                 <CircularProgress />
//                             </Box>
//                         ) : (
//                             <div className="container">
//                                 <div className="row d-flex align-items-center" style={{ gap: "10px 0" }}>
//                                     <div className="col-md-6">
//                                         <TextField fullWidth value={currentUser?.name || ""} label="Name" disabled />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <TextField fullWidth value={currentUser?.email || ""} label="Email" disabled />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <TextField fullWidth value={currentUser?.phone || ""} label="Phone" disabled />
//                                     </div>

//                                     <div className="col-md-6">
//                                         <TextField
//                                             select
//                                             fullWidth
//                                             label="Market"
//                                             value={ticketData.market || ""}
//                                             onChange={(e) =>
//                                                 setTicketData((prev) => ({ ...prev, market: e.target.value }))
//                                             }
//                                         >
//                                             {MARKETS.map((m, i) => (
//                                                 <MenuItem key={i} value={m}>
//                                                     {m}
//                                                 </MenuItem>
//                                             ))}
//                                         </TextField>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <FormControl fullWidth>
//                                             <InputLabel>Store</InputLabel>
//                                             <Select
//                                                 label="Store"
//                                                 value={ticketData.storeId || ""}
//                                                 onChange={handleStore}
//                                                 disabled={!ticketData.market}
//                                             >
//                                                 <MenuItem value="">Select Store</MenuItem>
//                                                 <MenuItem value="All Stores">All Stores</MenuItem>
//                                                 <MenuItem value="BOPK">BOPK</MenuItem>
//                                                 <MenuItem value="BOIN">BOIN</MenuItem>
//                                                 {filteredStores.map((s) => (
//                                                     <MenuItem key={s.id} value={s.id}>
//                                                         {s.store_name}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                         </FormControl>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <FormControl fullWidth>
//                                             <InputLabel>Category</InputLabel>
//                                             <Select
//                                                 label="Category"
//                                                 value={ticketData.categoryId || ""}
//                                                 onChange={handleCategory}
//                                             >
//                                                 <MenuItem value="">Select Category</MenuItem>
//                                                 {categories.map((c) => (
//                                                     <MenuItem key={c.id} value={c.id}>
//                                                         {c.name}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                         </FormControl>
//                                     </div>

//                                     <div className="col-md-6">
//                                         <TextField fullWidth label="Department" value={ticketData.department || ""} disabled />
//                                     </div>

//                                     <div className="col-md-6">
//                                         {managers.length > 1 ? (
//                                             <TextField
//                                                 select
//                                                 fullWidth
//                                                 label="Manager"
//                                                 value={ticketData.managerName || ""}
//                                                 onChange={handleManagerChange}
//                                             >
//                                                 {managers.map((m) => (
//                                                     <MenuItem key={m.id} value={m.name}>
//                                                         {m.name}
//                                                     </MenuItem>
//                                                 ))}
//                                             </TextField>
//                                         ) : (
//                                             <TextField fullWidth label="Manager" value={managers[0]?.name || "N/A"} disabled />
//                                         )}
//                                     </div>

//                                     <div className="col-md-6">
//                                         <FormControl fullWidth>
//                                             <InputLabel>Priority</InputLabel>
//                                             <Select value={ticketData.priority || ""} onChange={handlePriority}>
//                                                 <MenuItem value="">Select Priority</MenuItem>
//                                                 <MenuItem value="Low">Low</MenuItem>
//                                                 <MenuItem value="Medium">Medium</MenuItem>
//                                                 <MenuItem value="High">High</MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     </div>

//                                     <div className="col-md-12">
//                                         <TextField
//                                             fullWidth
//                                             multiline
//                                             rows={4}
//                                             label="Description"
//                                             value={ticketData.ticketDescription || ""}
//                                             onChange={handleDescription}
//                                         />
//                                     </div>

//                                     <div className="col-md-12">
//                                         <Typography>Upload Images:</Typography>
//                                         <UploadFiles setTicketData={setTicketData} />
//                                     </div>
//                                     <div className="col-md-12">
//                                         <Typography>Upload Attachments:</Typography>
//                                         <UploadAttachments setTicketData={setTicketData} />
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </Box>

//                     <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, borderTop: "1px solid #ccc" }}>
//                         <SuperAdminCreateTicketbtn handleClose={handleClose} fetchTickets={fetchTickets} />
//                     </Box>
//                 </Box>
//             </Modal>
//         </>
//     );
// }

// export default SuperAdminCreateTicket;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Typography, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import UploadFiles from '../Components/UploadFiles/UploadFiles';
import { useGlobalState } from '../Context/context';
import Cookies from 'js-cookie'
import { getAllStores } from '../Services/stores.services';
import { getAllProblemCategory } from '../Services/categoryofproblem.services';
import { getAllUser } from '../Services/auth.services';
import { useSelector } from 'react-redux';
import UploadAttachments from '../Components/UploadAttachnents/UploadAttachnents';
import SuperAdminCreateTicketbtn from './SuperAdminCreateTicketbtn';
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

function SuperAdminCreateTicket({ fetchTickets }) {
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
                        <SuperAdminCreateTicketbtn handleClose={handleClose} fetchTickets={fetchTickets} getCurrentUser={getCurrentUser} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default SuperAdminCreateTicket