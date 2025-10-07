// // // import React, { useState } from 'react';
// // // import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
// // // import { useNavigate } from 'react-router-dom';

// // // function StoreRecentTickets({ datas }) {
// // //     const [selectedRows, setSelectedRows] = useState([]);
// // //     const navigate = useNavigate();
// // //     const handleRowSelect = (id) => {
// // //         if (selectedRows.includes(id)) {
// // //             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
// // //         } else {
// // //             setSelectedRows([...selectedRows, id]);
// // //         }
// // //     };
// // //     const handleSelectAll = () => {
// // //         if (selectedRows.length === datas.length) {
// // //             setSelectedRows([]);
// // //         } else {
// // //             setSelectedRows(datas.map(ticket => ticket.id));
// // //         }
// // //     };

// // //     const handleReviewTicket = (id) => {
// // //         alert(id)
// // //         navigate(`/agent-review-tickets/${id}`);
// // //     }
// // //     return (
// // //         <div className="container my- py-3">
// // //             <Box sx={{ mt: 3 }}>
// // //                 <Typography variant='h6' className='mb-3'>Recent Tickets</Typography>
// // //                 <TableContainer component={Paper}>
// // //                     <Table>
// // //                         <TableHead >
// // //                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
// // //                                 <TableCell sx={{ color: 'white' }} padding="checkbox">
// // //                                     <Checkbox
// // //                                         sx={{
// // //                                             color: '#fff',
// // //                                             '&.Mui-checked': {
// // //                                                 color: '#fff',
// // //                                             },
// // //                                         }}
// // //                                         checked={selectedRows.length === datas.length && datas.length > 0}
// // //                                         indeterminate={selectedRows.length > 0 && selectedRows.length < datas.length}
// // //                                         onChange={handleSelectAll}
// // //                                     />
// // //                                 </TableCell>
// // //                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
// // //                                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
// // //                                 <TableCell sx={{ color: 'white' }}>Problem</TableCell>
// // //                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
// // //                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
// // //                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
// // //                             </TableRow>
// // //                         </TableHead>
// // //                         <TableBody>
// // //                             {datas?.map((ticket) => (
// // //                                 <TableRow key={ticket.id} hover role="checkbox" tabIndex={-1} onClick={() => handleReviewTicket(ticket.id)}>
// // //                                     <TableCell padding="checkbox">
// // //                                         <Checkbox
// // //                                             checked={selectedRows.includes(ticket.id)}
// // //                                             onChange={() => handleRowSelect(ticket.id)}
// // //                                         />
// // //                                     </TableCell>
// // //                                     <TableCell>{ticket.ticketId}</TableCell>
// // //                                     <TableCell>{ticket.name}</TableCell>
// // //                                     <TableCell>{ticket.category}</TableCell>
// // //                                     <TableCell>{ticket.priority}</TableCell>
// // //                                     <TableCell>{ticket.status}</TableCell>
// // //                                     <TableCell>{ticket.assignerName}</TableCell>
// // //                                 </TableRow>
// // //                             ))}
// // //                         </TableBody>
// // //                     </Table>
// // //                 </TableContainer>
// // //             </Box>
// // //         </div>
// // //     );
// // // }

// // // export default StoreRecentTickets


// // import React, { useState } from 'react';
// // import {
// //     Box,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     Paper,
// //     Checkbox,
// //     Typography,
// //     CircularProgress
// // } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';

// // function StoreRecentTickets({ datas, isLoading }) {
// //     const [selectedRows, setSelectedRows] = useState([]);
// //     const navigate = useNavigate();

// //     const handleRowSelect = (id) => {
// //         if (selectedRows.includes(id)) {
// //             setSelectedRows(selectedRows.filter(rowId => rowId !== id));
// //         } else {
// //             setSelectedRows([...selectedRows, id]);
// //         }
// //     };

// //     const handleSelectAll = () => {
// //         if (selectedRows.length === datas.length) {
// //             setSelectedRows([]);
// //         } else {
// //             setSelectedRows(datas.map(ticket => ticket.id));
// //         }
// //     };

// //     const handleReviewTicket = (id) => {
// //         navigate(`/store-reviews-tickte/${id}`);
// //     };


