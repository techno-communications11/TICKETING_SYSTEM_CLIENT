// import React, { useCallback, useEffect, useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Pagination, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import { getAllStores } from '../Services/stores.services';
// import SearchIcon from '@mui/icons-material/Search';
// import SuperAdminAddStores from './SuperAdminAddStores';
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


// function SuperAdminManageStores() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [stores, setStores] = useState([]);
//   const [filteredStores, setFilteredStores] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(50);
//   const [selectedData, setSelectedData] = useState(null);
//   const fetchAllStores = useCallback(async () => {
//     try {
//       const response = await getAllStores();
//       setStores(response);
//       // console.log(response);
//       setFilteredStores(response);
//     } catch (error) {
//       console.error("Error fetching stores:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllStores();
//   }, [fetchAllStores]);

//   const handleRowSelect = (id) => {
//     if (selectedRows.includes(id)) {
//       setSelectedRows(selectedRows.filter(rowId => rowId !== id));
//       setSelectedData(selectedRows.filter(rowId => rowId !== id));
//     } else {
//       setSelectedRows([...selectedRows, id]);
//     }
//   };
//   const handleChangePage = (event, page) => {
//     setCurrentPage(page);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     setCurrentPage(1);
//     const filteredData = stores.filter(store =>
//       Object.values(store).some(value =>
//         typeof value === 'string' && value.toLowerCase().includes(query)
//       )
//     );

//     setFilteredStores(filteredData);
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredStores.slice(indexOfFirstRow, indexOfLastRow);
//   const handleDelete = async (IDS) => {
//     console.log(selectedData)
//   }
//   return (
//     <div className="container-fluid my-4 py-3">
//       <BasicBreadcrumbs name={'Manage Stores'} />
//       <Typography variant='h6' className='mb-3'>Manage Stores</Typography>
//       <div className="row">
//         <div className="col-md-12 d-flex justify-content-between align-items-center">
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             sx={{ width: 300 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton sx={{
//                     '& .MuiSvgIcon-root': {
//                       transition: 'color 0.3s ease',
//                     },
//                   }}>
//                     <SearchIcon />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <SuperAdminAddStores fetchAllStores={fetchAllStores} />
//         </div>
//       </div>
//       {selectedRows.length > 0 && selectedRows.length === 1 && (
//         <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
//           <div className='d-flex'>
//             <IconButton onClick={() => handleDelete(selectedData)} sx={{
//               '& .MuiSvgIcon-root': {
//                 transition: 'color 0.3s ease',
//               }
//             }}>
//               <DeleteIcon color='black' />
//             </IconButton>
//             <IconButton
//             >
//               <MoreVertIcon color='black' />
//             </IconButton>
//           </div>
//         </div>
//       )}
//       <Box sx={{ mt: 3, maxHeight: '500px', overflowY: 'auto' }}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                 <TableCell sx={{ color: 'white' }} padding="checkbox">
//                   <Checkbox
//                     sx={{
//                       color: '#fff',
//                       '&.Mui-checked': {
//                         color: '#fff',
//                       },
//                     }}
//                     checked={selectedRows.length === filteredStores.length && filteredStores.length > 0}
//                     indeterminate={selectedRows.length > 0 && selectedRows.length < filteredStores.length}
//                   // onChange={handleSelectAll}
//                   />
//                 </TableCell>
//                 <TableCell className='p-0' sx={{ color: 'white', width: "200px", fontSize: "14px" }}>TECH ID</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Market</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Door Code</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Name</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Email</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Phone</TableCell>
//                 <TableCell className='p-0' sx={{ color: 'white', fontSize: "14px", width: "200px" }}>Store Address</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length > 0 ? (
//                 currentRows.map((store, i) => (
//                   <TableRow key={i} hover role="checkbox" tabIndex={-1}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedRows.includes(store.id)}
//                         onChange={() => handleRowSelect(store.id)}
//                       />
//                     </TableCell>
//                     <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.bdi_id}</TableCell>
//                     <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.market}</TableCell>
//                     <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.door_code}</TableCell>
//                     <TableCell sx={{ fontSize: "14px" }}>{store.store_name}</TableCell>
//                     <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.stroe_email}</TableCell>
//                     <TableCell sx={{ fontSize: "14px" }}>{store.store_phone}</TableCell>
//                     <TableCell sx={{ fontSize: "14px" }}>{store.store_addres}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} height={500} align="center">
//                     <CircularProgress size={30} />
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//       <div className="row d-flex justify-content-end align-items-center mt-3">
//         <div className="col-md-6"></div>
//         <div className="col-md-6">
//           <div className="d-flex align-items-center justify-content-between g-3">
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <span>Show rows:</span>
//               <select value={rowsPerPage} onChange={handleChangeRowsPerPage} style={{ marginLeft: '8px', padding: '4px' }}>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <Pagination
//                 count={Math.ceil(filteredStores.length / rowsPerPage)} // Total pages based on filtered data
//                 page={currentPage}
//                 onChange={handleChangePage}
//                 color="primary"
//               />
//             </Box>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SuperAdminManageStores

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Checkbox,  TextField,
//   InputAdornment, IconButton, Dialog, DialogTitle, DialogContent,
//   DialogActions,
//   CircularProgress,
//   TablePagination,
//   Typography
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import { deleteStoreServices, getAllStores } from '../Services/stores.services';
// import SuperAdminAddStores from './SuperAdminAddStores';

// function SuperAdminManageStores() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedData, setSelectedData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [openResetModal, setOpenResetModal] = useState(false);
//   const [openEmailModal, setOpenEmailModal] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [deleteLoader, setDeleteLoader] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [paginatedUsers, setPaginatedUsers] = useState([]);

//   const fetchAllUserData = useCallback(async () => {
//     setLoading(true)
//     try {
//       const response = await getAllStores();
//       setUserData(response);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllUserData();
//   }, [fetchAllUserData]);

//   const handleRowSelect = (id) => {
//     let newSelectedRows = [];
//     if (selectedRows.includes(id)) {
//       newSelectedRows = selectedRows.filter(rowId => rowId !== id);
//     } else {
//       newSelectedRows = [...selectedRows, id];
//     }
//     setSelectedRows(newSelectedRows);

//     if (newSelectedRows.length === 1) {
//       const selected = userData.find(user => user.id === newSelectedRows[0]);
//       setSelectedData(selected);
//     } else {
//       setSelectedData(null);
//     }
//   };

//   const handleSelectAll = () => {
//     if (selectedRows.length === userData.length) {
//       setSelectedRows([]);
//       setSelectedData(null);
//     } else {
//       const allIds = userData.map(user => user._id);
//       setSelectedRows(allIds);
//       setSelectedData(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     console.log(id)
//     setDeleteId(id);
//     setConfirmed(true);
//   };

//   const confirmDelete = async () => {
//     setDeleteLoader(true)
//     try {
//       const response = await deleteStoreServices(deleteId);
//       fetchAllUserData();
//     } catch (error) {
//       console.log("Error deleting user:", error.message);
//     } finally {
//       setSelectedRows([]);
//       setDeleteLoader(false);
//       setConfirmed(false);
//     }
//   }


//   const handleDeleteAll = async () => {
//     try {
//       setDeleteId(selectedRows);
//       fetchAllUserData();
//     } catch (error) {
//       console.log("ERROR", error.message)
//     }
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     setCurrentPage(1);
//     const filteredData = stores.filter(store =>
//       Object.values(store).some(value =>
//         typeof value === 'string' && value.toLowerCase().includes(query)
//       )
//     );

//     setFilteredUsers(filteredData);
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       let filtered = [...userData];
//       // ✅ Search filter (name or email)
//       if (searchTerm.trim()) {
//         const term = searchTerm.toLowerCase();
//         filtered = filtered.filter(user =>
//           user.name?.toLowerCase().includes(term) ||
//           user.email?.toLowerCase().includes(term) ||
//           user.doorcode?.toLowerCase().includes(term)
//         );
//       }

//       // ✅ Pagination
//       const paginated = filtered.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       );
//       setFilteredUsers(filtered); // optional if you want to export
//       setPaginatedUsers(paginated);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [userData, searchTerm, page, rowsPerPage]);


//   return (
//     <div className="container-fluid">
//       <BasicBreadcrumbs name={'Manage Stores'} />
//       <Typography variant='h6' className='mb-3'>Manage Stores</Typography>
//       <div className="row">
//         <div className="col-md-12 d-flex justify-content-between align-items-center">
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             sx={{ width: 300 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton sx={{
//                     '& .MuiSvgIcon-root': {
//                       transition: 'color 0.3s ease',
//                     },
//                   }}>
//                     <SearchIcon />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <SuperAdminAddStores fetchAllStores={fetchAllUserData} />
//         </div>
//       </div>
//       {selectedRows.length > 0 && (
//         <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
//           {selectedRows.length === 1 ? (<></>) : (
//             <>
//               <div>{selectedRows.length} users selected</div>
//               <Button variant="contained" color="error" onClick={handleDeleteAll}>Delete All</Button>
//             </>
//           )}
//         </div>
//       )}
//       <Box sx={{ mt: 3 }}>
//         {selectedRows.length > 0 && selectedRows.length === 1 && (
//           <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
//             <div className='d-flex'>
//               {/* <IconButton onClick={() => handleEdit(selectedData)} sx={{
//                                  '& .MuiSvgIcon-root': {
//                                      transition: 'color 0.3s ease',
//                                  }
//                              }}>
//                                  <EditIcon color='black' />
//                              </IconButton> */}
//               {/* <EditUserCompo selectedRows={selectedRows} fetchAllUserData={fetchAllUserData} /> */}
//               <IconButton onClick={() => handleDelete(selectedData.id)} sx={{
//                 '& .MuiSvgIcon-root': {
//                   transition: 'color 0.3s ease',
//                 }
//               }}>
//                 <DeleteIcon color='black' />
//               </IconButton>
//             </div>
//           </div>
//         )}
//         <Dialog open={confirmed} onClose={() => setConfirmed(false)}>
//           <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#d32f2f' }}>
//             <WarningAmberIcon color="error" />
//             Confirm Deletion
//           </DialogTitle>
//           <DialogContent dividers>
//             <Box sx={{ py: 1, px: 0 }}>
//               Are you sure you want to delete this item? This action cannot be undone.
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setConfirmed(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={confirmDelete}
//             >
//               {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)}>
//           <DialogTitle>Reset Password</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="New Password"
//               type="password"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenResetModal(false)}>Cancel</Button>
//             <Button variant="contained" onClick={() => {
//               // TODO: Reset password logic
//               setOpenResetModal(false);
//             }}>Reset</Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog open={openEmailModal} onClose={() => setOpenEmailModal(false)}>
//           <DialogTitle>Change Email</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="New Email"
//               type="email"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmailModal(false)}>Cancel</Button>
//             <Button variant="contained" onClick={() => {
//               setOpenEmailModal(false);
//             }}>Update</Button>
//           </DialogActions>
//         </Dialog>
//         <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                 <TableCell sx={{ color: 'white' }} padding="checkbox">
//                   <Checkbox
//                     sx={{
//                       color: '#fff',
//                       '&.Mui-checked': {
//                         color: '#fff',
//                       },
//                     }}
//                     checked={selectedRows.length === userData.length && userData.length > 0}
//                     indeterminate={selectedRows.length > 0 && selectedRows.length < userData.length}
//                     onChange={handleSelectAll}
//                   />
//                 </TableCell>
//                 <TableCell className='p-0' sx={{ color: 'white', width: "200px", fontSize: "14px" }}>TECH ID</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Market</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Door Code</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Name</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Email</TableCell>
//                 <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Phone</TableCell>
//                 <TableCell className='p-0' sx={{ color: 'white', fontSize: "14px", width: "200px" }}>Store Address</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {
//                 loading ? <TableRow>
//                   <TableCell colSpan={7} height={200} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow> : (
//                   <>
//                     {paginatedUsers.map((store, i) => (
//                       <TableRow key={i} hover role="checkbox" tabIndex={-1}>
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             checked={selectedRows.includes(store.id)}
//                             onChange={() => handleRowSelect(store.id)}
//                           />
//                         </TableCell>
//                         <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.bdi_id}</TableCell>
//                         <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.market}</TableCell>
//                         <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.door_code}</TableCell>
//                         <TableCell sx={{ fontSize: "14px" }}>{store.store_name}</TableCell>
//                         <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.stroe_email}</TableCell>
//                         <TableCell sx={{ fontSize: "14px" }}>{store.store_phone}</TableCell>
//                         <TableCell sx={{ fontSize: "14px" }}>{store.store_addres}</TableCell>
//                       </TableRow>
//                     ))}
//                   </>
//                 )
//               }
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={userData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </div>
//   );
// }

// export default SuperAdminManageStores

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  TablePagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteStoreServices, getAllStores } from "../Services/stores.services";
import BasicBreadcrumbs from "../Components/BasicBreadcrumbs/BasicBreadcrumbs";
import SuperAdminAddStores from "./SuperAdminAddStores";

function SuperAdminManageStores() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  // Fetch all stores
  const fetchAllStores = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllStores();
      setStores(response);
      setFilteredStores(response);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  // Handle search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    if (!query.trim()) {
      setFilteredStores(stores);
      return;
    }

    const filtered = stores.filter((store) =>
      Object.values(store).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(query)
      )
    );
    setFilteredStores(filtered);
    setPage(0);
  };

  // Handle checkbox select
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredStores.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredStores.map((store) => store.id));
    }
  };

  // Delete functions
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    setDeleteLoader(true);
    try {
      await deleteStoreServices(deleteId);
      setConfirmDeleteOpen(false);
      setDeleteLoader(false);
      setSelectedRows([]);
      fetchAllStores();
    } catch (err) {
      console.error("Error deleting:", err);
      setDeleteLoader(false);
    }
  };

  const handleDeleteMultiple = async () => {
    console.log("Deleting multiple:", selectedRows);
    // TODO: Implement bulk delete if API supports
    setSelectedRows([]);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStores = filteredStores.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container-fluid my-4 py-3">
      <BasicBreadcrumbs name={"Manage Stores"} />
      <Typography variant="h6" className="mb-3">
        Manage Stores
      </Typography>

      {/* 🔍 Search + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TextField
          size="small"
          placeholder="Search stores..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SuperAdminAddStores fetchAllStores={fetchAllStores} />
      </div>

      {/* 🧾 Selection Actions */}
      {selectedRows.length > 0 && (
        <Box
          sx={{
            background: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "8px",
            p: 2,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {selectedRows.length === 1
              ? "1 store selected"
              : `${selectedRows.length} stores selected`}
          </Typography>
          {selectedRows.length === 1 ? (
            <IconButton onClick={() => handleDelete(selectedRows[0])}>
              <DeleteIcon color="error" />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteMultiple}
            >
              Delete All
            </Button>
          )}
        </Box>
      )}

      {/* 🧮 Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table >
          <TableHead sx={{ backgroundColor: "#6f2da8" }} className="sticky-top">
            <TableRow >
              <TableCell sx={{ color: "white" }} padding="checkbox">
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": { color: "#fff" },
                  }}
                  checked={
                    selectedRows.length === filteredStores.length &&
                    filteredStores.length > 0
                  }
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < filteredStores.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell className='p-0' sx={{ color: 'white', width: "200px", fontSize: "14px" }}>TECH ID</TableCell>
              <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Market</TableCell>
              <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Door Code</TableCell>
              <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Name</TableCell>
              <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Email</TableCell>
              <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Store Phone</TableCell>
              <TableCell className='p-0' sx={{ color: 'white', fontSize: "14px", width: "200px" }}>Store Address</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center" height={300}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedStores.length > 0 ? (
              paginatedStores.map((store) => (
                <TableRow key={store.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(store.id)}
                      onChange={() => handleRowSelect(store.id)}
                    />
                  </TableCell>
                  <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.bdi_id}</TableCell>
                  <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.market}</TableCell>
                  <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.door_code}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{store.store_name}</TableCell>
                  <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.stroe_email}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{store.store_phone}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>{store.store_addres}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No stores found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 Pagination */}
      <TablePagination
        rowsPerPageOptions={[100, 200, 400, 500]}
        component="div"
        count={filteredStores.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* ⚠️ Confirm Delete Dialog */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", gap: 1, color: "#d32f2f" }}
        >
          <WarningAmberIcon color="error" />
          Confirm Deletion
        </DialogTitle>
        <DialogContent dividers>
          Are you sure you want to delete this store? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            disabled={deleteLoader}
          >
            {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuperAdminManageStores;
