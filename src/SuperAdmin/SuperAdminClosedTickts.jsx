// // import React, { useCallback, useEffect, useState } from 'react';
// // import {
// //     Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
// //     TextField, InputAdornment, IconButton, CircularProgress
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// // import { getalltickets } from '../Services/tickets.services';
// // import { decodeToken } from '../Utils/decodedToken.utils';
// // import cookie from 'js-cookie';
// // import { useNavigate } from 'react-router-dom';
// // function SuperAdminClosedTickts() {
// //     const decodedTickets = decodeToken();
// //     const { department, subDepartment } = decodedTickets;
// //     const id = cookie.get('id');

// //     const [tickets, setTickets] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [searchTerm, setSearchTerm] = useState("");

// //     const navigate = useNavigate();

// //     const fetchAllTickets = useCallback(async () => {
// //         setLoading(true);
// //         try {
// //             const response = await getalltickets();
// //             let filtered = response.data.data.filter(
// //                 (data) =>
// //                     data.status === "close"
// //             );
// //             setTickets(filtered);
// //         } catch (error) {
// //             console.log("ERROR", error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, [department, subDepartment, id]);

// //     useEffect(() => {
// //         fetchAllTickets();
// //     }, [fetchAllTickets]);

// //     const handleReviewTicket = (id) => {
// //         navigate(`/manager-review-ticket/${id}`);
// //     };

// //     const filteredTickets = tickets.filter((ticket) =>
// //         ticket.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         ticket.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         ticket.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         ticket.priority?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );

