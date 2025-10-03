import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
// import { useGlobalState } from '../../Context/context'
import { getalltickets, ticketProgressServices } from '../Services/tickets.services';
import axios from 'axios';
import cookies from 'js-cookie';
import { useSocket } from '../Context/socket.context';
import { useGlobalState } from '../Context/context';

function DistrictManagerCreateTicketBttn({ handleClose, fetchTickets }) {
    const { ticketData, reset, setTicketErrors } = useGlobalState();
    const id = cookies.get('id');
    const { socket } = useSocket();
    const [loader, setLoader] = useState(false)
    const generatedTicketId = async () => {
        try {
            const response = await getalltickets();
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
        if (!ticketData.ticketDescription) errors.ticketDescription = 'Ticket Description is required';
        if (!ticketData.priority) errors.priority = 'Priority is required';
        if (!ticketData.category) errors.category = 'Category is required';
        setTicketErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        const ticketId = await generatedTicketId();

        // console.log("DATA", {
        //     ticketId,
        //     formData: ticketData,
        // })
        setLoader(true);
        if (!validateForm()) return setLoader(false);
        try {
            const ticketId = await generatedTicketId();
            const resposne = await axios.post('https://ticketingapi.techno-communications.com/tickets/creatTickets', {
                ticketId,
                formData: ticketData,
            })
            console.log(resposne, "ticketData")
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
                // const r = await ticketProgressServices(resposne.data.data._id, "Created");
                setLoader(false);
                generatedTicketId();
                reset();
                handleClose();
                fetchTickets()
            }
        } catch (error) {
            setLoader(false)
            console.log("error", error.message)
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
        </div>
    )
}

export default DistrictManagerCreateTicketBttn