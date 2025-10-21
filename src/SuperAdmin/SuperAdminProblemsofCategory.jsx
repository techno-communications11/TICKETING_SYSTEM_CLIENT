// // import React, { useCallback, useEffect, useState } from 'react';
// // import {
// //   Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
// //   Paper, Checkbox, TextField, InputAdornment, IconButton, CircularProgress,
// //   TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import { deleteProblemCategory, getAllProblemCategory } from '../Services/categoryofproblem.services';
// // import { toast } from 'react-toastify';
// // import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
// // import AddProblemCategoryTicket from '../Components/AddProblemCategoryTicket/AddProblemCategoryTicket';

// // function SuperAdminProblemsofCategory() {
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedData, setSelectedData] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [userData, setUserData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);

// //   const [editModal, setEditModal] = useState(false);

// //   // delete confirmation state
// //   const [deleteModal, setDeleteModal] = useState(false);
// //   const [deleteMode, setDeleteMode] = useState(""); // "single" | "multiple"
// //   const [deleteId, setDeleteId] = useState(null);

// //   const [deleteLoader, setDeleteLoader] = useState(false);
// //   const fetchAllUserData = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const response = await getAllProblemCategory();
// //       setUserData(response.data.data);
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
// //       const allIds = userData.map(user => user.id);
// //       setSelectedRows(allIds);
// //       setSelectedData(null);
// //     }
// //   };

// //   const handleDelete = (id) => {
// //     setDeleteMode("single");
// //     setDeleteId(id);
// //     setDeleteModal(true);
// //   };

// //   const handleDeleteAll = () => {
// //     setDeleteMode("multiple");
// //     setDeleteModal(true);
// //   };

// //   const confirmDelete = async () => {
// //     setDeleteLoader(true);
// //     if (deleteMode === "single") {
// //       const response = await deleteProblemCategory(deleteId)
// //       if (response.status === 200) {
// //         toast.success("delete successfully")
// //         fetchAllUserData();
// //         setDeleteLoader(false);
// //         setDeleteId(null)
// //         setSelectedRows([])

// //       }
// //       // console.log("Deleting single ID:", deleteId);
// //       // console.log("Deleting single ID:", response);
// //     } else if (deleteMode === "multiple") {
// //       const response = await deleteProblemCategory(selectedRows)
// //       if (response.status === 200) {
// //         setSelectedRows([])
// //         setDeleteId(null)
// //         toast.success("delete successfully")
// //         fetchAllUserData();
// //         setDeleteLoader(false);
// //       }
// //       // console.log("Deleting multiple IDs:", selectedRows);
// //     }
// //     setDeleteModal(false);
// //   };

// //   const handleEdit = (data) => {
// //     setSelectedData(data);
// //     setEditModal(true);
// //   };

// //   const filteredUsers = userData.filter(user =>
// //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     user.department_email.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// //   return (
// //     <div className="container">
// //       <BasicBreadcrumbs name="Category Of Problems" />
// //       <div className="d-flex justify-content-between align-items-center">
// //         <h4>Category of Problems</h4>
// //         <AddProblemCategoryTicket fetchCategory={fetchAllUserData} />
// //       </div>
// //       <div className="d-flex align-items-center my-3" style={{ gap: "10px" }}>
// //         <TextField
// //           size="small"
// //           placeholder="Search..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           sx={{ width: 300 }}
// //           InputProps={{
// //             endAdornment: (
// //               <InputAdornment position="end">
// //                 <IconButton>
// //                   <SearchIcon />
// //                 </IconButton>
// //               </InputAdornment>
// //             ),
// //           }}
// //         />
// //         {selectedRows.length > 1 && (
// //           <Button variant="contained" color="error" onClick={handleDeleteAll}>
// //             Delete Selected
// //           </Button>
// //         )}
// //       </div>
// //       <Box sx={{ mt: 3 }}>
// //         <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: '#6f2da8' }}>
// //                 <TableCell sx={{ color: 'white' }} padding="checkbox">
// //                   <Checkbox
// //                     sx={{
// //                       color: '#fff',
// //                       '&.Mui-checked': { color: '#fff' },
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
// //               {loading ? (
// //                 <TableRow>
// //                   <TableCell colSpan={5} height={200} align="center">
// //                     <CircularProgress />
// //                   </TableCell>
// //                 </TableRow>
// //               ) : (
// //                 paginatedUsers.map((user, index) => (
// //                   <TableRow key={index} hover role="checkbox" tabIndex={-1}>
// //                     <TableCell padding="checkbox">
// //                       <Checkbox
// //                         checked={selectedRows.includes(user.id)}
// //                         onChange={() => handleRowSelect(user.id)}
// //                       />
// //                     </TableCell>
// //                     <TableCell>{user.name}</TableCell>
// //                     <TableCell>{user.department}</TableCell>
// //                     <TableCell>{user.department_email}</TableCell>
// //                     <TableCell>
// //                       <IconButton onClick={() => handleEdit(user)} sx={{
// //                         '& .MuiSvgIcon-root': {
// //                           transition: 'color 0.3s ease',
// //                         }
// //                       }}>
// //                         <EditIcon />
// //                       </IconButton>
// //                       <IconButton onClick={() => handleDelete(user.id)} sx={{
// //                         '& .MuiSvgIcon-root': {
// //                           transition: 'color 0.3s ease',
// //                         }
// //                       }}>
// //                         <DeleteIcon color="error" />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={userData.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={(e, newPage) => setPage(newPage)}
// //           onRowsPerPageChange={(e) => {
// //             setRowsPerPage(parseInt(e.target.value, 10));
// //             setPage(0);
// //           }}
// //         />
// //       </Box>

