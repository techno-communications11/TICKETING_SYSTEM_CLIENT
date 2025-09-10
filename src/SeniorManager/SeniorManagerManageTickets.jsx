import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField,
    InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import ManagerCreateTickets from './ManagerCreateTickets';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import { decodeToken } from '../Utils/decodedToken.utils';
import { getalltickets } from '../Services/tickets.services';
import SeniorManagerCreateTickets from './SeniorManagerCreateTickets';
import { useSelector } from 'react-redux';
// import AdminManagerCreateTickets from './AdminManagerCreateTickets';

const marketsList = [
    "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON",
    "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE",
    "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
];

function SeniorManagerManageTickets() {
    const { department, subDepartment } = decodeToken();
    const id = cookie.get('id');
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
    const [currentUserDatas, setCurrentUserDatas] = useState([]);

    const { user } = useSelector((state) => state.currentUser);

    const fetchUser = useCallback(async () => {
        const currentDatauser = await user;
        setCurrentUserDatas(currentDatauser)
        console.log(currentDatauser?.managedDepartments)
    }, [user]);
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getalltickets();
            let filtered = response.data.data.filter(
                (data) => currentUserDatas.managedDepartments.includes(data.department) || data.userId === id || data.assignerId === id
            );
            setAllTickets(filtered || []);
        } catch (error) {
            console.error("Error fetching tickets:", error.message);
        } finally {
            setLoading(false);
        }
    }, [department, subDepartment,currentUserDatas.managedDepartments, id]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let filtered = [...allTickets];

            // Apply status button filter
            switch (activeFilter) {
                case "Closed":
                    filtered = filtered.filter(t => t.status === "close");
                    break;
                case "Complete":
                    filtered = filtered.filter(t => t.agentstatus === "complete");
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

            setFilteredTickets(filtered);
        }, 300);

        return () => clearTimeout(timeout);
    }, [allTickets, activeFilter, priority, status, market, searchTerm]);

    const handleSelectAll = () => {
        setSelectedRows(selectedRows.length === filteredTickets.length ? [] : filteredTickets.map(t => t._id));
    };

    const handleRowSelect = (ticketId) => {
        setSelectedRows(prev =>
            prev.includes(ticketId) ? prev.filter(id => id !== ticketId) : [...prev, ticketId]
        );
    };

    const handleReviewTicket = (id) => {
        navigate(`/senior-managers-reviews-tickets/${id}`);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                        {["Total", "Complete", "Close", "Pending"].map(label => (
                            <Button
                                key={label}
                                variant={activeFilter === label ? "contained" : "outlined"}
                                onClick={() => setActiveFilter(label)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    <SeniorManagerCreateTickets fetchTickets={fetchTickets} />
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
                            <MenuItem value="close">Closed</MenuItem>
                            <MenuItem value="pending">Paused</MenuItem>
                            <MenuItem value="re-open">Re-open</MenuItem>
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
                                <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                                <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                                <TableCell sx={{ color: 'white' }}>Description</TableCell>
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
                                filteredTickets.map(ticket => (
                                    <TableRow
                                        key={ticket._id}
                                        hover
                                        onClick={() => handleReviewTicket(ticket?._id)}
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

export default SeniorManagerManageTickets