// //     return (
// //         <div className="container-fluid">
// //             <BasicBreadcrumbs name={"Closed Tickets"} />
// //             <div className="row my-4">
// //                 <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
// //                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
// //                         <TextField
// //                             size="small"
// //                             placeholder="Search..."
// //                             value={searchTerm}
// //                             onChange={(e) => setSearchTerm(e.target.value)}
// //                             sx={{ width: 300 }}
// //                             InputProps={{
// //                                 endAdornment: (
// //                                     <InputAdornment position="end">
// //                                         <IconButton>
// //                                             <SearchIcon />
// //                                         </IconButton>
// //                                     </InputAdornment>
// //                                 ),
// //                             }}
// //                         />
// //                     </div>
// //                 </div>
// //             </div>
// //             <Box sx={{ mt: 3 }}>
// //                 <TableContainer component={Paper}>
// //                     <Table>
// //                         <TableHead>
// //                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
// //                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Type</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Description</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {loading ? (
// //                                 <TableRow>
// //                                     <TableCell colSpan={8} align="center" height={200}>
// //                                         <CircularProgress />
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ) : filteredTickets.length === 0 ? (
// //                                 <TableRow>
// //                                     <TableCell colSpan={8} align="center" height={100}>
// //                                         No matching tickets found
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ) : (
// //                                 filteredTickets.map(ticket => (
// //                                     <TableRow
// //                                         key={ticket._id}
// //                                         hover
// //                                         onClick={() => handleReviewTicket(ticket._id)}
// //                                         sx={{ cursor: 'pointer' }}
// //                                     >
// //                                         <TableCell>{ticket.ticketId}</TableCell>
// //                                         <TableCell>{ticket.priority}</TableCell>
// //                                         <TableCell>{ticket.name}</TableCell>
// //                                         <TableCell>{ticket.status}</TableCell>
// //                                         <TableCell>{ticket.category}</TableCell>
// //                                         <TableCell>{ticket.ticketDescription}</TableCell>
// //                                         <TableCell>{ticket.assignerName || "N/A"}</TableCell>
// //                                     </TableRow>
// //                                 ))
// //                             )}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             </Box>
// //         </div>
// //     );
// // }

// // export default SuperAdminClosedTickts

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     TextField, InputAdornment, IconButton, CircularProgress, FormControl, InputLabel, Select, MenuItem
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import { getalltickets } from '../Services/tickets.services';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import cookie from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import { getAllStores } from '../Services/stores.services';

// function SuperAdminClosedTickets() {
//     const decodedTickets = decodeToken();
//     const { department, subDepartment } = decodedTickets;
//     const id = cookie.get('id');

//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [priority, setPriority] = useState('');
//     const [status, setStatus] = useState('');
//     const [department, setDepartments] = useState("");
//     const [storeName, setstoreName] = useState("");
//     const [market, setMarket] = useState("");
//     const marketsList = [
//         "ALL MARKETS", "HO", "BOPK", "BOIN", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
//         "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
//         "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
//         "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
//     ];
//     const [departments] = useState([
//         "All", "HO", "BOPK", "BOIN", "Admin", "Admin / IT", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Reporting", "Inventory", "Maintenance", "Commission", "Compliance", "SCM", "QA", "Vigilence", "MIS", "Data Analytics", "Supervisor", "Local IT"
//     ]);

//     const navigate = useNavigate();

//     // Fetch all closed tickets
//     const fetchAllTickets = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await getalltickets();
//             const closedTickets = response.data.data.filter(ticket => ticket.status === 'close');
//             setTickets(closedTickets);
//         } catch (error) {
//             console.error("Error fetching tickets:", error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchAllTickets();
//     }, [fetchAllTickets]);
//     const fetchAllStores = useCallback(async () => {
//         setLoader(true);
//         try {
//             const response = await getAllStores();
//             const filteredStores = market ? response.filter((s) => s.market === market) : [];
//             setStores(filteredStores);
//             console.log(filteredStores);
//             setLoader(false);
//             setStore(''); // Reset store when market changes
//         } catch (error) {
//             setLoader(false);
//             console.error('ERROR', error.message);
//         } finally {
//             setLoader(false);
//         }
//     }, [market]);
//     useEffect(() => {
//         fetchAllStores();
//     }, [fetchAllStores]);

//     const handleReviewTicket = (id) => {
//         navigate(`/manager-review-ticket/${id}`);
//     };

//     // Filter tickets based on search and filters
//     const filteredTickets = tickets.filter(ticket => {
//         const matchesSearch = [
//             ticket.ticketId,
//             ticket.name,
//             ticket.status,
//             ticket.category,
//             ticket.priority
//         ].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

//         const matchesPriority = priority ? ticket.priority === priority : true;
//         const matchesStatus = status ? ticket.status === status : true;

//         return matchesSearch && matchesPriority && matchesStatus;
//     });

//     return (
//         <div className="container-fluid">
//             <BasicBreadcrumbs name="Closed Tickets" />

//             <div className="row my-4">
//                 <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
//                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
//                         <TextField
//                             size="small"
//                             placeholder="Search..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             sx={{ width: 300 }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton>
//                                             <SearchIcon />
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />

//                         <FormControl size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Priority</InputLabel>
//                             <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl>

//                         <FormControl size="small" sx={{ minWidth: 150 }}>
//                             <InputLabel>Status</InputLabel>
//                             <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="open">Open</MenuItem>
//                                 <MenuItem value="close">Closed</MenuItem>
//                                 <MenuItem value="pending">Paused</MenuItem>
//                                 <MenuItem value="assigned">Assigned</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl size="small" sx={{ minWidth: 150 }}>
//                             <InputLabel>Departments</InputLabel>
//                             <Select value={department} label="Departments"
//                                 onChange={(e) => {
//                                     const value = e.target.value;
//                                     setDepartments(value);
//                                     if (value === "All") {
//                                         // yahan aap function call kar sakte ho jo sab tickets/data fetch kare
//                                         fetchAllTickets();
//                                     } else {
//                                         // yahan sirf selected department ka data fetch karo
//                                         setDepartments(value);
//                                     }
//                                 }}
//                             >
//                                 {departments.map((dept, index) => (
//                                     <MenuItem key={index} value={dept}>{dept}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <FormControl size="small" sx={{ minWidth: 180 }}>
//                             <InputLabel>Markets</InputLabel>
//                             <Select value={market} label="Markets" onChange={(e) => setMarket(e.target.value)}>
//                                 <MenuItem value="">All</MenuItem>
//                                 {marketsList.map((m, idx) => (
//                                     <MenuItem key={idx} value={m}>{m}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <FormControl size='small' sx={{ minWidth: 200 }} disabled={!market}>
//                             <InputLabel>Stores</InputLabel>
//                             <Select value={store} label='Store' onChange={(e) => setstoreName(e.target.value)}>
//                                 <MenuItem value=''>All</MenuItem>
//                                 {loader ? < CircularProgress size={25} sx={{ alignItems: "center" }} /> : stores?.map((storeItem, index) => (
//                                     <MenuItem key={index} value={storeItem.store_name}>{storeItem.store_name}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </div>
//                 </div>
//             </div>

//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Type</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Description</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={7} align="center" height={200}>
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : filteredTickets.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={7} align="center" height={100}>
//                                         No matching tickets found
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredTickets.map(ticket => (
//                                     <TableRow
//                                         key={ticket._id}
//                                         hover
//                                         onClick={() => handleReviewTicket(ticket._id)}
//                                         sx={{ cursor: 'pointer' }}
//                                     >
//                                         <TableCell>{ticket.ticketId}</TableCell>
//                                         <TableCell>{ticket.priority}</TableCell>
//                                         <TableCell>{ticket.name}</TableCell>
//                                         <TableCell>{ticket.status}</TableCell>
//                                         <TableCell>{ticket.category}</TableCell>
//                                         <TableCell>{ticket.ticketDescription}</TableCell>
//                                         <TableCell>{ticket.assignerName || "N/A"}</TableCell>
//                                     </TableRow>
//                                 ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default SuperAdminClosedTickets;



import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, InputAdornment, IconButton, CircularProgress, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getalltickets } from '../Services/tickets.services';
import { getAllStores } from '../Services/stores.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SuperAdminClosedTickets() {
    const decodedTickets = decodeToken();
    const id = cookie.get('id');

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [department, setDepartment] = useState('All');
    const [storeName, setStoreName] = useState('');
    const [market, setMarket] = useState('');
    const [stores, setStores] = useState([]);
    const [storeLoader, setStoreLoader] = useState(false);

    const navigate = useNavigate();

    const departmentsList = [
        "All", "HO", "BOPK", "BOIN", "Admin", "Admin / IT", "Finance (GL)", "Finance AR", "SUPERVISOR",
        "HR", "IT", "Software India", "Reporting", "Inventory", "Maintenance", "Commission", "Compliance",
        "SCM", "QA", "Vigilence", "MIS", "Data Analytics", "Supervisor", "Local IT"
    ];

    const marketsList = [
        "ALL MARKETS", "HO", "BOPK", "BOIN", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
        "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
        "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
        "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
    ];

    // Fetch all closed tickets
    const fetchAllTickets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getalltickets();
            const closedTickets = response.data.data.filter(ticket => ticket.status === 'close');
            setTickets(closedTickets);
        } catch (error) {
            console.error("Error fetching tickets:", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllTickets();
    }, [fetchAllTickets]);

    // Fetch stores based on selected market
    const fetchStores = useCallback(async () => {
        if (!market) {
            setStores([]);
            setStoreName('');
            return;
        }
        setStoreLoader(true);
        try {
            const response = await getAllStores();
            const filteredStores = response.filter(store => store.market === market);
            setStores(filteredStores);
            setStoreName('');
        } catch (error) {
            console.error("Error fetching stores:", error.message);
        } finally {
            setStoreLoader(false);
        }
    }, [market]);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const handleReviewTicket = (id) => {
        navigate(`/manager-review-ticket/${id}`);
    };

    // Filter tickets based on search, priority, status, department, market, and store
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = [
            ticket.ticketId,
            ticket.name,
            ticket.status,
            ticket.category,
            ticket.priority
        ].some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesPriority = priority ? ticket.priority === priority : true;
        const matchesStatus = status ? ticket.status === status : true;
        const matchesDepartment = department && department !== "All" ? ticket.department === department : true;
        const matchesMarket = market && market !== "ALL MARKETS" ? ticket.market === market : true;
        const matchesStore = storeName ? ticket.store_name === storeName : true;

        return matchesSearch && matchesPriority && matchesStatus && matchesDepartment && matchesMarket && matchesStore;
    });

    return (
        <div className="container-fluid">
            <BasicBreadcrumbs name="Closed Tickets" />

            <div className="row my-4">
                <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
                    <div className="d-flex flex-wrap align-items-center" style={{ gap: "10px" }}>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: 250 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="open">Open</MenuItem>
                                <MenuItem value="close">Closed</MenuItem>
                                <MenuItem value="pending">Paused</MenuItem>
                                <MenuItem value="assigned">Assigned</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Departments</InputLabel>
                            <Select value={department} label="Departments" onChange={(e) => setDepartment(e.target.value)}>
                                {departmentsList.map((dept, index) => (
                                    <MenuItem key={index} value={dept}>{dept}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Markets</InputLabel>
                            <Select value={market} label="Markets" onChange={(e) => setMarket(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                {marketsList.map((m, idx) => (
                                    <MenuItem key={idx} value={m}>{m}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size='small' sx={{ minWidth: 200 }} disabled={!market}>
                            <InputLabel>Stores</InputLabel>
                            <Select value={storeName} label='Store' onChange={(e) => setStoreName(e.target.value)}>
                                <MenuItem value=''>All</MenuItem>
                                {storeLoader ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={20} />
                                    </MenuItem>
                                ) : (
                                    stores.map((storeItem, index) => (
                                        <MenuItem key={index} value={storeItem.store_name}>
                                            {storeItem.store_name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>

            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                                <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                                <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" height={200}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredTickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" height={100}>
                                        No matching tickets found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTickets.map(ticket => (
                                    <TableRow
                                        key={ticket._id}
                                        hover
                                        onClick={() => handleReviewTicket(ticket._id)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{ticket.ticketId}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>{ticket.name}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.category}</TableCell>
                                        <TableCell>{ticket.ticketDescription}</TableCell>
                                        <TableCell>{ticket.assignerName || "N/A"}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default SuperAdminClosedTickets;