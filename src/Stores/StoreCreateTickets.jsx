import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoreCreateTickteBtnCompo from './StoreCreateTickteBtnCompo';

function StoreCreateTickets() {
    const tickets = [
        { id: "TID0934893", priority: "Low", clientName: "Dane John", status: "Open", dueBy: "22 Dec 2022", type: "Technical", solvedBy: "Shekhar Khan" },
        { id: "TID0934894", priority: "Medium", clientName: "John Doe", status: "Closed", dueBy: "23 Dec 2022", type: "Support", solvedBy: "Jane Smith" },
        { id: "TID0934895", priority: "High", clientName: "Alice Brown", status: "Assigned", dueBy: "24 Dec 2022", type: "Billing", solvedBy: "Mark Johnson" },
    ];
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
                    <div className="">
                        <StoreCreateTickteBtnCompo />
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-md-12">
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={priority}
                                label="Priority"
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                                <MenuItem value="Paused">Paused</MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Markets</InputLabel>
                            <Select
                                label="Priority"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
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
                    </div>
                </div>
            </div>
            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead >
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }} padding="checkbox">
                                    <Checkbox
                                        sx={{
                                            color: '#fff',
                                            '&.Mui-checked': {
                                                color: '#fff',
                                            },
                                        }}
                                        checked={selectedRows.length === tickets.length && tickets.length > 0}
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < tickets.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Problem</TableCell>
                                <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id} hover role="checkbox" tabIndex={-1}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedRows.includes(ticket.id)}
                                            onChange={() => handleRowSelect(ticket.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.clientName}</TableCell>
                                    <TableCell>{ticket.type}</TableCell>
                                    <TableCell>{ticket.priority}</TableCell>
                                    <TableCell>{ticket.status}</TableCell>
                                    <TableCell>{ticket.solvedBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default StoreCreateTickets