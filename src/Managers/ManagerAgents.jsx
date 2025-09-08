// import React, { useCallback, useEffect, useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import { getAllUsers } from '../Services/auth.services';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import cookie from 'js-cookie';
// import { getalltickets } from '../Services/tickets.services';

// function ManagerAgents() {
//     const [tickets, setTickets] = useState([]);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const decodedTickets = decodeToken();
//     const { department } = decodedTickets;
//     const id = cookie.get('id');
//     const fetchAllAgents = useCallback(async () => {
//         try {
//             const response = await getAllUsers();
//             const filteration = response.data.data.filter((data) => data._id !== id && data.department === department)
//             setTickets(filteration)
//         } catch (error) {
//             console.log("ERROR", error.message);
//         }
//     }, [])
//     useEffect(() => {
//         fetchAllAgents()
//     }, [fetchAllAgents])
//     const getPendingTickets = async (id) => {
//         try {
//             const resposne = await getalltickets();
//             const filteration = resposne.data.data.filter((data) => data.assignerId === id && data.agentstatus !== 'complete')
//             return filteration.length;
//         } catch (error) {
//             console.log("ERROR", error.message);
//         }
//     }

//     //    getPendingTickets()
//     return (
//         <div className="container">
//             <BasicBreadcrumbs name={"Agents"} />
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
//                     </div>
//                 </div>
//             </div>
//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead >
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }}>Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Email</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Phone</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Department</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Pending Tickets</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Complete Tickets</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tickets.map((ticket) => (
//                                 <TableRow key={ticket.id} hover role="checkbox" tabIndex={-1}>
//                                     <TableCell>
//                                         {ticket.name}
//                                     </TableCell>
//                                     <TableCell>{ticket.email}</TableCell>
//                                     <TableCell>
//                                         {ticket.phone}
//                                     </TableCell>
//                                     <TableCell>{ticket.department}</TableCell>
//                                     <TableCell>{getPendingTickets(ticket.assignerId)}</TableCell>
//                                     <TableCell>{ticket.isActive === true ? "Active" : "Un-active"}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default ManagerAgents


// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//     TextField, InputAdornment, IconButton
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import { getAllUsers } from '../Services/auth.services';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import cookie from 'js-cookie';
// import { getalltickets } from '../Services/tickets.services';

// function ManagerAgents() {
//     const [tickets, setTickets] = useState([]);
//     const [pendingCounts, setPendingCounts] = useState({});
//     const [searchTerm, setSearchTerm] = useState("");

//     const decodedTickets = decodeToken();
//     const { department } = decodedTickets;
//     const id = cookie.get('id');

//     const fetchAllAgents = useCallback(async () => {
//         try {
//             const response = await getAllUsers();
//             const filteredAgents = response.data.data.filter(
//                 (data) => data._id !== id && data.department === department
//             );
//             setTickets(filteredAgents);

//             // Fetch all tickets once and map pending counts
//             const allTickets = await getalltickets();
//             const ticketData = allTickets.data.data;

//             const counts = {};
//             filteredAgents.forEach((agent) => {
//                 const pending = ticketData.filter(
//                     (ticket) =>
//                         ticket.assignerId === agent._id &&
//                         ticket.agentstatus !== 'complete'
//                 );
//                 counts[agent._id] = pending.length;
//             });

//             setPendingCounts(counts);
//         } catch (error) {
//             console.log("ERROR", error.message);
//         }
//     }, [department, id]);

//     useEffect(() => {
//         fetchAllAgents();
//     }, [fetchAllAgents]);

//     return (
//         <div className="container">
//             <BasicBreadcrumbs name={"Agents"} />
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
//                     </div>
//                 </div>
//             </div>

//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }}>Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Email</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Phone</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Department</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Pending Tickets</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tickets
//                                 .filter((ticket) =>
//                                     ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                                     ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
//                                 )
//                                 .map((ticket) => (
//                                     <TableRow key={ticket._id} hover>
//                                         <TableCell>{ticket.name}</TableCell>
//                                         <TableCell>{ticket.email}</TableCell>
//                                         <TableCell>{ticket.phone}</TableCell>
//                                         <TableCell>{ticket.department}</TableCell>
//                                         <TableCell>{pendingCounts[ticket._id] ?? 'Loading...'}</TableCell>
//                                         <TableCell>{ticket.isActive ? "Active" : "Un-active"}</TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default ManagerAgents;



import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, InputAdornment, IconButton,
    CircularProgress,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getAllUser, getAllUsers } from '../Services/auth.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import cookie from 'js-cookie';
import { getalltickets } from '../Services/tickets.services';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";

function ManagerAgents() {
    const [tickets, setTickets] = useState([]);
    const [pendingCounts, setPendingCounts] = useState({});
    const [completedCounts, setCompletedCounts] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const decodedTickets = decodeToken();
    const { department } = decodedTickets;
    const id = cookie.get('id');
    const navigate = useNavigate()
    const fetchAllAgents = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllUser();
            const filteredAgents = response.data.data.filter(
                (data) => data.id !== id && data.department === department
            );
            setTickets(filteredAgents);
            console.log(filteredAgents);

            const allTickets = await getalltickets();
            const ticketData = allTickets.data.data;

            const countsPending = {};
            const countsCompleted = {};

            filteredAgents.forEach((agent) => {
                const pending = ticketData.filter(
                    (ticket) =>
                        ticket.assignerId == agent.id &&
                        ticket.agentstatus != 'complete'
                );

                const completed = ticketData.filter(
                    (ticket) =>
                        ticket.assignerId == agent.id &&
                        ticket.agentstatus == 'complete'
                );

                countsPending[agent.id] = pending.length;
                countsCompleted[agent.id] = completed.length;
            });

            setPendingCounts(countsPending);
            setCompletedCounts(countsCompleted);
        } catch (error) {
            setLoading(false)
            console.log("ERROR", error.message);
        } finally {
            setLoading(false)
        }
    }, [department, id]);

    useEffect(() => {
        fetchAllAgents();
    }, [fetchAllAgents]);

    return (
        <div className="container">
            <BasicBreadcrumbs name={"Agents"} />
            <div className="row my-4">
                <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
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
                    </div>
                </div>
            </div>

            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                                <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                                <TableCell sx={{ color: 'white' }}>Department</TableCell>
                                <TableCell sx={{ color: 'white' }}>Pending Tickets</TableCell>
                                <TableCell sx={{ color: 'white' }}>Completed Tickets</TableCell>
                                <TableCell sx={{ color: 'white' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? <TableRow > <TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow> : tickets.length === 0 ? <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <span style={{ fontWeight: 500, color: '#777' }}>No Tickets Found</span>
                                </TableCell>
                            </TableRow> : tickets
                                .filter((ticket) =>
                                    ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((ticket, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{ticket.name}</TableCell>
                                        <TableCell>{ticket.email}</TableCell>
                                        <TableCell>{ticket.phone}</TableCell>
                                        <TableCell>{ticket.department}</TableCell>
                                        <TableCell>{pendingCounts[ticket.id] ?? 'Loading...'}</TableCell>
                                        <TableCell>{completedCounts[ticket.id] ?? 'Loading...'}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => navigate(`/manager-review-agents/${ticket.id}`)}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default ManagerAgents;
