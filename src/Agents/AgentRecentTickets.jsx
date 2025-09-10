// import React from 'react';
// import {
//   Box, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Typography,
//   CircularProgress
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// function AgentRecentTickets({ datas, loader }) {
//   const navigate = useNavigate();

//   const handleReviewTicket = (id) => {
//     navigate(`/agent-review-tickets/${id}`);
//   };

//   const recentTickets = [...(datas || [])]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))  
//     .slice(0, 10);

//   return (
//     <div className="container py-3">
//       <Box sx={{ mt: 3 }}>
//         <Typography variant="h6" className="mb-3">Recent Tickets</Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Problem</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Assigned By</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loader ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center" height={200}>
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : recentTickets.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center" height={100}>
//                     No matching tickets found
//                   </TableCell>
//                 </TableRow>
//               ) : recentTickets.map((ticket) => (
//                 <TableRow key={ticket._id} hover sx={{ cursor: 'pointer' }} onClick={() => handleReviewTicket(ticket._id)}>
//                   <TableCell>{ticket.ticketId}</TableCell>
//                   <TableCell>{ticket.name}</TableCell>
//                   <TableCell>{ticket.category}</TableCell>
//                   <TableCell>{ticket.priority}</TableCell>
//                   <TableCell>{ticket.status}</TableCell>
//                   <TableCell>{ticket.assignedmanagername}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </div>
//   );
// }

// export default AgentRecentTickets;


import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  CircularProgress, TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AgentRecentTickets({ datas, loader }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleReviewTicket = (id) => {
    navigate(`/agent-review-tickets/${id}`);
  };

  const recentTickets = [...(datas || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Newest first
    .slice(0, 20); // Only 20 most recent

  const paginatedTickets = recentTickets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container py-3">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" className="mb-3">Recent Tickets</Typography>
        <Paper sx={{ maxHeight: 400, overflow: 'auto' }}>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                  <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Problem</TableCell>
                  <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                  <TableCell sx={{ color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white' }}>Assigned By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loader ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" height={200}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : paginatedTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" height={100}>
                      No matching tickets found
                    </TableCell>
                  </TableRow>
                ) : paginatedTickets.map((ticket) => (
                  <TableRow key={ticket.id} hover sx={{ cursor: 'pointer' }} onClick={() => handleReviewTicket(ticket.id)}>
                    <TableCell>{ticket.ticketId}</TableCell>
                    <TableCell>{ticket.name}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{ticket.priority}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.assignedmanagername}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={recentTickets.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default AgentRecentTickets;
