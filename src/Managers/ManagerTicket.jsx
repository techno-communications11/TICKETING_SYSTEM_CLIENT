// // import React, { useCallback, useEffect, useState } from 'react';
// // import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import ManagerCreateTickets from './ManagerCreateTickets';
// // import { useNavigate } from 'react-router-dom';
// // import cookie from 'js-cookie';
// // import { decodeToken } from '../Utils/decodedToken.utils';
// // import { getalltickets } from '../Services/tickets.services';
// // function ManagerTicket() {
// //     const decodedTickets = decodeToken();
// //     const { department, subDepartment } = decodedTickets;
// //     const id = cookie.get('id');
// //     // const tickets = [
// //     //     { id: "TID0934893", priority: "Low", clientName: "Dane John", status: "Open", dueBy: "22 Dec 2022", type: "Technical", solvedBy: "Shekhar Khan" },
// //     //     { id: "TID0934894", priority: "Medium", clientName: "John Doe", status: "Closed", dueBy: "23 Dec 2022", type: "Support", solvedBy: "Jane Smith" },
// //     //     { id: "TID0934895", priority: "High", clientName: "Alice Brown", status: "Assigned", dueBy: "24 Dec 2022", type: "Billing", solvedBy: "Mark Johnson" },
// //     // ];
// //     const [tickets, setTicket] = useState([]);
// //     const [loading, setLoading] = useState(false);

// //     const fetchTickets = useCallback(async () => {
// //         setLoading(true);
// //         try {
// //             const resposne = await getalltickets();
// //             const filterartion = resposne?.data?.data.filter((data) => data.department === department && data.subDepartment === subDepartment || data.managerID === id || data.userId === id || data.assignerId === id && data.approved === true);
// //             setTicket(filterartion);
// //         } catch (error) {
// //             setLoading(false);
// //             console.log("error", error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, [setTicket])

// //     useEffect(() => {
// //         fetchTickets();
// //     }, [id, fetchTickets]);

