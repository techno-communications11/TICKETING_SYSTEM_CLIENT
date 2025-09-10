// import React, { useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// function StoreRecentTickets({ datas }) {
//     const [selectedRows, setSelectedRows] = useState([]);
//     const navigate = useNavigate();
//     const handleRowSelect = (id) => {
//         if (selectedRows.includes(id)) {
//             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
//         } else {
//             setSelectedRows([...selectedRows, id]);
//         }
//     };
//     const handleSelectAll = () => {
//         if (selectedRows.length === datas.length) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(datas.map(ticket => ticket.id));
//         }
//     };

//     const handleReviewTicket = (id) => {
//         alert(id)
//         navigate(`/agent-review-tickets/${id}`);
//     }
//     return (
//         <div className="container my- py-3">
//             <Box sx={{ mt: 3 }}>
//                 <Typography variant='h6' className='mb-3'>Recent Tickets</Typography>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead >
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }} padding="checkbox">
//                                     <Checkbox
//                                         sx={{
//                                             color: '#fff',
//                                             '&.Mui-checked': {
//                                                 color: '#fff',
//                                             },
//                                         }}
//                                         checked={selectedRows.length === datas.length && datas.length > 0}
//                                         indeterminate={selectedRows.length > 0 && selectedRows.length < datas.length}
//                                         onChange={handleSelectAll}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Problem</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {datas?.map((ticket) => (
//                                 <TableRow key={ticket._id} hover role="checkbox" tabIndex={-1} onClick={() => handleReviewTicket(ticket._id)}>
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             checked={selectedRows.includes(ticket._id)}
//                                             onChange={() => handleRowSelect(ticket._id)}
//                                         />
//                                     </TableCell>
//                                     <TableCell>{ticket.ticketId}</TableCell>
//                                     <TableCell>{ticket.name}</TableCell>
//                                     <TableCell>{ticket.category}</TableCell>
//                                     <TableCell>{ticket.priority}</TableCell>
//                                     <TableCell>{ticket.status}</TableCell>
//                                     <TableCell>{ticket.assignerName}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default StoreRecentTickets


import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Typography,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StoreRecentTickets({ datas, isLoading }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    const handleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === datas.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(datas.map(ticket => ticket._id));
        }
    };

    const handleReviewTicket = (id) => {
        navigate(`/agent-review-tickets/${id}`);
    };

    return (
        <div className="container py-3">
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" className="mb-3">Recent Tickets</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }} padding="checkbox">
                                    <Checkbox
                                        sx={{
                                            color: '#fff',
                                            '&.Mui-checked': {
                                                color: '#fff',
                                            },
                                        }}
                                        checked={selectedRows.length === datas.length}
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < datas.length}
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align='center'>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : datas && datas.length > 0 ? (
                                <>
                                    {datas.map((ticket) => (
                                        <TableRow
                                            key={ticket._id}
                                            hover
                                            onClick={() => handleReviewTicket(ticket._id)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={selectedRows.includes(ticket._id)}
                                                    onChange={() => handleRowSelect(ticket._id)}
                                                />
                                            </TableCell>
                                            <TableCell>{ticket.ticketId}</TableCell>
                                            <TableCell>{ticket.name}</TableCell>
                                            <TableCell>{ticket.category}</TableCell>
                                            <TableCell>{ticket.priority}</TableCell>
                                            <TableCell>{ticket.status}</TableCell>
                                            <TableCell>{ticket.assignerName}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align='center'>
                                        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                                            No data found yet.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </div>
    );
}

export default StoreRecentTickets;
