import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Button, Box, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, TablePagination } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import moment from 'moment';
import { getalltickets } from '../Services/tickets.services';
function SuperAdminTicketWiseInsigh() {
    const navigate = useNavigate();
    const [allTickets, setAllTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("Total");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        const response = await getalltickets();
        const filteration = response.data.data;
        setAllTickets(filteration);
        applyFilter(filter, filteration);
        setLoading(false);
    }, []);
    useEffect(() => {
        fetchTickets();
    }, []);
    const applyFilter = (type, tickets = allTickets) => {
        setFilter(type);
        switch (type) {
            case "Total":
                setFilteredTickets(tickets);
                break;
            case "Open":
                setFilteredTickets(tickets.filter(ticket => ticket.status === "open"));
                break;
            case "Complete":
                setFilteredTickets(tickets.filter(ticket => ticket.agentstatus === "complete"));
                break;
            case "Long-pending":
                setFilteredTickets(tickets.filter(ticket => ticket.agentstatus !== "complete" && moment(ticket.createdAt).isBefore(moment().subtract(7, "days"))));
                break;
            case "Pending":
                setFilteredTickets(tickets.filter(ticket => ticket.status === "pending" || (ticket.status === "open" && moment(ticket.createdAt).isBefore(moment().subtract(7, "days")))));
                break;
            case "Closed":
                setFilteredTickets(tickets.filter(ticket => ticket.status === "close"));
                break;
            case "Re-open":
                setFilteredTickets(tickets.filter(ticket => ticket.status === "re-open"));
                break;
            default:
                setFilteredTickets(tickets);
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedTickets = filteredTickets
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const tabOptions = ["Total", "Open", "Closed", "Complete", "Pending", "Long-pending", "Re-open"];
    const selectedIndex = tabOptions.indexOf(filter);

    return (
        <div className='container py-4'>
            <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <Tabs
                            value={selectedIndex}
                            onChange={(e, newIndex) => applyFilter(tabOptions[newIndex])}
                            aria-label="ticket filters"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {tabOptions.map((type, index) => (
                                <Tab key={type} label={`${type} Tickets`} />
                            ))}
                        </Tabs>
                    </Box>
                </div>
                <div className="col-12 d-flex justify-content-end mb-4">
                    <Button onClick={fetchTickets} variant="contained" color="primary" startIcon={<RefreshIcon />}>Refresh</Button>
                </div>
                <div className="col-12">
                    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
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
                                            No tickets found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedTickets.map(ticket => (
                                        <TableRow
                                            key={ticket._id}
                                            hover
                                            onClick={() => { navigate(`/superAdmin-review-tickets/${ticket._id}`), window.scroll(0, 0) }}
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredTickets.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default SuperAdminTicketWiseInsigh