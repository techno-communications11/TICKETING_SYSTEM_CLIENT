// import React, { useCallback, useEffect, useState } from 'react';
// import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import { getalltickets } from '../Services/tickets.services';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import cookies from 'js-cookie'

// function ManagerAssignTickets() {
//     const [tickets, setTickets] = useState([]);
//     const decodedTickets = decodeToken();
//     const { department, subDepartment } = decodedTickets;
//     const id = cookies.get('id')

//     const fetchAllTickets = useCallback(async () => {
//         try {
//             const resposne = await getalltickets();
//             const filteration = resposne.data.data.filter((data) => data.assignerId !== id && data.department === department)
//             console.log(filteration)
//             setTickets(filteration)
//         } catch (error) {
//             console.log("ERROR", error.message);
//         }
//     }, [])
//     useEffect(() => {
//         fetchAllTickets()
//     }, [fetchAllTickets])
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [activeFilter, setActiveFilter] = useState("Total");
//     const [priority, setPriority] = useState("");
//     const [status, setStatus] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const handleRowSelect = (id) => {
//         if (selectedRows.includes(id)) {
//             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
//         } else {
//             setSelectedRows([...selectedRows, id]);
//         }
//     };
//     const handleSelectAll = () => {
//         if (selectedRows.length === tickets.length) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(tickets.map(ticket => ticket.id));
//         }
//     };
//     return (
//         <div className="container">
//             <BasicBreadcrumbs name={"Assigned Tickets"} />
//             <div className="row">
//                 <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
//                     <div className="d-flex align-items-center" style={{ gap: "6px 6px" }}>
//                         <Button
//                             variant={activeFilter === "Total" ? "contained" : "outlined"}
//                             onClick={() => setActiveFilter("Total")}
//                         >
//                             Total
//                         </Button>
//                         <Button
//                             variant={activeFilter === "Complete" ? "contained" : "outlined"}
//                             onClick={() => setActiveFilter("Complete")}
//                         >
//                             Complete
//                         </Button>
//                         <Button
//                             variant={activeFilter === "Closed" ? "contained" : "outlined"}
//                             onClick={() => setActiveFilter("Closed")}
//                         >
//                             Closed
//                         </Button>
//                         <Button
//                             variant={activeFilter === "Pending" ? "contained" : "outlined"}
//                             onClick={() => setActiveFilter("Pending")}
//                         >
//                             Pending
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <div className="row my-4">
//                 <div className="col-md-12">
//                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
//                         <FormControl size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Priority</InputLabel>
//                             <Select
//                                 value={priority}
//                                 label="Priority"
//                                 onChange={(e) => setPriority(e.target.value)}
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl size="small" sx={{ minWidth: 150 }}>
//                             <InputLabel>Status</InputLabel>
//                             <Select
//                                 value={status}
//                                 label="Status"
//                                 onChange={(e) => setStatus(e.target.value)}
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Open">Open</MenuItem>
//                                 <MenuItem value="Closed">Closed</MenuItem>
//                                 <MenuItem value="Paused">Paused</MenuItem>
//                                 <MenuItem value="Assigned">Assigned</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl size="small" sx={{ minWidth: 200 }}>
//                             <InputLabel>Markets</InputLabel>
//                             <Select
//                                 label="Priority"
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl>
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
//                     </div>
//                 </div>
//             </div>
//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead >
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }} padding="checkbox">
//                                     <Checkbox
//                                         sx={{
//                                             color: '#fff',
//                                             '&.Mui-checked': {
//                                                 color: '#fff',
//                                             },
//                                         }}
//                                         checked={selectedRows.length === tickets.length && tickets.length > 0}
//                                         indeterminate={selectedRows.length > 0 && selectedRows.length < tickets.length}
//                                         onChange={handleSelectAll}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Client Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Due By</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Type</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tickets.map((ticket) => (
//                                 <TableRow key={ticket.id} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer' }} onClick={() => handleReviewTicket(ticket._id)}>
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             checked={selectedRows.includes(ticket._id)}
//                                             onChange={() => handleRowSelect(ticket._id)}
//                                         />
//                                     </TableCell>
//                                     <TableCell>{ticket.ticketId}</TableCell>
//                                     <TableCell>
//                                         {ticket.priority === "Low" ? (
//                                             <span>Low</span>
//                                         ) : ticket.priority === "Medium" ? (
//                                             <span>Medium</span>
//                                         ) : (
//                                             <span>High</span>
//                                         )}
//                                     </TableCell>
//                                     <TableCell>{ticket.name}</TableCell>
//                                     <TableCell>
//                                         {ticket.status === "open" ? (
//                                             <span>Open</span>
//                                         ) : ticket.status === "closed" ? (
//                                             <span>Closed</span>
//                                         ) : ticket.status === "pending" ? (
//                                             <span>Paused</span>
//                                         ) : ticket.status === "re-open" ? (
//                                             <span>Re-open</span>
//                                         ) : (
//                                             <span>Assigned</span>
//                                         )}
//                                     </TableCell>
//                                     {/* <TableCell>{ticket.dueBy}</TableCell> */}
//                                     <TableCell>{ticket.category}</TableCell>
//                                     <TableCell>{ticket.ticketDescription}</TableCell>
//                                     <TableCell>{ticket.assignerName || "N/A"}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default ManagerAssignTickets


// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     Box, Button, Table, TableBody, TableCell, TableContainer, TableHead,
//     TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel,
//     TextField, InputAdornment, IconButton, CircularProgress
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import { getalltickets } from '../Services/tickets.services';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

// function ManagerAssignTickets() {
//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const decodedTickets = decodeToken();
//     const { department } = decodedTickets;
//     const navigate = useNavigate()
//     const id = cookies.get('id');

//     const fetchAllTickets = useCallback(async () => {
//         setLoading(true);
//         try {
//             const resposne = await getalltickets();
//             const filteration = resposne.data.data.filter(
//                 (data) => data.assignerId !== id && data.department === department
//             );
//             setTickets(filteration);
//         } catch (error) {
//             console.log("ERROR", error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [id, department]);

//     useEffect(() => {
//         fetchAllTickets();
//     }, [fetchAllTickets]);

//     const [selectedRows, setSelectedRows] = useState([]);
//     const [activeFilter, setActiveFilter] = useState("Total");
//     const [priority, setPriority] = useState("");
//     const [status, setStatus] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleRowSelect = (id) => {
//         if (selectedRows.includes(id)) {
//             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
//         } else {
//             setSelectedRows([...selectedRows, id]);
//         }
//     };

//     const handleSelectAll = () => {
//         if (selectedRows.length === tickets.length) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(tickets.map(ticket => ticket._id));
//         }
//     };

//     const handleReviewTicket = (ticketId) => {
//         // Implement navigation or popup
//         navigate(`/manager-review-ticket/${ticketId}`);
//         console.log("View ticket", ticketId);
//     };

//     return (
//         <div className="container">
//             <BasicBreadcrumbs name={"Assigned Tickets"} />

//             {/* Filters and Header Buttons */}
//             <div className="row">
//                 <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
//                     <div className="d-flex align-items-center" style={{ gap: "6px" }}>
//                         {["Total", "Complete", "Closed", "Pending"].map(filter => (
//                             <Button
//                                 key={filter}
//                                 variant={activeFilter === filter ? "contained" : "outlined"}
//                                 onClick={() => setActiveFilter(filter)}
//                             >
//                                 {filter}
//                             </Button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Dropdowns and Search */}
//             <div className="row my-4">
//                 <div className="col-md-12">
//                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
//                         {/* <FormControl size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Priority</InputLabel>
//                             <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl> */}
//                         {/* <FormControl size="small" sx={{ minWidth: 150 }}>
//                             <InputLabel>Status</InputLabel>
//                             <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Open">Open</MenuItem>
//                                 <MenuItem value="Closed">Closed</MenuItem>
//                                 <MenuItem value="Paused">Paused</MenuItem>
//                                 <MenuItem value="Assigned">Assigned</MenuItem>
//                             </Select>
//                         </FormControl> */}
//                         {/* <FormControl size="small" sx={{ minWidth: 200 }}>
//                             <InputLabel>Markets</InputLabel>
//                             <Select label="Markets">
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl> */}
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
//                     </div>
//                 </div>
//             </div>

