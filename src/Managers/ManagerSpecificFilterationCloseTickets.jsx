import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getalltickets } from '../Services/tickets.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../Context/context';

function ManagerSpecificFilterationCloseTickets() {
    const { filterationsData } = useGlobalState();

    const decodedTickets = decodeToken();
    const { department, subDepartment } = decodedTickets;
    const id = cookie.get('id');

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const fetchAllTickets = useCallback(async () => {
        setLoading(true);
        try {
            let filtered = filterationsData?.filter(
                (data) =>
                    (
                        (data.department === department && data.subDepartment === subDepartment && data.senior_managers === 'Admin Manager') ||
                        data.userId === id || data.senior_managers === 'Admin Manager' ||
                        (data.managerID === id && data.assignerId === id && data.approved === true && data.senior_managers === 'Admin Manager')
                    ) &&
                    data.status === "close"
            );
            setTickets(filtered);
        } catch (error) {
            console.log("ERROR", error.message);
        } finally {
            setLoading(false);
        }
    }, [department, subDepartment, id]);

    useEffect(() => {
        fetchAllTickets();
    }, [fetchAllTickets]);

    const handleReviewTicket = (id) => {
        navigate(`/manager-review-ticket/${id}`);
    };

    const filteredTickets = tickets.filter((ticket) =>
        ticket.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.priority?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <BasicBreadcrumbs name={"Closed Tickets"} />
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
                                    <TableCell colSpan={8} align="center" height={200}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredTickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" height={100}>
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

export default ManagerSpecificFilterationCloseTickets