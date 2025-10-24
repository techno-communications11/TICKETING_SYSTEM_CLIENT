import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useGlobalState } from '../Context/context'
import { getalltickets, ticketProgressServices } from '../Services/tickets.services';
import axios from 'axios';
import cookies from 'js-cookie';
import { useSocket } from '../Context/socket.context';
import { addNewTicketProgressServices } from '../Services/ticketprogress.services';
import AlertCompo from '../Components/AlertCompo/AlertCompo';

function SuperAdminCreateTicketbtn({ handleClose, fetchTickets }) {
    const { ticketData, reset, setTicketErrors, ip, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen } = useGlobalState();

    const id = cookies.get('id');
    const { socket } = useSocket();
    const [loader, setLoader] = useState(false)
    const generatedTicketId = async () => {
        try {
            const response = await getalltickets(ip, id, "get all tickets");
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
        setLoader(true);
        if (!validateForm()) return setLoader(false);
        try {
            const ticketId = await generatedTicketId();
            const resposne = await axios.post('https://ticketingapi.techno-communications.com/tickets/creatTickets', {
                ticketId,
                formData: ticketData,
            })
            if (resposne.status === 200) {
                const notificationObj = {
                    ticketId: resposne.data.data.id,
                    ticket_Id: ticketId,
                    recipientId: ticketData?.marketManager_id,
                    manager: ticketData?.managerID,
                    marketmanager: ticketData?.marketManager_id,
                    distrcitmanager: ticketData?.districtManager_id,
                    senderId: id,
                    store: resposne.data.data?.store_detail[0]?.id,
                    notification_type: "new Ticket open",
                };
                const obj = {
                    ticketId: resposne.data.data.id,
                    status: "Created",
                    updatedBy: id
                }
                socket.emit('notify', notificationObj);
                generatedTicketId();
                await addNewTicketProgressServices(obj)
                reset();
                setSnackbarMessage('Ticket has been created successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setLoader(false);
                handleClose();
                fetchTickets()
            }
        } catch (error) {
            setLoader(false)
            console.log("error", error)
            setSnackbarMessage('Error occurred: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
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
            <AlertCompo />

        </div>
    )
}

export default SuperAdminCreateTicketbtn