//             {/* Table with Loader and No Data Message */}
//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Client Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Due By</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Type</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={8} align="center">
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : tickets.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={8} align="center">
//                                         <span style={{ fontWeight: 500, color: '#777' }}>No Tickets Found</span>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 tickets.map((ticket) => (
//                                     <TableRow key={ticket._id} hover sx={{ cursor: 'pointer' }} onClick={() => handleReviewTicket(ticket._id)}>
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

// export default ManagerAssignTickets;


import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Select, MenuItem, FormControl, InputLabel,
    TextField, InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getalltickets } from '../Services/tickets.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ManagerAssignTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeFilter, setActiveFilter] = useState("Total");
    const [priority, setPriority] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const decodedTickets = decodeToken();
    const { department } = decodedTickets;
    const navigate = useNavigate();
    const id = cookies.get('id');

    const fetchAllTickets = useCallback(async () => {
        setLoading(true);
        try {
            const resposne = await getalltickets();
            const filteration = resposne.data.data.filter(
                (data) => data.assignerId !== id && data.department === department
            );
            setTickets(filteration);
        } catch (error) {
            console.log("ERROR", error.message);
        } finally {
            setLoading(false);
        }
    }, [id, department]);

    useEffect(() => {
        fetchAllTickets();
    }, [fetchAllTickets]);

    const handleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === tickets.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tickets.map(ticket => ticket.id));
        }
    };

    const handleReviewTicket = (ticketId) => {
        navigate(`/manager-review-ticket/${ticketId}`);
    };

    // ✅ Filtering logic
    const filteredTickets = tickets.filter(ticket => {
        // Status filter (Total = no filter)
        if (activeFilter !== "Total" && ticket.status?.toLowerCase() !== activeFilter.toLowerCase()) {
            return false;
        }

        // Priority filter
        if (priority && ticket.priority !== priority) {
            return false;
        }

        // Search filter on name, ticketId, or status
        const search = searchTerm.toLowerCase();
        if (
            search &&
            !(
                ticket.name?.toLowerCase().includes(search) ||
                ticket.ticketId?.toLowerCase().includes(search) ||
                ticket.status?.toLowerCase().includes(search)
            )
        ) {
            return false;
        }

        return true;
    });

    return (
        <div className="container-fluid">
            <BasicBreadcrumbs name={"Assigned Tickets"} />

            {/* Filters and Header Buttons */}
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                        {["Total", "Complete", "Close", "Pending"].map(filter => (
                            <Button
                                key={filter}
                                variant={activeFilter === filter ? "contained" : "outlined"}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setSearchTerm('');
                                setPriority('');
                                setActiveFilter('Total');
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filter Dropdowns and Search */}
            <div className="row my-4">
                <div className="col-md-12">
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            placeholder="Search by name, ticket ID or status"
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
                    </div>
                </div>
            </div>

            {/* Table with Loader and No Data Message */}
            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                                <TableCell sx={{ color: 'white' }}>Client Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Due By</TableCell>
                                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                                <TableCell sx={{ color: 'white' }}>Assigned To</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredTickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <span style={{ fontWeight: 500, color: '#777' }}>No Tickets Found</span>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTickets.map((ticket) => (
                                    <TableRow
                                        key={ticket._id}
                                        hover
                                        sx={{ cursor: 'pointer' }}
                                       onClick={() => navigate(`/manager-review-ticket/${ticket.id}`)}
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

export default ManagerAssignTickets;
