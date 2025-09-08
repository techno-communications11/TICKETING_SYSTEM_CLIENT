import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, Select, MenuItem, FormControl, InputLabel, TextField,
    InputAdornment, IconButton, Menu, Dialog, DialogTitle, DialogContent,
    DialogActions, CircularProgress, TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getAllUsers } from '../Services/auth.services';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddUserCompo from './AddUserCompo';

function SuperAdminManageUser() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [openResetModal, setOpenResetModal] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchAllUserData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
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
        const newSelectedRows = selectedRows.includes(id)
            ? selectedRows.filter(rowId => rowId !== id)
            : [...selectedRows, id];

        setSelectedRows(newSelectedRows);
        setSelectedData(newSelectedRows.length === 1
            ? userData.find(user => user._id === newSelectedRows[0])
            : null
        );
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

    const handleEdit = (user) => {
        console.log("Edit user:", user);
    };

    const handlePermissions = (user) => {
        console.log("Manage permissions for:", user);
    };

    const handleDelete = (id) => {
        console.log("Delete user with ID:", id);
    };

    const handleDeleteAll = () => {
        console.log("Delete all selected users:", selectedRows);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers = userData
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="container">
            <BasicBreadcrumbs name={"Agents"} />

            {selectedRows.length > 0 && (
                <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
                    {selectedRows.length > 1 && (
                        <>
                            <div>{selectedRows.length} users selected</div>
                            <Button variant="contained" color="error" onClick={handleDeleteAll}>Delete All</Button>
                        </>
                    )}
                </div>
            )}

            {/* Filters */}
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
                                            <SearchIcon sx={{ color: '#6f2da8' }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Department</InputLabel>
                            <Select label="Department">
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Inventory">Inventory</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                                <MenuItem value="Paused">Paused</MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                            </Select>
                        </FormControl>
                        <AddUserCompo fetchAllUserData={fetchAllUserData} />
                    </div>
                </div>
            </div>

            {/* Toolbar for single selection */}
            {selectedRows.length === 1 && (
                <div className="d-flex align-items-center justify-content-between my-3 p-3 bg-light border rounded">
                    <div>
                        <IconButton onClick={() => handleEdit(selectedData)}>
                            <EditIcon sx={{ color: '#6f2da8' }} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(selectedData._id)}>
                            <DeleteIcon sx={{ color: '#6f2da8' }} />
                        </IconButton>
                        <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                            <MoreVertIcon sx={{ color: '#6f2da8' }} />
                        </IconButton>
                    </div>
                </div>
            )}

            {/* Menu for single user */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={() => setMenuAnchorEl(null)}
            >
                <MenuItem onClick={() => { setOpenResetModal(true); setMenuAnchorEl(null); }}>Reset Password</MenuItem>
                <MenuItem onClick={() => { setOpenEmailModal(true); setMenuAnchorEl(null); }}>Change Email</MenuItem>
                <MenuItem onClick={() => { handlePermissions(selectedData); setMenuAnchorEl(null); }}>Permissions</MenuItem>
                <MenuItem onClick={() => { console.log("Settings clicked"); setMenuAnchorEl(null); }}>Settings</MenuItem>
            </Menu>

            {/* Reset Password Modal */}
            <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="New Password" type="password" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenResetModal(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenResetModal(false)}>Reset</Button>
                </DialogActions>
            </Dialog>

            {/* Change Email Modal */}
            <Dialog open={openEmailModal} onClose={() => setOpenEmailModal(false)}>
                <DialogTitle>Change Email</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="New Email" type="email" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEmailModal(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenEmailModal(false)}>Update</Button>
                </DialogActions>
            </Dialog>

            {/* Table */}
            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                    <Table stickyHeader>
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
                                <TableCell sx={{ color: 'white' }}>Role</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} height={200} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <TableRow key={user._id} hover role="checkbox">
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedRows.includes(user._id)}
                                                onChange={() => handleRowSelect(user._id)}
                                            />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.department}</TableCell>
                                        <TableCell>{user.subDepartment}</TableCell>
                                        <TableCell>{user.isActive ? "Active" : "Un-active"}</TableCell>
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
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    );
}

export default SuperAdminManageUser;