// //     return (
// //         <div className="container py-3">
// //             <Box sx={{ mt: 3 }}>
// //                 <Typography variant="h6" className="mb-3">Recent Tickets</Typography>
// //                 <TableContainer component={Paper}>
// //                     <Table>
// //                         <TableHead>
// //                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
// //                                 <TableCell sx={{ color: 'white' }} padding="checkbox">
// //                                     <Checkbox
// //                                         sx={{
// //                                             color: '#fff',
// //                                             '&.Mui-checked': {
// //                                                 color: '#fff',
// //                                             },
// //                                         }}
// //                                         checked={selectedRows.length === datas.length}
// //                                         indeterminate={selectedRows.length > 0 && selectedRows.length < datas.length}
// //                                         onChange={handleSelectAll}
// //                                     />
// //                                 </TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Problem</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Priority</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Status</TableCell>
// //                                 <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {isLoading ? (
// //                                 <TableRow>
// //                                     <TableCell colSpan={7} align='center'>
// //                                         <CircularProgress />
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ) : datas && datas.length > 0 ? (
// //                                 <>
// //                                     {datas.map((ticket) => (
// //                                         <TableRow
// //                                             key={ticket.id}
// //                                             hover
// //                                             onClick={() => handleReviewTicket(ticket.id)}
// //                                             sx={{ cursor: 'pointer' }}
// //                                         >
// //                                             <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
// //                                                 <Checkbox
// //                                                     checked={selectedRows.includes(ticket.id)}
// //                                                     onChange={() => handleRowSelect(ticket.id)}
// //                                                 />
// //                                             </TableCell>
// //                                             <TableCell>{ticket.ticketId}</TableCell>
// //                                             <TableCell>{ticket.name}</TableCell>
// //                                             <TableCell>{ticket.category}</TableCell>
// //                                             <TableCell>{ticket.priority}</TableCell>
// //                                             <TableCell>{ticket.status}</TableCell>
// //                                             <TableCell>{ticket.assignerName}</TableCell>
// //                                         </TableRow>
// //                                     ))}
// //                                 </>
// //                             ) : (
// //                                 <TableRow>
// //                                     <TableCell colSpan={7} align='center'>
// //                                         <Typography variant="body1" align="center" sx={{ mt: 4 }}>
// //                                             No data found yet.
// //                                         </Typography>
// //                                     </TableCell>
// //                                 </TableRow>
// //                             )}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>

// //             </Box>
// //         </div>
// //     );
// // }

// // export default StoreRecentTickets;

// import React, { useState } from "react";
// import {
//     Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     CircularProgress,
//     TablePagination,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function StoreRecentTickets({ datas = [], isLoading }) {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(8); // 👈 how many rows visible per page
//     const navigate = useNavigate();

//     // ✅ Handle navigation
//     const handleReviewTicket = (id) => {
//         navigate(`/store-reviews-tickte/${id}`);
//     };

//     // ✅ Handle pagination
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // ✅ Paginated data
//     const paginatedData = datas.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     return (
//         <div className="container py-3">
//             <Box sx={{ mt: 3 }}>
//                 <Typography variant="h6" className="mb-3">
//                     Recent Tickets
//                 </Typography>

//                 <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                     <TableContainer
//                         sx={{
//                             maxHeight: 440, // 👈 fixed height here
//                             overflowY: "auto",
//                         }}
//                     >
//                         <Table>
//                             <TableHead sx={{ position: "sticky", top: "0px" }}>
//                                 <TableRow sx={{ backgroundColor: "#6f2da8" }}>
//                                     <TableCell sx={{ color: "white" }}>Ticket ID</TableCell>
//                                     <TableCell sx={{ color: "white" }}>Creator Name</TableCell>
//                                     <TableCell sx={{ color: "white" }}>Problem</TableCell>
//                                     <TableCell sx={{ color: "white" }}>Priority</TableCell>
//                                     <TableCell sx={{ color: "white" }}>Status</TableCell>
//                                     <TableCell sx={{ color: "white" }}>Solved By</TableCell>
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>
//                                 {isLoading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={7} align="center">
//                                             <CircularProgress />
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : paginatedData.length > 0 ? (
//                                     paginatedData.map((ticket) => (
//                                         <TableRow
//                                             key={ticket.id}
//                                             hover
//                                             onClick={() => handleReviewTicket(ticket.id)}
//                                             sx={{ cursor: "pointer" }}
//                                         >
//                                             <TableCell>{ticket.ticketId}</TableCell>
//                                             <TableCell>{ticket.name}</TableCell>
//                                             <TableCell>{ticket.category}</TableCell>
//                                             <TableCell>{ticket.priority}</TableCell>
//                                             <TableCell>{ticket.status}</TableCell>
//                                             <TableCell>{ticket.assignerName}</TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={7} align="center">
//                                             <Typography
//                                                 variant="body1"
//                                                 align="center"
//                                                 sx={{ mt: 4 }}
//                                             >
//                                                 No data found yet.
//                                             </Typography>
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     {/* ✅ Pagination */}
//                     {!isLoading && datas.length > 0 && (
//                         <TablePagination
//                             component="div"
//                             count={datas.length}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             rowsPerPage={rowsPerPage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                             rowsPerPageOptions={[5, 8, 10, 20]}
//                         />
//                     )}
//                 </Paper>
//             </Box>
//         </div>
//     );
// }

// export default StoreRecentTickets;


import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function StoreRecentTickets({ datas = [], isLoading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const navigate = useNavigate();

  // ✅ Sort tickets: newest first (by createdAt or id)
  const sortedData = useMemo(() => {
    return [...datas].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt); // latest first
      }
      return b.id - a.id; // fallback if no date
    });
  }, [datas]);

  // ✅ Paginated data
  const paginatedData = useMemo(
    () =>
      sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  const handleReviewTicket = (id) => {
    navigate(`/store-reviews-tickte/${id}`);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container py-3">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" className="mb-3">
          Recent Tickets
        </Typography>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{
              maxHeight: 440,
              overflowY: "auto",
            }}
          >
            <Table>
              <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
                <TableRow sx={{ backgroundColor: "#6f2da8" }}>
                  <TableCell sx={{ color: "white" }}>Ticket ID</TableCell>
                  <TableCell sx={{ color: "white" }}>Creator Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Problem</TableCell>
                  <TableCell sx={{ color: "white" }}>Priority</TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Solved By</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      hover
                      onClick={() => handleReviewTicket(ticket.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{ticket.ticketId}</TableCell>
                      <TableCell>{ticket.name}</TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>{ticket.priority}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>{ticket.assignerName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography
                        variant="body1"
                        align="center"
                        sx={{ mt: 4 }}
                      >
                        No data found yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ✅ Pagination */}
          {!isLoading && sortedData.length > 0 && (
            <TablePagination
              component="div"
              count={sortedData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 8, 10, 20]}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default StoreRecentTickets;