// //       {/* Edit Modal */}
// //       <Dialog open={editModal} onClose={() => setEditModal(false)}>
// //         <DialogTitle>Edit Category</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             margin="dense"
// //             label="Category Name"
// //             fullWidth
// //             value={selectedData?.name || ""}
// //             onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Department Name"
// //             fullWidth
// //             value={selectedData?.department || ""}
// //             onChange={(e) => setSelectedData({ ...selectedData, department: e.target.value })}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Department Email"
// //             fullWidth
// //             value={selectedData?.department_email || ""}
// //             onChange={(e) => setSelectedData({ ...selectedData, department_email: e.target.value })}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setEditModal(false)}>Cancel</Button>
// //           <Button variant="contained" onClick={() => {
// //             console.log("Updated Data:", selectedData);
// //             setEditModal(false);
// //           }}>Save</Button>
// //         </DialogActions>
// //       </Dialog>
// //       <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
// //         <DialogTitle>Confirm Delete</DialogTitle>
// //         <DialogContent>
// //           {deleteMode === "single"
// //             ? "Are you sure you want to delete this category?"
// //             : "Are you sure you want to delete all selected categories?"}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
// //           <Button variant="contained" color="error" onClick={confirmDelete}>
// //             {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </div>
// //   );
// // }

// // export default SuperAdminProblemsofCategory;


// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Checkbox, TextField, InputAdornment, IconButton, CircularProgress,
//   TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { deleteProblemCategory, getAllProblemCategory } from "../Services/categoryofproblem.services";
// import { toast } from "react-toastify";
// import BasicBreadcrumbs from "../Components/BasicBreadcrumbs/BasicBreadcrumbs";
// import AddProblemCategoryTicket from "../Components/AddProblemCategoryTicket/AddProblemCategoryTicket";

// function SuperAdminProblemsofCategory() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedData, setSelectedData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [editModal, setEditModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [deleteMode, setDeleteMode] = useState("");
//   const [deleteId, setDeleteId] = useState(null);
//   const [deleteLoader, setDeleteLoader] = useState(false);

//   // ✅ Fetch All Categories
//   const fetchAllUserData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getAllProblemCategory();
//       setUserData(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to fetch categories");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllUserData();
//   }, [fetchAllUserData]);

//   // ✅ Select / Deselect Rows
//   const handleRowSelect = (id) => {
//     let newSelectedRows = [];
//     if (selectedRows.includes(id)) {
//       newSelectedRows = selectedRows.filter((rowId) => rowId !== id);
//     } else {
//       newSelectedRows = [...selectedRows, id];
//     }
//     setSelectedRows(newSelectedRows);
//     if (newSelectedRows.length === 1) {
//       const selected = userData.find((user) => user.id === newSelectedRows[0]);
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
//       const allIds = userData.map((user) => user.id);
//       setSelectedRows(allIds);
//       setSelectedData(null);
//     }
//   };

//   // ✅ Delete Single or Multiple
//   const handleDelete = (id) => {
//     setDeleteMode("single");
//     setDeleteId(id);
//     setDeleteModal(true);
//   };

//   const handleDeleteAll = () => {
//     setDeleteMode("multiple");
//     setDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     setDeleteLoader(true);
//     try {
//       if (deleteMode === "single") {
//         const response = await deleteProblemCategory(deleteId);
//         if (response.status === 200) {
//           toast.success("Category deleted successfully");
//         }
//       } else if (deleteMode === "multiple") {
//         const response = await deleteProblemCategory(selectedRows);
//         if (response.status === 200) {
//           toast.success("Selected categories deleted successfully");
//         }
//       }
//       await fetchAllUserData();
//       setSelectedRows([]);
//       setDeleteId(null);
//     } catch (error) {
//       console.error("Delete Error:", error);
//       toast.error("Error deleting category");
//     } finally {
//       setDeleteLoader(false);
//       setDeleteModal(false);
//     }
//   };

