import { Alert, Button, CircularProgress, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { useGlobalState } from '../../Context/context'
import { getalltickets, ticketProgressServices } from '../../Services/tickets.services';
import axios from 'axios';
import cookies from 'js-cookie';
import { useSocket } from '../../Context/socket.context';
function ManagerCreateTicketBttn({ handleClose, fetchTickets, getCurrentUser }) {
    const { ticketData, reset, setTicketErrors } = useGlobalState();
    const id = cookies.get('id');
    // console.log("user Id",id)
    const { socket } = useSocket();
    const [loader, setLoader] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' ya 'error'
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const generatedTicketId = async () => {
        try {
            const response = await getalltickets();
            // console.log(response)
            const allTickets = response.data.data;
            if (!allTickets || allTickets.length === 0) {
                return 'Ticket#1001';
            }
            const sortedTickets = [...allTickets].sort((a, b) => {
                const aNum = parseInt(a.ticketId.replace('Ticket#', ''));
                const bNum = parseInt(b.ticketId.replace('Ticket#', ''));
                return bNum - aNum;
            });
            const lastTicket = sortedTickets[0];
            const lastTicketNumber = parseInt(lastTicket.ticketId.replace('Ticket#', ''));
            const newId = `Ticket#${lastTicketNumber + 1}`;
            return newId;
        } catch (error) {
            console.error("Error generating ticket ID:", error);
            return 'Ticket#1001';
        }
    };
    const validateForm = () => {
        const errors = {};
        if (!ticketData.store) errors.store = 'Store is required';
        if (!ticketData.market) errors.market = 'Market is required';
        if (!ticketData.ticketDescription) errors.ticketDescription = 'Ticket Description is required';
        if (!ticketData.priority) errors.priority = 'Priority is required';
        if (!ticketData.category) errors.category = 'Category is required';
        if (!ticketData.managerName) errors.managerName = 'Manager is required';
        setTicketErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        // const ticketId = await generatedTicketId();
        // console.log(ticketId)
        setLoader(true);
        if (!validateForm()) return setLoader(false);
        try {
            // const ticketId = 'Ticket#1001';
            const ticketId = await generatedTicketId();
            console.log(
                {
                    ticketId,
                    formData: ticketData,
                }
            )

            // const resposne = await axios.post('https://ticketing-system-sever.vercel.app/tickets/creatTickets', {
            // const resposne = await axios.post('http://localhost:5000/tickets/creatTickets', {
            const resposne = await axios.post('https://ticketingapi.techno-communications.com/tickets/creatTickets', {
                ticketId,
                formData: ticketData,
            })
            // console.log(resposne, "ticketData")
            if (resposne.status === 200) {
                const notificationObj = {
                    ticketId: resposne.data.data._id,
                    ticket_Id: ticketId,
                    recipientId: ticketData?.marketManager_id,
                    manager: ticketData?.managerID,
                    marketmanager: ticketData?.marketManager_id,
                    distrcitmanager: ticketData?.districtManager_id,
                    senderId: id,
                    store: resposne.data.data?.store_detail[0]?._id,
                    notification_type: "new Ticket open",
                };
                socket.emit('notify', notificationObj)
                setLoader(false);
                generatedTicketId();
                reset();
                handleClose();
                fetchTickets();
                generatedTicketId();
                getCurrentUser()
                setSnackbarMessage('Student data added successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                // const r = await ticketProgressServices(resposne.data.data._id, "Created");
            }
        } catch (error) {
            setLoader(false)
            console.log("error", error.message)
            setSnackbarMessage('Error occurred: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        // finally {
        // setLoader(false);
        // generatedTicketId();
        // reset();
        // handleClose();
        // fetchTickets();
        // generatedTicketId();
        // fetchCUrrentUser()
        // }
    };
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    textTransform: 'none',
                    padding: '10px',
                }}
                disabled={loader}
                onClick={handleSubmit}
            >
                {loader ? <CircularProgress size={25} /> : "Submit Ticket"}
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ManagerCreateTicketBttn
