import React, { useCallback, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Pagination, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import SearchIcon from '@mui/icons-material/Search';
import { getAllNewCamCredentails } from '../Services/camcredentails.services';

function CamCredentails() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [loader, setLoader] = useState(false);
  const [camcastcredentail, setCamCastCredentails] = useState([]);

  const fetchAllCamCredentails = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getAllNewCamCredentails();
      setCamCastCredentails(response.data.data)
      // console.log("response", response.data.data)
    } catch (error) {
      setLoader(false);
      console.log("error", error.message)
    } finally {
      setLoader(false);
    }
  }, [])

  useEffect(() => {
    fetchAllCamCredentails()
  }, [fetchAllCamCredentails])

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
    const filteredData = camcastcredentail.filter(store =>
      Object.values(store).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(query)
      )
    );

    setCamCastCredentails(filteredData);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = camcastcredentail.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container my-4 py-3">
      <BasicBreadcrumbs name={'CamCast Credentials'} />
      <Typography variant='h6' className='mb-3'>CamCast Credentials</Typography>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between align-items-center">
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
                <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Website</TableCell>
                <TableCell className='p-0' sx={{ color: 'white', width: "200px", fontSize: "14px" }}>User Name</TableCell>
                <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }} className='p-0'>Password</TableCell>
                <TableCell sx={{ color: 'white', width: "200px", fontSize: "14px" }}>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? <TableRow><TableCell colSpan={8} align='center' sx={{ height: '500px', }}><CircularProgress /></TableCell> </TableRow> : currentRows.length > 0 ? (
                currentRows.map((store) => (
                  <TableRow key={store._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell sx={{ fontSize: "14px" }}>{store.website_url}</TableCell>
                    <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.username}</TableCell>
                    <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.password}</TableCell>
                    <TableCell className='p-0' sx={{ fontSize: "14px" }}>{store.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Record found.
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
                count={Math.ceil(camcastcredentail.length / rowsPerPage)} // Total pages based on filtered data
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

export default CamCredentails