//   const handleEdit = (data) => {
//     setSelectedData(data);
//     setEditModal(true);
//   };

//   // ✅ Filter Logic
//   const filteredUsers = userData.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.department_email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedUsers = filteredUsers.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div className="container">
//       <BasicBreadcrumbs name="Category Of Problems" />
//       <h4>Category of Problems</h4>

//       {/* 🔍 Search + Bulk Delete */}
//       <div className="d-flex justify-content-between align-items-center my-3" style={{ gap: "10px" }}>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 300 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   sx={{
//                     '& .MuiSvgIcon-root': {
//                       transition: 'color 0.3s ease',
//                     },
//                   }}
//                 >
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <div className="d-flex align-items-center" style={{ gap: "0px 10px" }}>
//           {selectedRows.length > 1 && (
//             <Button variant="contained" color="error" onClick={handleDeleteAll}>
//               Delete Selected ({selectedRows.length})
//             </Button>
//           )}
//           <AddProblemCategoryTicket fetchCategory={fetchAllUserData} />
//         </div>
//       </div>
//       <Box sx={{ mt: 3 }}>
//         <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#6f2da8" }}>
//                 <TableCell sx={{ color: "white" }} padding="checkbox">
//                   <Checkbox
//                     sx={{
//                       color: "#fff",
//                       "&.Mui-checked": { color: "#fff" },
//                     }}
//                     checked={
//                       selectedRows.length === userData.length && userData.length > 0
//                     }
//                     indeterminate={
//                       selectedRows.length > 0 &&
//                       selectedRows.length < userData.length
//                     }
//                     onChange={handleSelectAll}
//                   />
//                 </TableCell>
//                 <TableCell sx={{ color: "white" }}>Category Name</TableCell>
//                 <TableCell sx={{ color: "white" }}>Department Name</TableCell>
//                 <TableCell sx={{ color: "white" }}>Department Email</TableCell>
//                 <TableCell sx={{ color: "white" }}>Action</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={5} height={200} align="center">
//                     <CircularProgress />
//                     <div style={{ marginTop: "10px" }}>Loading categories...</div>
//                   </TableCell>
//                 </TableRow>
//               ) : filteredUsers.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} height={200} align="center">
//                     No Categories Found
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
//                       <IconButton
//                         sx={{
//                           '& .MuiSvgIcon-root': {
//                             transition: 'color 0.3s ease',
//                           },
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.querySelector('.MuiSvgIcon-root').style.color = '#6f2da8';
//                         }}
//                         onClick={() => handleEdit(user)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           '& .MuiSvgIcon-root': {
//                             transition: 'color 0.3s ease',
//                           },
//                         }}

//                         onClick={() => handleDelete(user.id)}>
//                         <DeleteIcon color="error" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Pagination */}
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredUsers.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//         />
//       </Box>

