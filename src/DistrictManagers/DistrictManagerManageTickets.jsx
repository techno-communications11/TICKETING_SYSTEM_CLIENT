
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField,
    InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import { decodeToken } from '../Utils/decodedToken.utils';
import { getalltickets } from '../Services/tickets.services';
import { useSelector } from 'react-redux';
import { getAllStores } from '../Services/stores.services';
import DistrictManagerCreateTickets from './DistrictManagerCreateTickets';

function DistrictManagerManageTickets() {
    const { department, subDepartment } = decodeToken();
    const id = cookie.get('id');
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.currentUser);

    const [allTickets, setAllTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeFilter, setActiveFilter] = useState("Total");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [market, setMarket] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentUserData, setCurrentUserData] = useState([])
    const [stores, setStores] = useState([])

    const fetchUser = useCallback(async () => {
        const currentDatauser = await user;
        setCurrentUserData(currentDatauser?.markets);
    }, [user]);

    const fecthAllStores = useCallback(async () => {
        try {
            const response = await getAllStores();
            const filterationStores = response.filter((data) => currentUserData.includes(data.market))
            setStores(filterationStores)
        } catch (error) {
            console.log("error", error.message);
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])
    useEffect(() => {
        fecthAllStores()
    }, [fecthAllStores])
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getalltickets();
            const filtered = response?.data?.data?.filter(ticket =>
                (ticket.department === department && ticket.subDepartment === subDepartment) ||
                ticket.managerID === id || ticket.userId === id || (ticket.assignerId === id && ticket.approved === true)
            );
            setAllTickets(filtered || []);
        } catch (error) {
            console.error("Error fetching tickets:", error.message);
        } finally {
            setLoading(false);
        }
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
            setFilteredTickets(filtered);
        }, 300);

        return () => clearTimeout(timeout);
    }, [allTickets, activeFilter, priority, status, market, searchTerm]);

    const handleReviewTicket = (id) => {
        navigate(`/district-manager-review-ticket/${id}`);
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
                    <DistrictManagerCreateTickets fetchTickets={fetchTickets} />
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

                    <TextField
                        sx={{ width: "180px" }}
                        size='small'
                        defaultValue={currentUserData}
                        InputProps={{ readOnly: true }}
                        disabled
                        variant="outlined"
                    />
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Select Stores</InputLabel>
                        <Select value={market} label="Markets" onChange={(e) => setMarket(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            {stores.map((m, idx) => (
                                <MenuItem key={idx} value={m.store_name}>{m.store_name}</MenuItem>
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
                                <TableCell sx={{ color: 'white' }}>Solved by</TableCell>
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
                                        key={ticket.id}
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default DistrictManagerManageTickets