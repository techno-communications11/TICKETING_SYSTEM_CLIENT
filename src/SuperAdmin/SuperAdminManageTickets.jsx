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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import cookies from "js-cookie";
import EditTickets from '../SuperAdminComponent/EditTickets';
import { getAllStores } from '../Services/stores.services';

function SuperAdminManageTickets() {
  const role = cookies.get("it")
  const [selectedRows, setSelectedRows] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate()
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Total");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartments] = useState("");
  const [storeName, setstoreName] = useState("");
  const [market, setMarket] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const marketsList = [
    "ALL MARKETS", "HO", "BOPK", "BOIN", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
    "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
    "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
    "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
  ];
  const [departments] = useState([
    "All", "HO", "BOPK", "BOIN", "Admin", "Admin / IT", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Reporting", "Inventory", "Maintenance", "Commission", "Compliance", "SCM", "QA", "Vigilence", "MIS", "Data Analytics", "Supervisor", "Local IT"
  ]);
  const [store, setStore] = useState('');
  const [stores, setStores] = useState([]);


  // "Internal", 
  const fetchAllTickets = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getalltickets();
      setTickets(response.data.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Error fetching tickets:', error);
    }
  }, []);

  const fetchAllStores = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getAllStores();
      const filteredStores = market ? response.filter((s) => s.market === market) : [];
      setStores(filteredStores);
      console.log(filteredStores);
      setLoader(false);
      setStore(''); // Reset store when market changes
    } catch (error) {
      setLoader(false);
      console.error('ERROR', error.message);
    } finally {
      setLoader(false);
    }
  }, [market]);
  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

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

  const deletesTicketsBttn = async () => {
    setDeleteLoader(true);
    try {
      await deleteTicketServices(selectedRows);
      setDeleteLoader(false);
      fetchAllTickets()
      setSelectedRows([]);
    } catch (error) {
      setDeleteLoader(false);
      console.log("ERROR", error.message);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      let filtered = [...tickets];
      switch (activeFilter) {
        case "Closed":
          filtered = filtered.filter(t => t.status === "closed");
          break;
        case "Complete":
          filtered = filtered.filter(t => t.status === "completed");
          break;
        case "Pending":
          filtered = filtered.filter(t => t.status === "pending");
          break;
        default:
          break;
      }

      if (priority) filtered = filtered.filter(t => t.priority === priority);
      if (status) filtered = filtered.filter(t => t.status === status.toLowerCase());
      if (department) filtered = filtered.filter(t => t.department === department);
      if (storeName) filtered = filtered.filter(t => t.store === storeName);
      if (market) filtered = filtered.filter(t => t.market === market);
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(t =>
          t.ticketId?.toLowerCase().includes(term) ||
          t.name?.toLowerCase().includes(term) ||
          t.ticketDescription?.toLowerCase().includes(term)
        );
      }
      // 👇 Add this to sort descending by createdAt (latest first)
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFilteredTickets(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [tickets, activeFilter, priority, status, market, searchTerm, department, stores]);

  function getTicketAge(createdAt) {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created; // difference in milliseconds

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    if (diffDays > 0) return `${diffDays}d ${diffHours}h ago`;
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m ago`;
    return `${diffMinutes}m ago`;
  }

  const reset = () => {
    fetchAllTickets()
    setDepartments('')
  }

  return (
    <div className="container-fluid my-4 py-3">
      <BasicBreadcrumbs name={'Manage Tickets'} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Typography variant="h6" className="mb-3">
          Manage Tickets
        </Typography>
        <div className="d-flex align-items-center">
          <IconButton
            onClick={() => reset()}
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
      <div className="">
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
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="pending">Paused</MenuItem>
            <MenuItem value="assigned">Assigned</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Departments</InputLabel>
          <Select value={department} label="Departments"
            onChange={(e) => {
              const value = e.target.value;
              setDepartments(value);
              if (value === "All") {
                // yahan aap function call kar sakte ho jo sab tickets/data fetch kare
                fetchAllTickets();
              } else {
                // yahan sirf selected department ka data fetch karo
                setDepartments(value);
              }
            }}
          >
            {departments.map((dept, index) => (
              <MenuItem key={index} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Markets</InputLabel>
          <Select value={market} label="Markets" onChange={(e) => setMarket(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {marketsList.map((m, idx) => (
              <MenuItem key={idx} value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size='small' sx={{ minWidth: 200 }} disabled={!market}>
          <InputLabel>Stores</InputLabel>
          <Select value={store} label='Store' onChange={(e) => setstoreName(e.target.value)}>
            <MenuItem value=''>All</MenuItem>
            {loader ? < CircularProgress size={25} sx={{ alignItems: "center" }} /> : stores?.map((storeItem, index) => (
              <MenuItem key={index} value={storeItem.store_name}>{storeItem.store_name}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>

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

          {/* <Tooltip title="Edit">
            <IconButton onClick={() => console.log('Edit', selectedRows[0])} sx={{
              '& .MuiSvgIcon-root': {
                transition: 'color 0.3s ease',
              }
            }}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip> */}

          {/* <EditTickets selectedRows={selectedRows} /> */}

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
                    // disabled
                    checked={selectedRows.length === tickets.length && tickets.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < tickets.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {[
                  // "", // checkbox
                  "Ticket ID",
                  "Priority",
                  "Creator Name",
                  "Status",
                  "Type",
                  "Description",
                  "Solved By",
                  "Age",
                  "Action"
                ].map((head, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      color: "white",
                      fontSize: "0.85rem",   // smaller font
                      fontWeight: 600,
                      whiteSpace: "nowrap", // prevent wrapping
                      padding: "10px 12px"   // tighter spacing
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <TableRow>
                  <TableCell colSpan={10} height={500} align="center">
                    <CircularProgress size={30} /> Loading...
                  </TableCell>
                </TableRow>
              ) : filteredTickets.length > 0 ? (
                filteredTickets
                  .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) // 👈 pagination
                  .map((ticket) => (
                    <TableRow key={ticket.id} hover sx={{ cursor: 'pointer' }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          // disabled
                          checked={selectedRows.includes(ticket.id)}
                          onChange={() => handleRowSelect(ticket.id)}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",   // smaller font
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.ticketId}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.priority}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.name}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.status}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.category}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.ticketDescription}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{ticket.assignerName || 'N/A'}</TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap", // prevent wrapping
                          padding: "10px 12px"   // tighter spacing
                        }}
                      >{getTicketAge(ticket.createdAt)}</TableCell>
                      <TableCell>
                        <Button onClick={() => navigate(`/superAdmin-review-tickets/${ticket.id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} height={500} align="center">
                    Data Not Found
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
