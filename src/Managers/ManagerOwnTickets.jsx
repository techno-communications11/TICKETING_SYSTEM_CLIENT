import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getalltickets } from '../Services/tickets.services';
import cookies from 'js-cookie';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { useNavigate } from 'react-router-dom';
function ManagerOwnTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const id = cookies.get('id')
    const fetchAllTickets = useCallback(async () => {
        setLoading(true);
        try {
            const resposne = await getalltickets();
            const filteration = resposne.data.data.filter((data) => data.assignerId === id)
            setTickets(filteration)
        } catch (error) {
            console.log("ERROR", error.message);
        } finally {
            setLoading(false);
        }
    }, [id])
    useEffect(() => {
        fetchAllTickets()
    }, [fetchAllTickets])
    const [selectedRows, setSelectedRows] = useState([]);
    const [activeFilter, setActiveFilter] = useState("Total");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
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
    return (
        <div className="container">
            <BasicBreadcrumbs name={"Own Tickets"} />
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center py-3 bg-white">
                    <div className="d-flex align-items-center" style={{ gap: "6px 6px" }}>
                        <Button
                            variant={activeFilter === "Total" ? "contained" : "outlined"}
                            onClick={() => setActiveFilter("Total")}
                        >
                            Total
                        </Button>
                        <Button
                            variant={activeFilter === "Complete" ? "contained" : "outlined"}
                            onClick={() => setActiveFilter("Complete")}
                        >
                            Complete
                        </Button>
                        <Button
                            variant={activeFilter === "Closed" ? "contained" : "outlined"}
                            onClick={() => setActiveFilter("Closed")}
                        >
                            Closed
                        </Button>
                        <Button
                            variant={activeFilter === "Pending" ? "contained" : "outlined"}
                            onClick={() => setActiveFilter("Pending")}
                        >
                            Pending
                        </Button>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-md-12">
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
                        <TableHead >
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
                            {loading ? <TableRow > <TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow> : tickets.length === 0 ? <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <span style={{ fontWeight: 500, color: '#777' }}>No Tickets Found</span>
                                </TableCell>
                            </TableRow> : tickets.map((ticket) => (
                                <TableRow key={ticket.id} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/manager-review-ticket/${ticket.id}`)}>
                                    <TableCell>{ticket.ticketId}</TableCell>
                                    <TableCell>
                                        {ticket.priority === "Low" ? (
                                            <span>Low</span>
                                        ) : ticket.priority === "Medium" ? (
                                            <span>Medium</span>
                                        ) : (
                                            <span>High</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{ticket.name}</TableCell>
                                    <TableCell>
                                        {ticket.status === "open" ? (
                                            <span>Open</span>
                                        ) : ticket.status === "closed" ? (
                                            <span>Closed</span>
                                        ) : ticket.status === "pending" ? (
                                            <span>Paused</span>
                                        ) : ticket.status === "re-open" ? (
                                            <span>Re-open</span>
                                        ) : (
                                            <span>Assigned</span>
                                        )}
                                    </TableCell>
                                    {/* <TableCell>{ticket.dueBy}</TableCell> */}
                                    <TableCell>{ticket.category}</TableCell>
                                    <TableCell>{ticket.ticketDescription}</TableCell>
                                    <TableCell>{ticket.assignerName || "N/A"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default ManagerOwnTickets