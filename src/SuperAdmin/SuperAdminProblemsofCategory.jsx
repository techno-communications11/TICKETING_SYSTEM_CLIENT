// // import React, { useCallback, useEffect, useState } from 'react';
// // import {
// //   Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
// //   Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField,
// //   InputAdornment, IconButton, Menu, Dialog, DialogTitle, DialogContent,
// //   DialogActions,
// //   CircularProgress,
// //   TablePagination
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// // import { deleteUserServices, getAllUser, getAllUsers } from '../Services/auth.services';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // import AddUserCompo from './AddUserCompo';
// // import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// // import EditUserCompo from '../SuperAdminComponent/EditUserCompo';
// // import ExportUsers from '../SuperAdminComponent/ExportUsers';
// // import { getAllProblemCategory } from '../Services/categoryofproblem.services';

// // function SuperAdminProblemsofCategory() {
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedData, setSelectedData] = useState(null);
// //   const [status, setStatus] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [userData, setUserData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [departmentFilter, setDepartmentFilter] = useState("");

// //   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
// //   const [openResetModal, setOpenResetModal] = useState(false);
// //   const [openEmailModal, setOpenEmailModal] = useState(false);
// //   const [confirmed, setConfirmed] = useState(false);
// //   const [deleteId, setDeleteId] = useState(null);
// //   const [deleteLoader, setDeleteLoader] = useState(false);
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [departments] = useState([
// //     "COO", "DCO", "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager",
// //     "District Manager", "Finance (GL)", "Finance (GL) EXECUTIVE", "Finance EXECUTIVE", "Finance AR", "SUPERVISOR",
// //     "HR", "IT", "Software India", "Internal", "Reporting", "Inventory", "Maintenance",
// //     "Sales", "Commission", "Compliance", "AR", "Employee", "Store", "Management",
// //     "SCM", "QA", "Vigilance", "MIS", "CMG", "Data Analytics"
// //   ]);

// //   const fetchAllUserData = useCallback(async () => {
// //     setLoading(true)
// //     try {
// //       const response = await getAllProblemCategory();
// //       // const response2 = await getAllUser();
// //       // setUserData(response2.data.data);
// //       setUserData(response.data.data);
// //       console.log(response.data.data);
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchAllUserData();
// //   }, [fetchAllUserData]);

// //   const handleRowSelect = (id) => {
// //     let newSelectedRows = [];
// //     if (selectedRows.includes(id)) {
// //       newSelectedRows = selectedRows.filter(rowId => rowId !== id);
// //     } else {
// //       newSelectedRows = [...selectedRows, id];
// //     }
// //     setSelectedRows(newSelectedRows);

// //     if (newSelectedRows.length === 1) {
// //       const selected = userData.find(user => user.id === newSelectedRows[0]);
// //       setSelectedData(selected);
// //     } else {
// //       setSelectedData(null);
// //     }
// //   };

// //   const handleSelectAll = () => {
// //     if (selectedRows.length === userData.length) {
// //       setSelectedRows([]);
// //       setSelectedData(null);
// //     } else {
// //       const allIds = userData.map(user => user._id);
// //       setSelectedRows(allIds);
// //       setSelectedData(null);
// //     }
// //   };

// //   const handlePermissions = (user) => {
// //     console.log("Manage permissions for:", user);
// //   };

// //   const handleDelete = async (id) => {
// //     console.log(id)
// //     setDeleteId(id);
// //     setConfirmed(true);
// //   };

// //   const confirmDelete = async () => {
// //     setDeleteLoader(true)
// //     try {
// //       console.log(deleteId)
// //       const response = await deleteUserServices(deleteId);
// //       fetchAllUserData();
// //     } catch (error) {
// //       console.log("Error deleting user:", error);
// //     } finally {
// //       setSelectedRows([]);
// //       setDeleteLoader(false);
// //       setConfirmed(false);
// //     }
// //   }


// //   const handleDeleteAll = () => {
// //     console.log("Delete all selected users:", selectedRows);
// //   };
// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const filteredUsers = userData.filter(user =>
// //     (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
// //     (departmentFilter === "" || user.department === departmentFilter)
// //   );

// //   const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


// //   return (
// //     <div className="container">
// //       <BasicBreadcrumbs name="Category Of Problems" />

// //       {selectedRows.length > 0 && (
// //         <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
// //           {selectedRows.length === 1 ? '' : (
// //             <>
// //               <div>{selectedRows.length} users selected</div>
// //               <Button variant="contained" color="error" onClick={handleDeleteAll}>Delete All</Button>
// //             </>
// //           )}
// //         </div>
// //       )}
// //       <div className="row my-4">
// //         <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
// //           <div className="d-flex align-items-center" style={{ gap: "10px" }}>
// //             <TextField
// //               size="small"
// //               placeholder="Search..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               sx={{ width: 300 }}
// //               InputProps={{
// //                 endAdornment: (
// //                   <InputAdornment position="end">
// //                     <IconButton>
// //                       <SearchIcon />
// //                     </IconButton>
// //                   </InputAdornment>
// //                 ),
// //               }}
// //             />
// //             <FormControl size="small" sx={{ minWidth: 200 }}>
// //               <InputLabel>Department</InputLabel>
// //               <Select value={departmentFilter}
// //                 onChange={(e) => setDepartmentFilter(e.target.value)}
// //                 label="Department">
// //                 <MenuItem value="">All</MenuItem>
// //                 {departments.map((dept, index) => (
// //                   <MenuItem key={index} value={dept}>{dept}</MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>
// //             <Button variant='contained'>Add Category</Button>
// //             <Button variant='contained'>Export Category</Button>
// //           </div>
// //         </div>
// //       </div>
// //       <Box sx={{ mt: 3 }}>
// //         {selectedRows.length > 0 && selectedRows.length === 1 && (
// //           <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
// //             <div className='d-flex'>
// //               <EditUserCompo selectedRows={selectedRows} fetchAllUserData={fetchAllUserData} />
// //               <IconButton onClick={() => handleDelete(selectedData.id)} sx={{
// //                 '& .MuiSvgIcon-root': {
// //                   transition: 'color 0.3s ease',
// //                 }
// //               }}>
// //                 <DeleteIcon color='black' />
// //               </IconButton>
// //               <IconButton
// //                 onClick={(e) => setMenuAnchorEl(e.currentTarget)} sx={{
// //                   '& .MuiSvgIcon-root': {
// //                     transition: 'color 0.3s ease',
// //                   }
// //                 }}
// //               >
// //                 <MoreVertIcon color='black' />
// //               </IconButton>
// //             </div>
// //           </div>
// //         )}

// //         <Menu
// //           anchorEl={menuAnchorEl}
// //           open={Boolean(menuAnchorEl)}
// //           onClose={() => setMenuAnchorEl(null)}
// //         >
// //           <MenuItem onClick={() => {
// //             setOpenResetModal(true);
// //             setMenuAnchorEl(null);
// //           }}>Reset Password</MenuItem>
// //           <MenuItem onClick={() => {
// //             setOpenEmailModal(true);
// //             setMenuAnchorEl(null);
// //           }}>Change Email</MenuItem>
// //           <MenuItem onClick={() => {
// //             handlePermissions(selectedData);
// //             setMenuAnchorEl(null);
// //           }}>Permissions</MenuItem>
// //           <MenuItem onClick={() => {
// //             console.log("Settings clicked");
// //             setMenuAnchorEl(null);
// //           }}>Settings</MenuItem>
// //         </Menu>
// //         <Dialog open={confirmed} onClose={() => setConfirmed(false)}>
// //           <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#d32f2f' }}>
// //             <WarningAmberIcon color="error" />
// //             Confirm Deletion
// //           </DialogTitle>
// //           <DialogContent dividers>
// //             <Box sx={{ py: 1, px: 0 }}>
// //               Are you sure you want to delete this item? This action cannot be undone.
// //             </Box>
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => setConfirmed(false)} variant="outlined">
// //               Cancel
// //             </Button>
// //             <Button
// //               variant="contained"
// //               color="error"
// //               onClick={confirmDelete}
// //             >
// //               {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //         <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)}>
// //           <DialogTitle>Reset Password</DialogTitle>
// //           <DialogContent>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               label="New Password"
// //               type="password"
// //               fullWidth
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => setOpenResetModal(false)}>Cancel</Button>
// //             <Button variant="contained" onClick={() => {
// //               // TODO: Reset password logic
// //               setOpenResetModal(false);
// //             }}>Reset</Button>
// //           </DialogActions>
// //         </Dialog>
// //         <Dialog open={openEmailModal} onClose={() => setOpenEmailModal(false)}>
// //           <DialogTitle>Change Email</DialogTitle>
// //           <DialogContent>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               label="New Email"
// //               type="email"
// //               fullWidth
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => setOpenEmailModal(false)}>Cancel</Button>
// //             <Button variant="contained" onClick={() => {
// //               setOpenEmailModal(false);
// //             }}>Update</Button>
// //           </DialogActions>
// //         </Dialog>
// //         <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: '#6f2da8' }}>
// //                 <TableCell sx={{ color: 'white' }} padding="checkbox">
// //                   <Checkbox
// //                     sx={{
// //                       color: '#fff',
// //                       '&.Mui-checked': {
// //                         color: '#fff',
// //                       },
// //                     }}
// //                     checked={selectedRows.length === userData.length && userData.length > 0}
// //                     indeterminate={selectedRows.length > 0 && selectedRows.length < userData.length}
// //                     onChange={handleSelectAll}
// //                   />
// //                 </TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Category Name</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Department Name</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Department Email</TableCell>
// //                 <TableCell sx={{ color: 'white' }}>Action</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {
// //                 loading ? <TableRow>
// //                   <TableCell colSpan={7} height={200} align="center">
// //                     <CircularProgress />
// //                   </TableCell>
// //                 </TableRow> : (
// //                   <>
// //                     {paginatedUsers.map((user, index) => (
// //                       <TableRow key={index} hover role="checkbox" tabIndex={-1}>
// //                         <TableCell padding="checkbox">
// //                           <Checkbox
// //                             checked={selectedRows.includes(user.id)}
// //                             onChange={() => handleRowSelect(user.id)}
// //                           />
// //                         </TableCell>
// //                         <TableCell>{user.name}</TableCell>
// //                         <TableCell>{user.department}</TableCell>
// //                         <TableCell>{user.department_email
// //                         }</TableCell>
// //                         <TableCell></TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </>
// //                 )
// //               }
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={userData.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Box>
// //     </div>
// //   );
// // }

// // export default SuperAdminProblemsofCategory deleteProblemCategory


// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Checkbox, TextField, InputAdornment, IconButton, CircularProgress,
//   TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getAllProblemCategory } from '../Services/categoryofproblem.services';

// function SuperAdminProblemsofCategory() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedData, setSelectedData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [editModal, setEditModal] = useState(false);

//   const fetchAllUserData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getAllProblemCategory();
//       setUserData(response.data.data);
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
//       const allIds = userData.map(user => user.id);
//       setSelectedRows(allIds);
//       setSelectedData(null);
//     }
//   };

//   const handleDelete = (id) => {
//     console.log("Single Delete ID:", id);
//   };

//   const handleDeleteAll = () => {
//     console.log("Multiple Delete IDs:", selectedRows);
//   };

//   const handleEdit = (data) => {
//     setSelectedData(data);
//     setEditModal(true);
//   };

//   const filteredUsers = userData.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.department_email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <div className="container">
//       <h4>Category of Problems</h4>

//       {/* Search + Bulk Delete */}
//       <div className="d-flex align-items-center my-3" style={{ gap: "10px" }}>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 300 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         {selectedRows.length > 1 && (
//           <Button variant="contained" color="error" onClick={handleDeleteAll}>
//             Delete Selected
//           </Button>
//         )}
//       </div>

//       {/* Table */}
//       <Box sx={{ mt: 3 }}>
//         <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                 <TableCell sx={{ color: 'white' }} padding="checkbox">
//                   <Checkbox
//                     sx={{
//                       color: '#fff',
//                       '&.Mui-checked': { color: '#fff' },
//                     }}
//                     checked={selectedRows.length === userData.length && userData.length > 0}
//                     indeterminate={selectedRows.length > 0 && selectedRows.length < userData.length}
//                     onChange={handleSelectAll}
//                   />
//                 </TableCell>
//                 <TableCell sx={{ color: 'white' }}>Category Name</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Department Name</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Department Email</TableCell>
//                 <TableCell sx={{ color: 'white' }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={5} height={200} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedUsers.map((user, index) => (
//                   <TableRow key={index} hover role="checkbox" tabIndex={-1}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedRows.includes(user.id)}
//                         onChange={() => handleRowSelect(user.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.department}</TableCell>
//                     <TableCell>{user.department_email}</TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleEdit(user)} sx={{
//                         '& .MuiSvgIcon-root': {
//                           transition: 'color 0.3s ease',
//                         }
//                       }}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={() => handleDelete(user.id)} sx={{
//                         '& .MuiSvgIcon-root': {
//                           transition: 'color 0.3s ease',
//                         }
//                       }}>
//                         <DeleteIcon color="error" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={userData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//         />
//       </Box>

//       {/* Edit Modal */}
//       <Dialog open={editModal} onClose={() => setEditModal(false)}>
//         <DialogTitle>Edit Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Category Name"
//             fullWidth
//             value={selectedData?.name || ""}
//             onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Department Name"
//             fullWidth
//             value={selectedData?.department || ""}
//             onChange={(e) => setSelectedData({ ...selectedData, department: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Department Email"
//             fullWidth
//             value={selectedData?.department_email || ""}
//             onChange={(e) => setSelectedData({ ...selectedData, department_email: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditModal(false)}>Cancel</Button>
//           <Button variant="contained" onClick={() => {
//             console.log("Updated Data:", selectedData);
//             setEditModal(false);
//           }}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default SuperAdminProblemsofCategory;


import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TextField, InputAdornment, IconButton, CircularProgress,
  TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProblemCategory, getAllProblemCategory } from '../Services/categoryofproblem.services';
