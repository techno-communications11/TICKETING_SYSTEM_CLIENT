import React, { useCallback, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Pagination, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getAllStores } from '../Services/stores.services';
import SearchIcon from '@mui/icons-material/Search';

function Stores() {
  const tickets = [
    { id: "TID0934893", priority: "Low", clientName: "Dane John", status: "Open", dueBy: "22 Dec 2022", type: "Technical", solvedBy: "Shekhar Khan" },
    { id: "TID0934894", priority: "Medium", clientName: "John Doe", status: "Closed", dueBy: "23 Dec 2022", type: "Support", solvedBy: "Jane Smith" },
    { id: "TID0934895", priority: "High", clientName: "Alice Brown", status: "Assigned", dueBy: "24 Dec 2022", type: "Billing", solvedBy: "Mark Johnson" },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]); // New state for filtered data
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const fetchAllStores = useCallback(async () => {
    try {
      const response = await getAllStores();
      setStores(response); // Update the stores state with the fetched data
      setFilteredStores(response); // Initially filter all stores
      console.log(response);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // const handleSelectAll = () => {
  //   if (selectedRows.length === tickets.length) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(tickets.map(ticket => ticket.id));
  //   }
  // };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query); // Update the search query state
    setCurrentPage(1); // Reset to the first page when searching

    // Filter the stores based on the search query
    const filteredData = stores.filter(store =>
      Object.values(store).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(query)
      )
    );

    setFilteredStores(filteredData); // Update the filtered data state
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStores.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container my-4 py-3">
      <BasicBreadcrumbs name={'Market Stores'} />
      <Typography variant='h6' className='mb-3'>Market Stores</Typography>
      <div className="row">
        <div className="col-md-12">
          <TextField
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={{
                    '& .MuiSvgIcon-root': {
                      transition: 'color 0.3s ease',
                    },
                  }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <Box sx={{ mt: 3, maxHeight: '500px', overflowY: 'auto' }}>
        <TableContainer component={Paper}>
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
                    checked={selectedRows.length === filteredStores.length && filteredStores.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < filteredStores.length}
                    // onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell className='p-0' sx={{ color: 'white',width:"200px", fontSize: "14px" }}>TECH ID</TableCell>
                <TableCell sx={{ color: 'white',width:"200px", fontSize: "14px" }} className='p-0'>Market</TableCell>
                <TableCell sx={{ color: 'white',width:"200px", fontSize: "14px" }} className='p-0'>Door Code</TableCell>
                <TableCell sx={{ color: 'white',width:"200px", fontSize: "14px" }}>Store Name</TableCell>
                <TableCell sx={{ color: 'white',width:"200px", fontSize: "14px" }}>Store Email</TableCell>
                <TableCell sx={{ color: 'white',width:"200px", fontSize: "14px" }}>Store Phone</TableCell>
                <TableCell className='p-0' sx={{ color: 'white',fontSize: "14px",width:"200px"  }}>Store Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.length > 0 ? (
                currentRows.map((store) => (
                  <TableRow key={store._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(store._id)}
                        onChange={() => handleRowSelect(store._id)}
                      />
                    </TableCell>
                    <TableCell className='p-0' sx={{fontSize:"14px"}}>{store.bdi_id}</TableCell>
                    <TableCell className='p-0' sx={{fontSize:"14px"}}>{store.market}</TableCell>
                    <TableCell className='p-0' sx={{fontSize:"14px"}}>{store.door_code}</TableCell>
                    <TableCell sx={{fontSize:"14px"}}>{store.store_name}</TableCell>
                    <TableCell className='p-0' sx={{fontSize:"14px"}}>{store.stroe_email}</TableCell>
                    <TableCell sx={{fontSize:"14px"}}>{store.store_phone}</TableCell>
                    <TableCell sx={{fontSize:"14px"}}>{store.store_addres}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} height={500} align="center">
                    <CircularProgress size={30}/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div className="row d-flex justify-content-end align-items-center mt-3">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-between g-3">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <span>Show rows:</span>
              <select value={rowsPerPage} onChange={handleChangeRowsPerPage} style={{ marginLeft: '8px', padding: '4px' }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(filteredStores.length / rowsPerPage)} // Total pages based on filtered data
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stores;