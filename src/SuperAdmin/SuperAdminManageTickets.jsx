import React, { useCallback, useEffect, useState } from 'react';
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
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Tooltip,
  Button,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ThumbDown as ThumbDownIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Replay as ReplayIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { deleteTicketServices, getalltickets } from '../Services/tickets.services';
import { useNavigate } from 'react-router-dom';
import SuperAdminCreateTicket from './SuperAdminCreateTicket';
import RefreshIcon from "@mui/icons-material/Refresh";

function SuperAdminManageTickets() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [deleteLoader, setDeleteLoader] = useState(false)
  const navigate = useNavigate()

  const fetchAllTickets = useCallback(async () => {
    try {
      const response = await getalltickets();
      setTickets(response.data.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllTickets();
  }, [fetchAllTickets]);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tickets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tickets.map((ticket) => ticket.id));
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const filteredTickets = tickets.filter((ticket) =>
    Object.values(ticket).some(
      (val) =>
        typeof val === 'string' &&
        val.toLowerCase().includes(searchQuery)
    )
  );

  const deletesTicketsBttn = async () => {
    setDeleteLoader(true);
    try {
      const response = await deleteTicketServices(selectedRows);
      setDeleteLoader(false);
      fetchAllTickets()
      setSelectedRows([]);
      console.log("Response", response)
    } catch (error) {
      setDeleteLoader(false);
      console.log("ERROR", error.message);
    }
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTickets.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container my-4 py-3">
      <BasicBreadcrumbs name={'Manage Tickets'} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Typography variant="h6" className="mb-3">
          Manage Tickets
        </Typography>
        <div className="d-flex align-items-center">
          <IconButton
            onClick={() => fetchAllTickets()}
            sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
          <SuperAdminCreateTicket fetchTickets={fetchAllTickets} />
        </div>
      </div>

      <TextField
        size="small"
        placeholder="Search..."
        value={searchQuery}
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

      {selectedRows.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            backgroundColor: '#f5f5f5',
            padding: 2,
            borderRadius: 1,
            my: 2,
          }}
        >
          <Typography variant="subtitle1">{selectedRows.length} selected</Typography>

          <Tooltip title="Edit">
            <IconButton onClick={() => console.log('Edit', selectedRows)} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => deletesTicketsBttn()} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }} disabled={deleteLoader} >
              {deleteLoader ? <CircularProgress size={25} /> : <DeleteIcon color="primary" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Deny">
            <IconButton onClick={() => console.log('Denied', selectedRows)} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}>
              <ThumbDownIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Approve">
            <IconButton onClick={() => console.log('Approved', selectedRows)} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}>
              <CheckCircleIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reject">
            <IconButton onClick={() => console.log('Rejected', selectedRows)} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}>
              <CancelIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Re-Open">
            <IconButton onClick={() => console.log('Re-Opened', selectedRows)} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}>
              <ReplayIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
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
                    checked={selectedRows.length === tickets.length && tickets.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < tickets.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>Ticket ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                <TableCell sx={{ color: 'white' }}>Creator Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                <TableCell sx={{ color: 'white' }}>Solved By</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.length > 0 ? (
                currentRows.map((ticket) => (
                  <TableRow key={ticket.id} hover sx={{ cursor: 'pointer' }} >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(ticket.id)}
                        onChange={() => handleRowSelect(ticket.id)}
                      />
                    </TableCell>
                    <TableCell>{ticket.ticketId}</TableCell>
                    <TableCell>{ticket.priority}</TableCell>
                    <TableCell>{ticket.name}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{ticket.ticketDescription}</TableCell>
                    <TableCell>{ticket.assignerName || 'N/A'}</TableCell>
                    <TableCell>
                      <Button onClick={() => { navigate(`/superAdmin-review-tickets/${ticket.id}`) }} >View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} height={500} align="center">
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className="row d-flex justify-content-end align-items-center mt-3">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span>Show rows: </span>
              <select value={rowsPerPage} onChange={handleChangeRowsPerPage} style={{ marginLeft: 8, padding: 4 }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <Pagination
              count={Math.ceil(filteredTickets.length / rowsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default SuperAdminManageTickets;
