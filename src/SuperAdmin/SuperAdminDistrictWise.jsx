import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Button,
    Box,
    Tabs,
    Tab,
    MenuItem,
    Select,
    TextField,
    InputLabel,
    FormControl,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    TablePagination,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import moment from 'moment';
import { getalltickets } from '../Services/tickets.services';

const MARKET_LIST = [
    "All",
    "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON",
    "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD",
    "PALMDALE", "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
];

const PRIORITY_LIST = ["None", "High", "Medium", "Low"];
function SuperAdminDistrictWise() {
    const navigate = useNavigate();
    const [allTickets, setAllTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("Total");
    const [selectedMarket, setSelectedMarket] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("None");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        const response = await getalltickets();
        const tickets = response.data?.data?.filter((data) => data.department
            === "District Manager") || [];
        setAllTickets(tickets);
        applyAllFilters(filter, tickets, selectedMarket, selectedPriority, searchTerm);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTickets();
    }, []);

    const applyAllFilters = (type, tickets = allTickets, market = selectedMarket, priority = selectedPriority, search = searchTerm) => {
        let result = [...tickets];

        // Tab filter
        switch (type) {
            case "Open":
                result = result.filter(ticket => ticket.status === "open");
                break;
            case "Complete":
                result = result.filter(ticket => ticket.agentstatus === "complete");
                break;
            case "Long-pending":
                result = result.filter(ticket =>
                    ticket.agentstatus !== "complete" &&
                    moment(ticket.createdAt).isBefore(moment().subtract(7, "days"))
                );
                break;
            case "Pending":
                result = result.filter(ticket =>
                    ticket.status === "pending" ||
                    (ticket.status === "open" && moment(ticket.createdAt).isBefore(moment().subtract(7, "days")))
                );
                break;
            case "Closed":
                result = result.filter(ticket => ticket.status === "close");
                break;
            case "Re-open":
                result = result.filter(ticket => ticket.status === "re-open");
                break;
            default:
                break;
        }

        // Market filter
        if (market !== "All") {
            result = result.filter(ticket => ticket.market === market);
        }

        // Priority filter
        if (priority !== "None") {
            result = result.filter(ticket => ticket.priority === priority);
        }

        // Search filter
        if (search.trim()) {
            const term = search.toLowerCase();
            result = result.filter(ticket =>
                (ticket.ticketId && ticket.ticketId.toLowerCase().includes(term)) ||
                (ticket.store && ticket.store.toLowerCase().includes(term)) ||
                (ticket.phoneNumber && ticket.phoneNumber.toLowerCase().includes(term))
            );
        }

        setFilteredTickets(result);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        applyAllFilters(filter, allTickets, selectedMarket, selectedPriority, term);
    };

    const handleMarketChange = (e) => {
        const market = e.target.value;
        setSelectedMarket(market);
        applyAllFilters(filter, allTickets, market, selectedPriority, searchTerm);
    };

    const handlePriorityChange = (e) => {
        const priority = e.target.value;
        setSelectedPriority(priority);
        applyAllFilters(filter, allTickets, selectedMarket, priority, searchTerm);
    };

    const applyTabFilter = (type) => {
        setFilter(type);
        applyAllFilters(type, allTickets, selectedMarket, selectedPriority, searchTerm);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedTickets = filteredTickets
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const tabOptions = ["Total", "Open", "Closed", "Complete", "Pending", "Long-pending", "Re-open"];
    const selectedIndex = tabOptions.indexOf(filter);

    return (
        <div className="container py-4">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={selectedIndex}
                    onChange={(e, newIndex) => applyTabFilter(tabOptions[newIndex])}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabOptions.map((type, index) => (
                        <Tab key={type} label={`${type} Tickets`} />
                    ))}
                </Tabs>
            </Box>

            <Grid container spacing={2} className="mb-3">
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Market</InputLabel>
                        <Select
                            value={selectedMarket}
                            label="Market"
                            onChange={handleMarketChange}
                        >
                            {MARKET_LIST.map((market) => (
                                <MenuItem key={market} value={market}>{market}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Search by Ticket ID ..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={selectedPriority}
                            label="Priority"
                            onChange={handlePriorityChange}
                        >
                            {PRIORITY_LIST.map(priority => (
                                <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RefreshIcon />}
                        fullWidth
                        onClick={fetchTickets}
                    >
                        Refresh
                    </Button>
                </Grid>
            </Grid>

            <Paper sx={{ height: 500, width: '100%' }}>
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
            </Paper>
        </div>
    );
}

export default SuperAdminDistrictWise