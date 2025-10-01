// import React, { useState, useEffect, useCallback } from 'react';
// import { getAllUser } from '../Services/auth.services';
// import {
//     Button,
//     CircularProgress,
//     Modal,
//     Box,
//     Typography,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem
// } from '@mui/material';
// import { transferedTicketServices } from '../Services/tickets.services';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     borderRadius: 2,
//     boxShadow: 24,
//     p: 4,
// };

// function ManagerTransferedTickets({ loading, ticketData }) {
//     const [open, setOpen] = useState(false);
//     const [managers, setManagers] = useState([]);
//     const [selectedManager, setSelectedManager] = useState('');
//     const [submitting, setSubmitting] = useState(false);

//     const fetchAllManagersData = useCallback(async () => {
//         try {
//             const response = await getAllUser();
//             const filteredManagers = response?.data?.data?.filter(user => user.subDepartment === 'Manager');
//             setManagers(filteredManagers);
//         } catch (error) {
//             console.error('Error fetching managers:', error);
//         }
//     }, []);

//     useEffect(() => {
//         if (open) {
//             fetchAllManagersData();
//         }
//     }, [open, fetchAllManagersData]);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => {
//         setOpen(false);
//         setSelectedManager('');
//     };

//     const handleTransfer = async () => {
//         if (!selectedManager) return;

//         setSubmitting(true);
//         try {
//             const payload = {
//                 ticketId: ticketData.id,
//                 newOwnerId: selectedManager.id,
//                 transferReason: 'Transferred via modal', // optional, you can add input for reason
//             };

//             // const response = await transferedTicketServices(payload); // call your transfer API
//             // console.log('Transfer response:', response);
//             console.log('Transfer response:', payload);

//             // optionally, show success message
//             handleClose();
//         } catch (error) {
//             console.error('Error transferring ticket:', error);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div>
//             <Button variant="contained" onClick={handleOpen}>
//                 {loading ? <CircularProgress size={25} /> : 'Transfer'}
//             </Button>

//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={style}>
//                     <Typography variant="h6" mb={2}>
//                         Transfer Ticket: {ticketData?.title || ticketData?.ticketId
// }
//                     </Typography>

//                     <FormControl fullWidth>
//                         <InputLabel id="manager-select-label">Select Manager</InputLabel>
//                         <Select
//                             labelId="manager-select-label"
//                             value={selectedManager}
//                             onChange={(e) => setSelectedManager(e.target.value)}
//                             label="Select Manager"
//                         >
//                             {managers.map((manager) => (
//                                 <MenuItem key={manager.id} value={manager}>
//                                     {manager.name} ({manager.department})
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Box mt={3} display="flex" justifyContent="flex-end">
//                         <Button onClick={handleClose} sx={{ mr: 2 }}>
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="contained"
//                             onClick={handleTransfer}
//                             disabled={submitting || !selectedManager}
//                         >
//                             {submitting ? <CircularProgress size={25} /> : 'Transfer'}
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default ManagerTransferedTickets;




import React, { useState, useEffect, useCallback } from 'react';
import { getAllUser, getAllUsers } from '../Services/auth.services';
// import { transferTicketAPI } from '../Services/ticket.services'; // aapka transfer API
import {
    Button,
    CircularProgress,
    Modal,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material';
import { transferedTicketServices } from '../Services/tickets.services';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function ManagerTransferedTickets({ loading, ticketData, filteredTickets }) {
    const [open, setOpen] = useState(false);
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState('');
    const [transferReason, setTransferReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchAllManagersData = useCallback(async () => {
        try {
            const response = await getAllUser();
            const filteredManagers = response?.data?.data?.filter(user => user.subDepartment === 'Manager');
            setManagers(filteredManagers);
        } catch (error) {
            console.error('Error fetching managers:', error);
        }
    }, []);

    useEffect(() => {
        if (open) {
            fetchAllManagersData();
        }
    }, [open, fetchAllManagersData]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedManager('');
        setTransferReason('');
    };

    const handleTransfer = async () => {
        if (!selectedManager) return;

        setSubmitting(true);
        try {
            const payload = {
                ticketId: ticketData.id,
                newOwnerId: selectedManager.id,
                transferReason: transferReason || null, // optional, default null
            };
            const responses = await getAllUsers();
            const filteredData = responses.data.data.filter((data) => data.id === selectedManager?.id)

            // console.log(filteredData[0]?.name)
            // console.log(filteredData[0]?.email)
            const response = await transferedTicketServices(ticketData?.id, selectedManager?.id, transferReason || null, selectedManager?.department, filteredData[0]?.name, filteredData[0]?.email);
            //   const response = await transferedTicketServices(payload);
            // console.log(response)
            if (response.status === 200) {
                toast.success("Ticket transferred successfully!");
                filteredTickets();
                handleClose();
            }
        } catch (error) {
            console.error('Error transferring ticket:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                {loading ? <CircularProgress size={25} /> : 'Transfer'}
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2}>
                        Transfer Ticket: {ticketData?.title || ticketData?.ticketId}
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="manager-select-label">Select Manager</InputLabel>
                        <Select
                            labelId="manager-select-label"
                            value={selectedManager}
                            onChange={(e) => setSelectedManager(e.target.value)}
                            label="Select Manager"
                        >
                            {managers.map((manager) => (
                                <MenuItem key={manager.id} value={manager}>
                                    {manager.name} ({manager.department})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Transfer Reason (optional)"
                        value={transferReason}
                        onChange={(e) => setTransferReason(e.target.value)}
                        placeholder="You can leave this empty"
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleTransfer}
                            disabled={submitting || !selectedManager}
                        >
                            {submitting ? <CircularProgress size={25} /> : 'Transfer'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ManagerTransferedTickets;