import { toast } from 'react-toastify';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import AddProblemCategoryTicket from '../Components/AddProblemCategoryTicket/AddProblemCategoryTicket';

function SuperAdminProblemsofCategory() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editModal, setEditModal] = useState(false);

  // delete confirmation state
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(""); // "single" | "multiple"
  const [deleteId, setDeleteId] = useState(null);

  const [deleteLoader, setDeleteLoader] = useState(false);
  const fetchAllUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllProblemCategory();
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUserData();
  }, [fetchAllUserData]);

  const handleRowSelect = (id) => {
    let newSelectedRows = [];
    if (selectedRows.includes(id)) {
      newSelectedRows = selectedRows.filter(rowId => rowId !== id);
    } else {
      newSelectedRows = [...selectedRows, id];
    }
    setSelectedRows(newSelectedRows);

    if (newSelectedRows.length === 1) {
      const selected = userData.find(user => user.id === newSelectedRows[0]);
      setSelectedData(selected);
    } else {
      setSelectedData(null);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === userData.length) {
      setSelectedRows([]);
      setSelectedData(null);
    } else {
      const allIds = userData.map(user => user.id);
      setSelectedRows(allIds);
      setSelectedData(null);
    }
  };

  const handleDelete = (id) => {
    setDeleteMode("single");
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDeleteAll = () => {
    setDeleteMode("multiple");
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    setDeleteLoader(true);
    if (deleteMode === "single") {
      const response = await deleteProblemCategory(deleteId)
      if (response.status === 200) {
        toast.success("delete successfully")
        fetchAllUserData();
        setDeleteLoader(false);
        setDeleteId(null)
        setSelectedRows([])

      }
      // console.log("Deleting single ID:", deleteId);
      // console.log("Deleting single ID:", response);
    } else if (deleteMode === "multiple") {
      const response = await deleteProblemCategory(selectedRows)
      if (response.status === 200) {
        setSelectedRows([])
        setDeleteId(null)
        toast.success("delete successfully")
        fetchAllUserData();
        setDeleteLoader(false);
      }
      // console.log("Deleting multiple IDs:", selectedRows);
    }
    setDeleteModal(false);
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setEditModal(true);
  };

  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container">
      <BasicBreadcrumbs name="Category Of Problems" />
      <div className="">
        <h4>Category of Problems</h4>
        <AddProblemCategoryTicket fetchCategory={fetchAllUserData} />
      </div>

      {/* Search + Bulk Delete */}
      <div className="d-flex align-items-center my-3" style={{ gap: "10px" }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        {selectedRows.length > 1 && (
          <Button variant="contained" color="error" onClick={handleDeleteAll}>
            Delete Selected
          </Button>
        )}
      </div>

      {/* Table */}
      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                <TableCell sx={{ color: 'white' }} padding="checkbox">
                  <Checkbox
                    sx={{
                      color: '#fff',
                      '&.Mui-checked': { color: '#fff' },
                    }}
                    checked={selectedRows.length === userData.length && userData.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < userData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>Category Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Department Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Department Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} height={200} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user, index) => (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleRowSelect(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.department_email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(user)} sx={{
                        '& .MuiSvgIcon-root': {
                          transition: 'color 0.3s ease',
                        }
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)} sx={{
                        '& .MuiSvgIcon-root': {
                          transition: 'color 0.3s ease',
                        }
                      }}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>

      {/* Edit Modal */}
      <Dialog open={editModal} onClose={() => setEditModal(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            fullWidth
            value={selectedData?.name || ""}
            onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department Name"
            fullWidth
            value={selectedData?.department || ""}
            onChange={(e) => setSelectedData({ ...selectedData, department: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department Email"
            fullWidth
            value={selectedData?.department_email || ""}
            onChange={(e) => setSelectedData({ ...selectedData, department_email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            console.log("Updated Data:", selectedData);
            setEditModal(false);
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteMode === "single"
            ? "Are you sure you want to delete this category?"
            : "Are you sure you want to delete all selected categories?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuperAdminProblemsofCategory;
