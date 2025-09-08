import React, { useCallback, useEffect, useState } from 'react';
// import { getAllUsers } from '../Services/AllUsers.services';
// import { getalltickets } from '../Services/ticketGenerated.services';
import { useParams } from 'react-router-dom';
import { IconButton, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Grid, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import moment from 'moment';
import { useSocket } from '../Context/socket.context';
import { getAllUser } from '../Services/auth.services';
import { getalltickets } from '../Services/tickets.services';


function ManagerAgentsDetail() {
    const [agentDetail, setAgentDetail] = useState(null);
    const [agentTickets, setAgentTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { id } = useParams();
    const { socket } = useSocket();
    const fetchData = useCallback(async () => {
        try {
            const usersResponse = await getAllUser();
            const ticketsResponse = await getalltickets();
            const filteredAgent = usersResponse.data.data.find(user => user.id == id);
            const filteredTickets = ticketsResponse.data.data.filter(ticket => ticket.assignerId == id);
            setAgentDetail(filteredAgent);
            setAgentTickets(filteredTickets);
            console.log(ticketsResponse.data.data);
        } catch (error) {
            console.error("ERROR FROM SERVER:", error.message);
        } finally {
            setLoading(false);
        }
    }, [setAgentDetail, setAgentTickets, setLoading]);
    useEffect(() => {
        fetchData();
        if (socket) {
            socket.emit("getOnlineUsers");
            socket.on("updateOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
        }

        return () => {
            if (socket) {
                socket.off("updateOnlineUsers");
            }
        };
    }, [fetchData, socket]);


    const ticketStats = {
        total: agentTickets.length,
        open: agentTickets.filter(ticket => ticket.agentstatus === 'open').length,
        pending: agentTickets.filter(ticket => ticket.agentstatus === 'pending').length,
        longPending: agentTickets.filter(ticket => {
            const createdAt = moment(ticket.createdAt);
            return ticket.status === "long pending" || createdAt.isBefore(moment().subtract(7, "days"));
        }).length,
        completed: agentTickets.filter(ticket => ticket.agentstatus === 'complete').length,
        closed: agentTickets.filter(ticket => ticket.status === 'close').length,
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className='container mt-4'>
            <div className="d-flex align-items-center justify-content-between pb-3 mb-4">
                <div className="d-flex align-items-center">
                    <IconButton  color="primary" onClick={() => window.history.back()}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" className="ms-2">Agent Detail</Typography>
                </div>
                <div className="">
                    <Button variant="contained" color="primary" startIcon={<BarChartIcon />}>
                        Generate Report
                    </Button>
                </div>
            </div>

            {agentDetail ? (
                <Card elevation={3} className="mb-4 p-3">
                    <CardContent>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                            sx={{ borderBottom: "2px solid #ddd", paddingBottom: "8px" }}
                        >
                            <Typography variant="h5" fontWeight="bold">
                                Profile Information
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: onlineUsers.includes(id) ? "#4CAF50" : "#D32F2F",
                                    color: "white",
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    fontWeight: "bold",
                                    fontSize: "14px"
                                }}
                            >
                                {onlineUsers.includes(id) ? "🟢 Online" : "🔴 Offline"}
                            </Box>
                        </Box>

                        {/* Profile Details */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}><Typography><strong>Name:</strong> {agentDetail.name}</Typography></Grid>
                            <Grid item xs={6}><Typography><strong>Email:</strong> {agentDetail.email}</Typography></Grid>
                            <Grid item xs={6}><Typography><strong>Phone:</strong> {agentDetail.phone}</Typography></Grid>
                            <Grid item xs={6}><Typography><strong>Department:</strong> {agentDetail.department}</Typography></Grid>
                            <Grid item xs={6}><Typography><strong>Designation:</strong> {agentDetail.subDepartment}</Typography></Grid>
                            {agentDetail.doorCode &&
                                <Grid item xs={6}>
                                    <Typography><strong>Door Code:</strong> {agentDetail.doorCode}</Typography>
                                </Grid>
                            }
                        </Grid>
                    </CardContent>
                </Card>
            ) : (
                <Typography color="error">Agent not found!</Typography>
            )}

            <Card elevation={3} className="mb-4 p-3">
                <CardContent>
                    <Typography variant="h6" gutterBottom>Ticket Portfolio</Typography>
                    <div className='row'>
                        {Object.entries(ticketStats).map(([key, value]) => (
                            <div className='col-md-2' key={key}>
                                <Card elevation={2} className="py-3 px-2 text-center">
                                    <Typography className='text-capitalize' variant="subtitle1" color="textSecondary" gutterBottom>{key.replace(/([A-Z])/g, ' $1').trim()}</Typography>
                                    <Typography variant="h5">{value}</Typography>
                                </Card>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="d-flex justify-content-between align-itejms-center">
                <Typography variant="h6" gutterBottom>Assigned Tickets</Typography>
            </div>
            {agentTickets.length > 0 ? (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Ticket ID</strong></TableCell>
                                <TableCell><strong>Subject</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Created At</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agentTickets.map(ticket => {
                                console.log(ticket)
                                return (
                                    <TableRow key={ticket.id}>
                                        <TableCell>{ticket.ticketId}</TableCell>
                                        <TableCell>{ticket.category}</TableCell>
                                        <TableCell>{ticket.ticketDescription}</TableCell>
                                        <TableCell>{ticket.agentstatus || ticket.status}</TableCell>
                                        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography className="mt-3" color="textSecondary">No tickets assigned to this agent.</Typography>
            )}
        </div>
    );
}

export default ManagerAgentsDetail