// //     const [selectedRows, setSelectedRows] = useState([]);
// //     const [activeFilter, setActiveFilter] = useState("Total");
// //     const [priority, setPriority] = useState("");
// //     const [status, setStatus] = useState("");
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const handleRowSelect = (id) => {
// //         if (selectedRows.includes(id)) {
// //             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
// //         } else {
// //             setSelectedRows([...selectedRows, id]);
// //         }
// //     };
// //     const handleSelectAll = () => {
// //         if (selectedRows.length === tickets.length) {
// //             setSelectedRows([]);
// //         } else {
// //             setSelectedRows(tickets.map(ticket => ticket.id));
// //         }
// //     };

// //     const navigate = useNavigate();

// //     const handleReviewTicket = (id) => {
// //         navigate(`/manager-review-ticket/${id}`);
// //     }
// //     return (
// //         <div className="container">
// //             <div className="row">
// //                 <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
// //                     <div className="d-flex align-items-center" style={{ gap: "6px 6px" }}>
// //                         <Button
// //                             variant={activeFilter === "Total" ? "contained" : "outlined"}
// //                             onClick={() => setActiveFilter("Total")}
// //                         >
// //                             Total
// //                         </Button>
// //                         <Button
// //                             variant={activeFilter === "Complete" ? "contained" : "outlined"}
// //                             onClick={() => setActiveFilter("Complete")}
// //                         >
// //                             Complete
// //                         </Button>
// //                         <Button
// //                             variant={activeFilter === "Closed" ? "contained" : "outlined"}
// //                             onClick={() => setActiveFilter("Closed")}
// //                         >
// //                             Closed
// //                         </Button>
// //                         <Button
// //                             variant={activeFilter === "Pending" ? "contained" : "outlined"}
// //                             onClick={() => setActiveFilter("Pending")}
// //                         >
// //                             Pending
// //                         </Button>
// //                     </div>
// //                     <div className="">
// //                         <ManagerCreateTickets fetchTickets={fetchTickets} />
// //                     </div>
// //                 </div>
// //             </div>
// //             <div className="row my-4">
// //                 <div className="col-md-12">
// //                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
// //                         <FormControl size="small" sx={{ minWidth: 120 }}>
// //                             <InputLabel>Priority</InputLabel>
// //                             <Select
// //                                 value={priority}
// //                                 label="Priority"
// //                                 onChange={(e) => setPriority(e.target.value)}
// //                             >
// //                                 <MenuItem value="">All</MenuItem>
// //                                 <MenuItem value="Low">Low</MenuItem>
// //                                 <MenuItem value="Medium">Medium</MenuItem>
// //                                 <MenuItem value="High">High</MenuItem>
// //                             </Select>
// //                         </FormControl>
// //                         <FormControl size="small" sx={{ minWidth: 150 }}>
// //                             <InputLabel>Status</InputLabel>
// //                             <Select
// //                                 value={status}
// //                                 label="Status"
// //                                 onChange={(e) => setStatus(e.target.value)}
// //                             >
// //                                 <MenuItem value="">All</MenuItem>
// //                                 <MenuItem value="Open">Open</MenuItem>
// //                                 <MenuItem value="Closed">Closed</MenuItem>
// //                                 <MenuItem value="Paused">Paused</MenuItem>
// //                                 <MenuItem value="Assigned">Assigned</MenuItem>
// //                             </Select>
// //                         </FormControl>
// //                         <FormControl size="small" sx={{ minWidth: 200 }}>
// //                             <InputLabel>Markets</InputLabel>
// //                             <Select
// //                                 label="Priority"
// //                             >
// //                                 {[
// //                                     "ARIZONA",
// //                                     "BAY AREA",
// //                                     "COLORADO",
// //                                     "DALLAS",
// //                                     "EL PASO",
// //                                     "FLORIDA",
// //                                     "HOUSTON",
// //                                     "LOS ANGELES",
// //                                     "MEMPHIS",
// //                                     "NASHVILLE",
// //                                     "NORTH CAROLINA",
// //                                     "OXNARD",
// //                                     "PALMDALE",
// //                                     "SACRAMENTO",
// //                                     "SAN DIEGO",
// //                                     "SAN FRANCISCO",
// //                                     "SAN JOSE",
// //                                     "SOLANO COUNTY",
// //                                 ].map((marketName, index) => (
// //                                     <MenuItem key={index} value={marketName}>{marketName}</MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
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
// //                         <TableHead >
// //                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
// //                                 <TableCell sx={{ color: 'white' }} padding="checkbox">
// //                                     <Checkbox
// //                                         sx={{
// //                                             color: '#fff',
// //                                             '&.Mui-checked': {
// //                                                 color: '#fff',
// //                                             },
// //                                         }}
// //                                         checked={selectedRows.length === tickets.length && tickets.length > 0}
// //                                         indeterminate={selectedRows.length > 0 && selectedRows.length < tickets.length}
// //                                         onChange={handleSelectAll}
// //                                     />
// //                                 </TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Type</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Descripition</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {loading ? <TableRow><TableCell className='text-center' colSpan={8} height={200}> <CircularProgress /></TableCell></TableRow> : tickets.map((ticket) => (
// //                                 <TableRow key={ticket.id} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer' }} onClick={() => handleReviewTicket(ticket._id)}>
// //                                     <TableCell padding="checkbox">
// //                                         <Checkbox
// //                                             checked={selectedRows.includes(ticket._id)}
// //                                             onChange={() => handleRowSelect(ticket._id)}
// //                                         />
// //                                     </TableCell>
// //                                     <TableCell>{ticket.ticketId}</TableCell>
// //                                     <TableCell>
// //                                         {ticket.priority === "Low" ? (
// //                                             <span>Low</span>
// //                                         ) : ticket.priority === "Medium" ? (
// //                                             <span>Medium</span>
// //                                         ) : (
// //                                             <span>High</span>
// //                                         )}
// //                                     </TableCell>
// //                                     <TableCell>{ticket.name}</TableCell>
// //                                     <TableCell>
// //                                         {ticket.status === "open" ? (
// //                                             <span>Open</span>
// //                                         ) : ticket.status === "closed" ? (
// //                                             <span>Closed</span>
// //                                         ) : ticket.status === "pending" ? (
// //                                             <span>Paused</span>
// //                                         ) : ticket.status === "re-open" ? (
// //                                             <span>Re-open</span>
// //                                         ) : (
// //                                             <span>Assigned</span>
// //                                         )}
// //                                     </TableCell>
// //                                     {/* <TableCell>{ticket.dueBy}</TableCell> */}
// //                                     <TableCell>{ticket.category}</TableCell>
// //                                     <TableCell>{ticket.ticketDescription}</TableCell>
// //                                     <TableCell>{ticket.assignerName || "N/A"}</TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             </Box>
// //         </div>
// //     );
// // }

// // export default ManagerTicket;

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField,
//     InputAdornment, IconButton, CircularProgress
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ManagerCreateTickets from './ManagerCreateTickets';
// import { useNavigate } from 'react-router-dom';
// import cookie from 'js-cookie';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import { getalltickets } from '../Services/tickets.services';

// const marketsList = [
//     "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON",
//     "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE",
//     "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
// ];

// function ManagerTicket() {
//     const { department, subDepartment } = decodeToken();
//     const id = cookie.get('id');
//     const navigate = useNavigate();

//     const [allTickets, setAllTickets] = useState([]);
//     const [filteredTickets, setFilteredTickets] = useState([]);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [activeFilter, setActiveFilter] = useState("Total");
//     const [priority, setPriority] = useState("");
//     const [status, setStatus] = useState("");
//     const [market, setMarket] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(false);

//     const fetchTickets = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await getalltickets();
//             const filtered = response?.data?.data?.filter(ticket =>
//                 (ticket.department === department && ticket.subDepartment === subDepartment) ||
//                 ticket.managerID === id || ticket.userId === id || (ticket.assignerId === id && ticket.approved === true)
//             );
//             setAllTickets(filtered || []);
//         } catch (error) {
//             console.error("Error fetching tickets:", error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [department, subDepartment, id]);

//     useEffect(() => {
//         fetchTickets();
//     }, [fetchTickets]);

//     useEffect(() => {
//         filterTickets();
//     }, [allTickets, activeFilter, priority, status, market, searchTerm]);

//     const filterTickets = () => {
//         let temp = [...allTickets];

//         if (activeFilter === "Closed") {
//             temp = temp.filter(t => t.status === "closed");
//         } else if (activeFilter === "Complete") {
//             temp = temp.filter(t => t.status === "completed");
//         } else if (activeFilter === "Pending") {
//             temp = temp.filter(t => t.status === "pending");
//         }

//         if (priority) {
//             temp = temp.filter(t => t.priority === priority);
//         }

//         if (status) {
//             temp = temp.filter(t => t.status === status.toLowerCase());
//         }

//         if (market) {
//             temp = temp.filter(t => t.market === market);
//         }

//         if (searchTerm.trim()) {
//             const lowerSearch = searchTerm.toLowerCase();
//             temp = temp.filter(t =>
//                 t.ticketId?.toLowerCase().includes(lowerSearch) ||
//                 t.name?.toLowerCase().includes(lowerSearch) ||
//                 t.ticketDescription?.toLowerCase().includes(lowerSearch)
//             );
//         }

//         setFilteredTickets(temp);
//     };

//     const handleSelectAll = () => {
//         setSelectedRows(selectedRows.length === filteredTickets.length ? [] : filteredTickets.map(t => t._id));
//     };

//     const handleRowSelect = (ticketId) => {
//         setSelectedRows(prev =>
//             prev.includes(ticketId) ? prev.filter(id => id !== ticketId) : [...prev, ticketId]
//         );
//     };

//     const handleReviewTicket = (id) => {
//         navigate(`/manager-review-ticket/${id}`);
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
//                     <div className="d-flex align-items-center" style={{ gap: "6px" }}>
//                         {["Total", "Complete", "Close", "Pending"].map(label => (
//                             <Button
//                                 key={label}
//                                 variant={activeFilter === label ? "contained" : "outlined"}
//                                 onClick={() => setActiveFilter(label)}
//                             >
//                                 {label}
//                             </Button>
//                         ))}
//                     </div>
//                     <ManagerCreateTickets fetchTickets={fetchTickets} />
//                 </div>
//             </div>

//             <div className="row my-4">
//                 <div className="col-md-12 d-flex flex-wrap gap-3">
//                     <FormControl size="small" sx={{ minWidth: 120 }}>
//                         <InputLabel>Priority</InputLabel>
//                         <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
//                             <MenuItem value="">All</MenuItem>
//                             <MenuItem value="Low">Low</MenuItem>
//                             <MenuItem value="Medium">Medium</MenuItem>
//                             <MenuItem value="High">High</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <FormControl size="small" sx={{ minWidth: 150 }}>
//                         <InputLabel>Status</InputLabel>
//                         <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
//                             <MenuItem value="">All</MenuItem>
//                             <MenuItem value="open">Open</MenuItem>
//                             <MenuItem value="close">Closed</MenuItem>
//                             <MenuItem value="pending">Paused</MenuItem>
//                             <MenuItem value="assigned">Assigned</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <FormControl size="small" sx={{ minWidth: 180 }}>
//                         <InputLabel>Markets</InputLabel>
//                         <Select value={market} label="Markets" onChange={(e) => setMarket(e.target.value)}>
//                             <MenuItem value="">All</MenuItem>
//                             {marketsList.map((m, idx) => (
//                                 <MenuItem key={idx} value={m}>{m}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <TextField
//                         size="small"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         sx={{ width: 300 }}
//                         InputProps={{
//                             endAdornment: (
//                                 <InputAdornment position="end">
//                                     <IconButton>
//                                         <SearchIcon />
//                                     </IconButton>
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </div>
//             </div>

//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }} padding="checkbox">
//                                     <Checkbox
//                                         sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }}
//                                         checked={selectedRows.length === filteredTickets.length && filteredTickets.length > 0}
//                                         indeterminate={selectedRows.length > 0 && selectedRows.length < filteredTickets.length}
//                                         onChange={handleSelectAll}
//                                     />
//                                 </TableCell>
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
//                                     <TableCell colSpan={8} align="center" height={200}>
//                                         <CircularProgress />
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
//                                         <TableCell padding="checkbox">
//                                             <Checkbox
//                                                 checked={selectedRows.includes(ticket._id)}
//                                                 onChange={() => handleRowSelect(ticket._id)}
//                                             />
//                                         </TableCell>
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

// export default ManagerTicket;

import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Select, MenuItem, FormControl, InputLabel, TextField,
    InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ManagerCreateTickets from './ManagerCreateTickets';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import { decodeToken } from '../Utils/decodedToken.utils';
import { getalltickets } from '../Services/tickets.services';

const marketsList = [
    "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON",
    "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE",
    "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
];

function ManagerTicket() {
    const { department, subDepartment } = decodeToken();
    const id = cookie.get('id');
    // console.log(id)
    const navigate = useNavigate();

    const [allTickets, setAllTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeFilter, setActiveFilter] = useState("Total");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [market, setMarket] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getalltickets();
            // console.log(department)
            // console.log(subDepartment)
            const filtered = response?.data?.data?.filter(ticket =>
                (ticket.department == department && ticket.subDepartment == subDepartment) ||
                ticket.managerID == id || ticket.userId == id || ticket.previousOwnerId === id || ticket.currentOwnerId === id || (ticket.assignerId == id && ticket.approved == true)
            );
            setLoading(false);
            setAllTickets(filtered || []);
            // console.log(filtered || []);
            // console.log(filtered || []);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching tickets:", error.message);
        }
        //  finally {
        //     setLoading(false);
        // }
    }, [department, subDepartment, id]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let filtered = [...allTickets];
            // Apply status button filter
            switch (activeFilter) {
                case "Closed":
                    filtered = filtered.filter(t => t.status === "closed");
                    break;
                case "Complete":
                    filtered = filtered.filter(t => t.status === "completed");
                    break;
                case "Pending":
                    filtered = filtered.filter(t => t.status === "pending");
                    break;
                default:
                    break;
            }

            if (priority) filtered = filtered.filter(t => t.priority === priority);
            if (status) filtered = filtered.filter(t => t.status === status.toLowerCase());
            if (market) filtered = filtered.filter(t => t.market === market);
            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(t =>
                    t.ticketId?.toLowerCase().includes(term) ||
                    t.name?.toLowerCase().includes(term) ||
                    t.ticketDescription?.toLowerCase().includes(term)
                );
            }
            // 👇 Add this to sort descending by createdAt (latest first)
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFilteredTickets(filtered);
        }, 300);

        return () => clearTimeout(timeout);
    }, [allTickets, activeFilter, priority, status, market, searchTerm]);

    const handleReviewTicket = (id) => {
        navigate(`/manager-review-ticket/${id}`);
    };
    function getTicketAge(createdAt) {
        const now = new Date();
        const created = new Date(createdAt);
        const diffMs = now - created; // difference in milliseconds

        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

        if (diffDays > 0) return `${diffDays}d ${diffHours}h ago`;
        if (diffHours > 0) return `${diffHours}h ${diffMinutes}m ago`;
        return `${diffMinutes}m ago`;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                        {["Total", "Complete", "Closed", "Pending"].map(label => (
                            <Button
                                key={label}
                                variant={activeFilter === label ? "contained" : "outlined"}
                                onClick={() => setActiveFilter(label)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <ManagerCreateTickets fetchTickets={fetchTickets} />
                </div>
            </div>

            <div className="row my-4">
                <div className="col-md-12 d-flex flex-wrap gap-3">
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
                            <MenuItem value="closed">Closed</MenuItem>
                            <MenuItem value="pending">Paused</MenuItem>
                            <MenuItem value="assigned">Assigned</MenuItem>
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

                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: 300 }}
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
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setActiveFilter("Total");
                            setPriority("");
                            setStatus("");
                            setMarket("");
                            setSearchTerm("");
                        }}
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>

            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                                <TableCell sx={{ color: 'white' }}>Market</TableCell>
                                <TableCell sx={{ color: 'white' }}>Store</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                                <TableCell sx={{ color: 'white' }}>Aage</TableCell>
                                <TableCell sx={{ color: 'white' }}>Assigned To</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" height={200}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredTickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" height={100}>
                                        No tickets found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTickets.map(ticket => {
                                    // console.log(ticket.id)
                                    return (
                                        <TableRow
                                            key={ticket._id}
                                            hover
                                            onClick={() => handleReviewTicket(ticket.id)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell>{ticket.ticketId}</TableCell>
                                            <TableCell>{ticket.name}</TableCell>
                                            <TableCell>{ticket.priority}</TableCell>
                                            <TableCell>{ticket.category}</TableCell>
                                            <TableCell>{ticket.market}</TableCell>
                                            <TableCell>{ticket.store}</TableCell>
                                            <TableCell>{ticket.status}</TableCell>
                                            <TableCell>{ticket.ticketDescription}</TableCell>
                                            <TableCell>{getTicketAge(ticket.createdAt)}</TableCell>
                                            <TableCell>{ticket.assignerName || "-"}</TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default ManagerTicket;