//       {/* ✏️ Edit Modal */}
//       <Dialog open={editModal} onClose={() => setEditModal(false)}>
//         <DialogTitle>Edit Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Category Name"
//             fullWidth
//             value={selectedData?.name || ""}
//             onChange={(e) =>
//               setSelectedData({ ...selectedData, name: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Department Name"
//             fullWidth
//             value={selectedData?.department || ""}
//             onChange={(e) =>
//               setSelectedData({ ...selectedData, department: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Department Email"
//             fullWidth
//             value={selectedData?.department_email || ""}
//             onChange={(e) =>
//               setSelectedData({
//                 ...selectedData,
//                 department_email: e.target.value,
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditModal(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={() => {
//               console.log("Updated Data:", selectedData);
//               toast.success("Category updated (dummy)");
//               setEditModal(false);
//             }}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* 🗑️ Delete Confirmation Modal */}
//       <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           {deleteMode === "single"
//             ? "Are you sure you want to delete this category?"
//             : "Are you sure you want to delete all selected categories?"}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={confirmDelete}
//             disabled={deleteLoader}
//           >
//             {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default SuperAdminProblemsofCategory;


import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TextField, InputAdornment, IconButton, CircularProgress,
  TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProblemCategory, getAllProblemCategory, updateProblemCategory } from "../Services/categoryofproblem.services";
import { getAllDepartmentsServices } from "../Services/departments.services"; // 👈 import added
import { toast } from "react-toastify";
import BasicBreadcrumbs from "../Components/BasicBreadcrumbs/BasicBreadcrumbs";
import AddProblemCategoryTicket from "../Components/AddProblemCategoryTicket/AddProblemCategoryTicket";

function SuperAdminProblemsofCategory() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [departments, setDepartments] = useState([]); // 👈 departments state
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState(false)

  const fetchAllUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllProblemCategory();
      setUserData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await getAllDepartmentsServices();
      setDepartments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to fetch departments");
    }
  }, []);

  useEffect(() => {
    fetchAllUserData();
    fetchDepartments(); // 👈 fetch departments on mount
  }, [fetchAllUserData, fetchDepartments]);

  // ✅ Row Selection
  const handleRowSelect = (id) => {
    let newSelectedRows = [];
    if (selectedRows.includes(id)) {
      newSelectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      newSelectedRows = [...selectedRows, id];
    }
    setSelectedRows(newSelectedRows);
    if (newSelectedRows.length === 1) {
      const selected = userData.find((user) => user.id === newSelectedRows[0]);
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
      const allIds = userData.map((user) => user.id);
      setSelectedRows(allIds);
      setSelectedData(null);
    }
  };

  // ✅ Delete Logic
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
    try {
      if (deleteMode === "single") {
        const response = await deleteProblemCategory(deleteId);
        if (response.status === 200) toast.success("Category deleted successfully");
      } else if (deleteMode === "multiple") {
        const response = await deleteProblemCategory(selectedRows);
        if (response.status === 200) toast.success("Selected categories deleted successfully");
      }
      await fetchAllUserData();
      setSelectedRows([]);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Error deleting category");
    } finally {
      setDeleteLoader(false);
      setDeleteModal(false);
    }
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setEditModal(true);
  };

  const handleUpdateBtn = async () => {
    setCategoryLoader(true)
    try {
      const response = await updateProblemCategory(selectedData.id, selectedData)
      if (response.data.status === 200) {
        setCategoryLoader(false)
        toast.success("Category updated");
        setEditModal(false);
        await fetchAllUserData();
      }
    } catch (error) {
      setCategoryLoader(false)
      console.log("ERROR", error.message)
      toast.error(error.message);
    }
  }
  // ✅ Filter
  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container">
      <BasicBreadcrumbs name="Category Of Problems" />
      <h4>Category of Problems</h4>

      {/* 🔍 Search + Bulk Delete */}
      <div className="d-flex justify-content-between align-items-center my-3" style={{ gap: "10px" }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    '& .MuiSvgIcon-root': {
                      transition: 'color 0.3s ease',
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          {selectedRows.length > 1 && (
            <Button variant="contained" color="error" onClick={handleDeleteAll}>
              Delete Selected ({selectedRows.length})
            </Button>
          )}
          <AddProblemCategoryTicket fetchCategory={fetchAllUserData} />
        </div>
      </div>

      {/* ✅ Table Section */}
      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#6f2da8" }}>
                <TableCell sx={{ color: "white" }} padding="checkbox">
                  <Checkbox
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": { color: "#fff" },
                    }}
                    checked={
                      selectedRows.length === userData.length && userData.length > 0
                    }
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < userData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: "white" }}>#</TableCell> {/* ✅ Sequence Number */}
                <TableCell sx={{ color: "white" }}>Category Name</TableCell>
                <TableCell sx={{ color: "white" }}>Department Name</TableCell>
                <TableCell sx={{ color: "white" }}>Department Email</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" height={200}>
                    <CircularProgress />
                    <div style={{ marginTop: "10px" }}>Loading categories...</div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" height={200}>
                    No Categories Found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user, index) => (
                  <TableRow key={user.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleRowSelect(user.id)}
                      />
                    </TableCell>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell> {/* ✅ Serial Number */}
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.department_email}</TableCell>
                    <TableCell>
                      <IconButton
                        sx={{
                          '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                          },
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.querySelector('.MuiSvgIcon-root').style.color = '#6f2da8';
                        }}
                        onClick={() => handleEdit(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{
                          '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                          },
                        }}
                        onClick={() => handleDelete(user.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>

      <Dialog open={editModal} onClose={() => setEditModal(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            fullWidth
            value={selectedData?.name || ""}
            onChange={(e) =>
              setSelectedData({ ...selectedData, name: e.target.value })
            }
          />

          {/* 🔽 Department Dropdown */}
          <TextField
            margin="dense"
            label="Select Department"
            fullWidth
            select
            value={selectedData?.department || ""}
            onChange={(e) => {
              const selectedDeptName = e.target.value;
              const selectedDept = departments.find(
                (d) => d.name === selectedDeptName
              );

              setSelectedData({
                ...selectedData,
                department: selectedDeptName,
                department_email: selectedDept?.email,
              });
            }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </TextField>

          {/* 📨 Auto-filled Department Email */}
          <TextField
            margin="dense"
            label="Department Email"
            fullWidth
            value={selectedData?.department_email || ""}
            disabled
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditModal(false)}>Cancel</Button>
          <Button
            disabled={categoryLoader}
            variant="contained"
            onClick={() => {
              handleUpdateBtn(selectedData)
            }}
          >
            {categoryLoader ? <CircularProgress size={28} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🗑️ Delete Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteMode === "single"
            ? "Are you sure you want to delete this category?"
            : "Are you sure you want to delete all selected categories?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
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

export default SuperAdminProblemsofCategory;
