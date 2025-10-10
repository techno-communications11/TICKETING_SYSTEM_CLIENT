import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField,
    InputAdornment, IconButton, Menu, Dialog, DialogTitle, DialogContent,
    DialogActions,
    CircularProgress,
    TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { deleteMultipleUserServices, deleteUserServices, getAllUser, getAllUsers } from '../Services/auth.services';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddUserCompo from './AddUserCompo';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EditUserCompo from '../SuperAdminComponent/EditUserCompo';
import ExportUsers from '../SuperAdminComponent/ExportUsers';
function SuperAdminManageUser() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [selectedMarkets, setSelectedMarkets] = useState([]);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [openResetModal, setOpenResetModal] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [departments] = useState([
        "COO", "DCO", "SuperAdmin", "Admin", "Admin / IT", "Admin Manager", "Senior Manager", "Market Manager", "District Manager", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Internal",
        "Reporting", "Inventory", "Maintenance", "Sales", "Commission", "Compliance", "MIS",
        "AR", "Employee", "Store", "Managment", "SCM", "QA", "Vigilence", "MIS", "CMG", "Data Analytics", "Supervisor", "Local IT"
    ]);
    const [markets] = useState(["ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY", "EAST BAY AREA", "ATLANTA", "NORTH BAY AREA", "OXNARD/PALMDALE", "NORTH CAROL", "CHARLOTTE", "TEXAS"]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [paginatedUsers, setPaginatedUsers] = useState([]);

    const fetchAllUserData = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllUsers();
            const response2 = await getAllUser();
            setUserData(response2.data.data);
            // console.log(response2.data.data);
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
            const allIds = userData.map(user => user._id);
            setSelectedRows(allIds);
            setSelectedData(null);
        }
    };

    const handlePermissions = (user) => {
        console.log("Manage permissions for:", user);
    };

    const handleDelete = async (id) => {
        console.log(id)
        setDeleteId(id);
        setConfirmed(true);
    };

    const confirmDelete = async () => {
        setDeleteLoader(true)
        try {
            // console.log(deleteId)
            const response = await deleteUserServices(deleteId);
            fetchAllUserData();
        } catch (error) {
            console.log("Error deleting user:", error);
        } finally {
            setSelectedRows([]);
            setDeleteLoader(false);
            setConfirmed(false);
        }
    }


    const handleDeleteAll = async () => {
        try {
            // console.log("Delete all selected users:", selectedRows);
            // setDeleteId(selectedRows);
            // setConfirmed(true);
            const resposne = await deleteMultipleUserServices(selectedRows);
            fetchAllUserData();
            console.log(resposne)
        } catch (error) {
            console.log("ERROR", error.message)
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const filteredUsers = userData.filter(user =>
    //     (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    //     (departmentFilter === "" || user.department === departmentFilter) &&
    //     (status === "" || user.status === departmentFilter) ||
    //     (selectedMarkets === "" || user.market == selectedMarkets)
    // );

    // const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    useEffect(() => {
        const timeout = setTimeout(() => {
            let filtered = [...userData];

            // ✅ Search filter (name or email)
            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(user =>
                    user.name?.toLowerCase().includes(term) ||
                    user.email?.toLowerCase().includes(term)||
                    user.doorcode?.toLowerCase().includes(term)
                );
            }

            // ✅ Department filter
            if (departmentFilter) {
                filtered = filtered.filter(
                    user => user.department?.toLowerCase() === departmentFilter.toLowerCase()
                );
            }

            // ✅ Status filter (if you want to use it later)
            if (status) {
                filtered = filtered.filter(
                    user => user.status?.toLowerCase() === status.toLowerCase()
                );
            }

            // ✅ Market filter — only apply when department is Market Manager / District Manager / Store
            if (
                (departmentFilter === "Market Manager" ||
                    departmentFilter === "District Manager" ||
                    departmentFilter === "Store") &&
                selectedMarkets &&
                selectedMarkets !== ""
            ) {
                filtered = filtered.filter(
                    user =>
                        user.market?.toLowerCase() === selectedMarkets?.toLowerCase() ||
                        user.markets?.toLowerCase() === selectedMarkets?.toLowerCase()
                );
            }

            // ✅ Pagination
            const paginated = filtered.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            );

            setFilteredUsers(filtered); // optional if you want to export
            setPaginatedUsers(paginated);
        }, 300);

        return () => clearTimeout(timeout);
    }, [userData, searchTerm, departmentFilter, status, selectedMarkets, page, rowsPerPage]);


    return (
        <div className="container-fluid">
            <BasicBreadcrumbs name={"Manage Agents"} />
            {selectedRows.length > 0 && (
                <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
                    {selectedRows.length === 1 ? '' : (
                        <>
                            <div>{selectedRows.length} users selected</div>
                            <Button variant="contained" color="error" onClick={handleDeleteAll}>Delete All</Button>
                        </>
                    )}
                </div>
            )}
            <div className="row my-4">
                <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
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
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Department</InputLabel>
                            <Select value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                label="Department">
                                <MenuItem value="">All</MenuItem>
                                {departments.map((dept, index) => (
                                    <MenuItem key={index} value={dept}>{dept}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {
                            (departmentFilter === "Market Manager" || departmentFilter === "District Manager" || departmentFilter === "Store") && (
                                <FormControl size="small" sx={{ minWidth: 200 }}>
                                    <InputLabel>Markets</InputLabel>
                                    <Select
                                        value={selectedMarkets}
                                        onChange={(e) => setSelectedMarkets(e.target.value)}
                                        label="Markets">
                                        <MenuItem value="">All</MenuItem>
                                        {markets.map((dept, index) => (
                                            <MenuItem key={index} value={dept}>{dept}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        }
                        {/* <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="In-active">In-active</MenuItem>
                                <MenuItem value="Blocked">Blocked</MenuItem>
                            </Select>
                        </FormControl> */}
                        <AddUserCompo fetchAllUserData={fetchAllUserData} />
                        <ExportUsers userData={filteredUsers} />
                    </div>
                </div>
            </div>
            <Box sx={{ mt: 3 }}>
                {selectedRows.length > 0 && selectedRows.length === 1 && (
                    <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
                        <div className='d-flex'>
                            {/* <IconButton onClick={() => handleEdit(selectedData)} sx={{
                                '& .MuiSvgIcon-root': {
                                    transition: 'color 0.3s ease',
                                }
                            }}>
                                <EditIcon color='black' />
                            </IconButton> */}
                            <EditUserCompo selectedRows={selectedRows} fetchAllUserData={fetchAllUserData} />
                            <IconButton onClick={() => handleDelete(selectedData.id)} sx={{
                                '& .MuiSvgIcon-root': {
                                    transition: 'color 0.3s ease',
                                }
                            }}>
                                <DeleteIcon color='black' />
                            </IconButton>
                            <IconButton
                                onClick={(e) => setMenuAnchorEl(e.currentTarget)} sx={{
                                    '& .MuiSvgIcon-root': {
                                        transition: 'color 0.3s ease',
                                    }
                                }}
                            >
                                <MoreVertIcon color='black' />
                            </IconButton>
                        </div>
                    </div>
                )}

                <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={() => setMenuAnchorEl(null)}
                >
                    <MenuItem onClick={() => {
                        setOpenResetModal(true);
                        setMenuAnchorEl(null);
                    }}>Reset Password</MenuItem>
                    <MenuItem onClick={() => {
                        setOpenEmailModal(true);
                        setMenuAnchorEl(null);
                    }}>Change Email</MenuItem>
                    <MenuItem onClick={() => {
                        handlePermissions(selectedData);
                        setMenuAnchorEl(null);
                    }}>Permissions</MenuItem>
                    <MenuItem onClick={() => {
                        console.log("Settings clicked");
                        setMenuAnchorEl(null);
                    }}>Settings</MenuItem>
                </Menu>
                <Dialog open={confirmed} onClose={() => setConfirmed(false)}>
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#d32f2f' }}>
                        <WarningAmberIcon color="error" />
                        Confirm Deletion
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ py: 1, px: 0 }}>
                            Are you sure you want to delete this item? This action cannot be undone.
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmed(false)} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={confirmDelete}
                        >
                            {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenResetModal(false)}>Cancel</Button>
                        <Button variant="contained" onClick={() => {
                            // TODO: Reset password logic
                            setOpenResetModal(false);
                        }}>Reset</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openEmailModal} onClose={() => setOpenEmailModal(false)}>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Email"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEmailModal(false)}>Cancel</Button>
                        <Button variant="contained" onClick={() => {
                            setOpenEmailModal(false);
                        }}>Update</Button>
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
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
                                        checked={selectedRows.length === userData.length && userData.length > 0}
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < userData.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                                <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                                <TableCell sx={{ color: 'white' }}>Department</TableCell>
                                {/* {user.department === "SuperAdmin" ? "" : <TableCell sx={{ color: 'white' }}>Role</TableCell>} */}
                                <TableCell sx={{ color: 'white' }}>Market</TableCell>
                                <TableCell sx={{ color: 'white' }}>Role</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading ? <TableRow>
                                    <TableCell colSpan={7} height={200} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow> : (
                                    <>
                                        {paginatedUsers.map((user, index) => (
                                            <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectedRows.includes(user.id)}
                                                        onChange={() => handleRowSelect(user.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phone}</TableCell>
                                                <TableCell>{user.department}</TableCell>
                                                <TableCell>{user.markets || user.market || "-"}</TableCell>
                                                <TableCell>{user.subDepartment || "-"}</TableCell>
                                                <TableCell>{user.isActive ? "Active" : "Un-active"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    );
}

export default SuperAdminManageUser;
