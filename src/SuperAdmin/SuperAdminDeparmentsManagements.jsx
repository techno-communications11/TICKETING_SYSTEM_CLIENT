import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, TextField, InputAdornment, IconButton, CircularProgress,
  TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import SuperAdminAddDepartments from '../SuperAdminComponent/SuperAdminAddDepartments';
import { deleteDepartmentServices, getAllDepartmentsServices, updateDepartmentServices } from '../Services/departments.services';

function SuperAdminDepartmentsManagement() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [editLoader, setEditLoader] = useState(false);
  const fetchAllDepartmentsData = useCallback(async () => {
    try {
      const response = await getAllDepartmentsServices();
      setDepartments(response.data.data);
    } catch (error) {
      console.log("Error", error.message);
    }
  }, [])
  useEffect(() => {
    setLoading(true);
    fetchAllDepartmentsData().finally(() => setLoading(false));
  }, [fetchAllDepartmentsData]);

  const handleRowSelect = (id) => {
    let newSelectedRows = [];
    if (selectedRows.includes(id)) {
      newSelectedRows = selectedRows.filter(rowId => rowId !== id);
    } else {
      newSelectedRows = [...selectedRows, id];
    }
    setSelectedRows(newSelectedRows);

    if (newSelectedRows.length === 1) {
      const selected = departments.find(dep => dep.id === newSelectedRows[0]);
      setSelectedData(selected);
    } else {
      setSelectedData(null);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === departments.length) {
      setSelectedRows([]);
      setSelectedData(null);
    } else {
      const allIds = departments.map(dep => dep.id);
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

  const confirmDelete = () => {
    setDeleteLoader(true);
    setTimeout(async () => {
      if (deleteMode === "single") {
        // console.log(deleteId)
        try {
          const response = await deleteDepartmentServices(deleteId);
          if (response.data.status === 200) {
            toast.success("Department deleted successfully");
            fetchAllDepartmentsData()
            setDeleteLoader(false);
          }
        } catch (error) {
          setDeleteLoader(false);
          console.log("error", error.message)
        }
      } else {
        console.log(deleteId)
        toast.success("Selected departments deleted successfully");
      }
      setDeleteLoader(false);
      setDeleteModal(false);
      setSelectedRows([]);
      setDeleteId(null);
    }, 700);
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setEditModal(true);
  };

  const handleEditBtn = async (data) => {
    setEditLoader(true);
    try {
      if (!data?.id || !data?.name || !data?.email) {
        setEditLoader(false);
        toast.error("Please fill in all required fields before saving.");
        return;
      }
      const response = await updateDepartmentServices(data.id, data);
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Department updated successfully.");
        fetchAllDepartmentsData();
        setEditModal(false);
        setEditLoader(false);
      }
      else {
        setEditLoader(false);
        toast.error(response?.data?.message || "Failed to update department.");
        console.warn("Backend responded with failure:", response?.data);
      }
    } catch (error) {
      console.error("❌ Error while updating department:", error.message);
      if (error.response) {
        setEditLoader(false);
        const status = error.response.status;
        const msg = error.response.data?.message || "Unexpected server error.";
        if (status === 400) toast.error("Invalid request — please check your input.");
        else if (status === 404) toast.error("Department not found.");
        else if (status === 500) toast.error("Internal server error. Try again later.");
        else toast.error(msg);
      } else if (error.request) {
        setEditLoader(false);
        toast.error("No response from server. Please check your internet connection.");
      } else {
        setEditLoader(false);
        toast.error("Unexpected error while updating department.");
      }
    }
  };

  const filteredDepartments = departments.filter(dep =>
    dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dep.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedDepartments = [...filteredDepartments].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const paginatedDepartments = sortedDepartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <div className="container-fluid">
      <BasicBreadcrumbs name="Manage Departments" />
      <div className="d-flex justify-content-between align-items-center">
        <h4>Manage Departments</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <SuperAdminAddDepartments fetchAllDepartmentsData={fetchAllDepartmentsData} />
        </div>
      </div>
      {/* Search + Bulk Delete */}
      <div className="d-flex align-items-center my-3" style={{ gap: "10px" }}>
        <TextField
          size="small"
          placeholder="Search departments..."
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
                    checked={selectedRows.length === departments.length && departments.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < departments.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>Department Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Department Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // 1️⃣ Jab tak loading true hai, loader show hoga
                <TableRow>
                  <TableCell colSpan={4} height={200} align="center">
                    <CircularProgress />
                    <div style={{ marginTop: "10px" }}>Loading departments...</div>
                  </TableCell>
                </TableRow>
              ) : filteredDepartments.length === 0 ? (
                // 2️⃣ Agar data empty hai to "No Data Found" show karega
                <TableRow>
                  <TableCell colSpan={4} height={200} align="center">
                    No Departments Found
                  </TableCell>
                </TableRow>
              ) : (
                // 3️⃣ Agar data available hai to show karega
                paginatedDepartments.map((dep, index) => (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(dep.id)}
                        onChange={() => handleRowSelect(dep.id)}
                      />
                    </TableCell>
                    <TableCell>{dep.name}</TableCell>
                    <TableCell>{dep.email || "-"}</TableCell>
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
                        onClick={() => handleEdit(dep)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{
                          '& .MuiSvgIcon-root': {
                            transition: 'color 0.3s ease',
                          },
                        }}
                        onClick={() => handleDelete(dep.id)}
                      >
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
          count={departments.length}
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
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Department Name"
            fullWidth
            value={selectedData?.name || ""}
            onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department Email"
            fullWidth
            value={selectedData?.email || ""}
            onChange={(e) => setSelectedData({ ...selectedData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModal(false)}>Cancel</Button>
          <Button
            disabled={editLoader}
            variant="contained"
            onClick={() => {
              handleEditBtn(selectedData)
            }}
          >
            {editLoader ? <CircularProgress size={25} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteMode === "single"
            ? "Are you sure you want to delete this department?"
            : "Are you sure you want to delete all selected departments?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button disabled={deleteLoader} variant="contained" color="error" onClick={confirmDelete}>
            {deleteLoader ? <CircularProgress size={25} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuperAdminDepartmentsManagement;
