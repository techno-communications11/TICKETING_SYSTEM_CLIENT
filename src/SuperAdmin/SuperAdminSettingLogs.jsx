// // // // import React, { useCallback, useEffect, useState } from 'react';
// // // // import {
// // // //     CircularProgress,
// // // //     IconButton,
// // // //     TextField,
// // // //     InputAdornment,
// // // //     Pagination,
// // // //     Stack,
// // // //     TableHead,
// // // //     TableRow,
// // // //     TableCell,
// // // //     TableBody,
// // // //     Table,
// // // // } from '@mui/material';
// // // // import SearchIcon from '@mui/icons-material/Search';
// // // // import { getAllLogsServices } from '../Services/logs.services';

// // // // function SuperAdminSettingLogs() {
// // // //     const [logs, setLogs] = useState([]);
// // // //     const [filteredLogs, setFilteredLogs] = useState([]);
// // // //     const [loading, setLoading] = useState(false);
// // // //     const [searchTerm, setSearchTerm] = useState('');
// // // //     const [currentPage, setCurrentPage] = useState(1);
// // // //     const logsPerPage = 10;

// // // //     const fetchAllLogs = useCallback(async () => {
// // // //         setLoading(true);
// // // //         try {
// // // //             const response = await getAllLogsServices();
// // // //             const logData = response?.data?.data || [];
// // // //             setLogs(logData);
// // // //             setFilteredLogs(logData);
// // // //             console.log(logData);
// // // //         } catch (error) {
// // // //             console.log('Error', error.message);
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     }, []);

// // // //     useEffect(() => {
// // // //         fetchAllLogs();
// // // //     }, [fetchAllLogs]);

// // // //     const handleSearch = (value) => {
// // // //         setSearchTerm(value);
// // // //         setCurrentPage(1);
// // // //         if (value.trim() === '') {
// // // //             setFilteredLogs(logs);
// // // //         } else {
// // // //             const filtered = logs.filter((log) =>
// // // //                 log?.data[0]?.name?.toLowerCase().includes(value.toLowerCase())
// // // //             );
// // // //             setFilteredLogs(filtered);
// // // //         }
// // // //     };

// // // //     const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
// // // //     const paginatedLogs = filteredLogs.slice(
// // // //         (currentPage - 1) * logsPerPage,
// // // //         currentPage * logsPerPage
// // // //     );

// // // //     return (
// // // //         <div className="container my-5">
// // // //             <div className="row">
// // // //                 <div className="col-12">
// // // //                     <div className="d-flex justify-content-between align-items-center mb-3">
// // // //                         <h3 className="mb-4">📝 Activity Logs</h3>
// // // //                         <button className="btn btn-success" onClick={fetchAllLogs}>
// // // //                             Refresh
// // // //                         </button>
// // // //                     </div>

// // // //                     <div className="row">
// // // //                         <div className="col-md-6 mb-3">
// // // //                             <TextField
// // // //                                 label="Search by name"
// // // //                                 variant="outlined"
// // // //                                 fullWidth
// // // //                                 value={searchTerm}
// // // //                                 onChange={(e) => handleSearch(e.target.value)}
// // // //                                 InputProps={{
// // // //                                     endAdornment: (
// // // //                                         <InputAdornment position="end">
// // // //                                             <IconButton sx={{
// // // //                                                 '& .MuiSvgIcon-root': {
// // // //                                                     transition: 'color 0.3s ease',
// // // //                                                 }
// // // //                                             }}>
// // // //                                                 <SearchIcon />
// // // //                                             </IconButton>
// // // //                                         </InputAdornment>
// // // //                                     ),
// // // //                                 }}
// // // //                             />
// // // //                         </div>
// // // //                     </div>

// // // //                     <div
// // // //                         style={{
// // // //                             maxHeight: '450px',
// // // //                             overflowY: 'auto',
// // // //                             border: '1px solid #dee2e6',
// // // //                         }}
// // // //                     >
// // // //                         <Table >
// // // //                             <TableHead
// // // //                                 className="sticky-top"
// // // //                                 sx={{ backgroundColor: '#6f2da8', color: "white" }}
// // // //                             >
// // // //                                 <TableRow>
// // // //                                     <TableCell className='text-white'>Date</TableCell>
// // // //                                     <TableCell className='text-white'>Time</TableCell>
// // // //                                     <TableCell className='text-white'>Name</TableCell>
// // // //                                     <TableCell className='text-white'>Status</TableCell>
// // // //                                     <TableCell className='text-white'>IP</TableCell>
// // // //                                     <TableCell className='text-white'>OS</TableCell>
// // // //                                     <TableCell className='text-white'>Device</TableCell>
// // // //                                     <TableCell className='text-white'>Browser</TableCell>
// // // //                                     <TableCell className='text-white'>Location</TableCell>
// // // //                                 </TableRow>
// // // //                             </TableHead>
// // // //                             <TableBody>
// // // //                                 {loading ? (
// // // //                                     <TableRow>
// // // //                                         <TableCell colSpan={9}>
// // // //                                             <div
// // // //                                                 className="d-flex align-items-center justify-content-center w-100"
// // // //                                                 style={{ height: '300px' }}
// // // //                                             >
// // // //                                                 <CircularProgress size={40} />
// // // //                                             </div>
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                 ) : paginatedLogs.length > 0 ? (
// // // //                                     paginatedLogs.map((data, index) => {
// // // //                                         const dateObj = new Date(data?.date);
// // // //                                         const formattedDate = dateObj.toLocaleDateString();
// // // //                                         const formattedTime = dateObj.toLocaleTimeString();

// // // //                                         return (
// // // //                                             <TableRow key={index}>
// // // //                                                 <TableCell>{formattedDate}</TableCell>
// // // //                                                 <TableCell>{formattedTime}</TableCell>
// // // //                                                 <TableCell>{JSON.parse(data?.data[0])?.name}</TableCell>
// // // //                                                 <TableCell>{data?.status}</TableCell>
// // // //                                                 <TableCell>{data?.ip}</TableCell>
// // // //                                                 <TableCell>{data?.os}</TableCell>
// // // //                                                 <TableCell>{data?.device}</TableCell>
// // // //                                                 <TableCell>{data?.browser}</TableCell>
// // // //                                                 <TableCell>{data?.location}</TableCell>
// // // //                                             </TableRow>
// // // //                                         );
// // // //                                     })
// // // //                                 ) : (
// // // //                                     <TableRow>
// // // //                                         <TableCell colSpan="9" className="text-center">
// // // //                                             No logs found.
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                 )}
// // // //                             </TableBody>
// // // //                         </Table>
// // // //                     </div>

// // // //                     {/* Pagination */}
// // // //                     {!loading && totalPages > 1 && (
// // // //                         <Stack direction="row" justifyContent="center" className="mt-4">
// // // //                             <Pagination
// // // //                                 count={totalPages}
// // // //                                 page={currentPage}
// // // //                                 onChange={(e, value) => setCurrentPage(value)}
// // // //                                 color="primary"
// // // //                             />
// // // //                         </Stack>
// // // //                     )}
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default SuperAdminSettingLogs;


// // // import React, { useCallback, useEffect, useState } from 'react';
// // // import {
// // //     CircularProgress,
// // //     IconButton,
// // //     TextField,
// // //     InputAdornment,
// // //     Pagination,
// // //     Stack,
// // //     TableHead,
// // //     TableRow,
// // //     TableCell,
// // //     TableBody,
// // //     Table,
// // // } from '@mui/material';
// // // import SearchIcon from '@mui/icons-material/Search';
// // // import { getAllLogsServices } from '../Services/logs.services';

// // // function SuperAdminSettingLogs() {
// // //     const [logs, setLogs] = useState([]);
// // //     const [filteredLogs, setFilteredLogs] = useState([]);
// // //     const [loading, setLoading] = useState(false);
// // //     const [searchTerm, setSearchTerm] = useState('');
// // //     const [currentPage, setCurrentPage] = useState(1);
// // //     const logsPerPage = 10;

// // //     const fetchAllLogs = useCallback(async () => {
// // //         setLoading(true);
// // //         try {
// // //             const response = await getAllLogsServices();
// // //             const logData = response?.data?.data || [];

// // //             // ✅ Parse the JSON once here
// // //             const parsedLogs = logData.map((log) => {
// // //                 let parsedInfo = {};
// // //                 try {
// // //                     if (log?.data?.[0]) {
// // //                         parsedInfo = JSON.parse(log.data[0]);
// // //                     }
// // //                 } catch (err) {
// // //                     console.error('Error parsing log data:', err);
// // //                 }
// // //                 return {
// // //                     ...log,
// // //                     parsedInfo, // new key with parsed object
// // //                 };
// // //             });

// // //             setLogs(parsedLogs);
// // //             setFilteredLogs(parsedLogs);
// // //         } catch (error) {
// // //             console.error('Error:', error.message);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     }, []);

// // //     useEffect(() => {
// // //         fetchAllLogs();
// // //     }, [fetchAllLogs]);

// // //     const handleSearch = (value) => {
// // //         setSearchTerm(value);
// // //         setCurrentPage(1);
// // //         if (value.trim() === '') {
// // //             setFilteredLogs(logs);
// // //         } else {
// // //             const filtered = logs.filter((log) =>
// // //                 log?.parsedInfo?.name?.toLowerCase().includes(value.toLowerCase())
// // //             );
// // //             setFilteredLogs(filtered);
// // //         }
// // //     };

// // //     const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
// // //     const paginatedLogs = filteredLogs.slice(
// // //         (currentPage - 1) * logsPerPage,
// // //         currentPage * logsPerPage
// // //     );

// // //     return (
// // //         <div className="container my-5">
// // //             <div className="row">
// // //                 <div className="col-12">
// // //                     <div className="d-flex justify-content-between align-items-center mb-3">
// // //                         <h3 className="mb-4">📝 Activity Logs</h3>
// // //                         <button className="btn btn-success" onClick={fetchAllLogs}>
// // //                             Refresh
// // //                         </button>
// // //                     </div>

// // //                     <div className="row">
// // //                         <div className="col-md-6 mb-3">
// // //                             <TextField
// // //                                 label="Search by name"
// // //                                 variant="outlined"
// // //                                 fullWidth
// // //                                 value={searchTerm}
// // //                                 onChange={(e) => handleSearch(e.target.value)}
// // //                                 InputProps={{
// // //                                     endAdornment: (
// // //                                         <InputAdornment position="end">
// // //                                             <IconButton>
// // //                                                 <SearchIcon />
// // //                                             </IconButton>
// // //                                         </InputAdornment>
// // //                                     ),
// // //                                 }}
// // //                             />
// // //                         </div>
// // //                     </div>

// // //                     <div
// // //                         style={{
// // //                             maxHeight: '450px',
// // //                             overflowY: 'auto',
// // //                             border: '1px solid #dee2e6',
// // //                         }}
// // //                     >
// // //                         <Table>
// // //                             <TableHead
// // //                                 className="sticky-top"
// // //                                 sx={{ backgroundColor: '#6f2da8', color: 'white' }}
// // //                             >
// // //                                 <TableRow>
// // //                                     <TableCell className="text-white">Date</TableCell>
// // //                                     <TableCell className="text-white">Time</TableCell>
// // //                                     <TableCell className="text-white">Name</TableCell>
// // //                                     <TableCell className="text-white">Status</TableCell>
// // //                                     <TableCell className="text-white">IP</TableCell>
// // //                                     <TableCell className="text-white">OS</TableCell>
// // //                                     <TableCell className="text-white">Device</TableCell>
// // //                                     <TableCell className="text-white">Browser</TableCell>
// // //                                     <TableCell className="text-white">Location</TableCell>
// // //                                 </TableRow>
// // //                             </TableHead>
// // //                             <TableBody>
// // //                                 {loading ? (
// // //                                     <TableRow>
// // //                                         <TableCell colSpan={9}>
// // //                                             <div
// // //                                                 className="d-flex align-items-center justify-content-center w-100"
// // //                                                 style={{ height: '300px' }}
// // //                                             >
// // //                                                 <CircularProgress size={40} />
// // //                                             </div>
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                 ) : paginatedLogs.length > 0 ? (
// // //                                     paginatedLogs.map((data, index) => {
// // //                                         const dateObj = new Date(data?.date);
// // //                                         const formattedDate = dateObj.toLocaleDateString();
// // //                                         const formattedTime = dateObj.toLocaleTimeString();
// // //                                         const userData = JSON.parse(data?.data)
// // //                                         return (
// // //                                             <TableRow key={index}>
// // //                                                 <TableCell>{formattedDate}</TableCell>
// // //                                                 <TableCell>{formattedTime}</TableCell>
// // //                                                 <TableCell>{userData?.name || '-'}</TableCell>
// // //                                                 <TableCell>{data?.status}</TableCell>
// // //                                                 <TableCell>{data?.ip}</TableCell>
// // //                                                 <TableCell>{data?.os}</TableCell>
// // //                                                 <TableCell>{data?.device}</TableCell>
// // //                                                 <TableCell>{data?.browser}</TableCell>
// // //                                                 <TableCell>{data?.location}</TableCell>
// // //                                             </TableRow>
// // //                                         );
// // //                                     })
// // //                                 ) : (
// // //                                     <TableRow>
// // //                                         <TableCell colSpan="9" className="text-center">
// // //                                             No logs found.
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                 )}
// // //                             </TableBody>
// // //                         </Table>
// // //                     </div>

// // //                     {!loading && totalPages > 1 && (
// // //                         <Stack direction="row" justifyContent="center" className="mt-4">
// // //                             <Pagination
// // //                                 count={totalPages}
// // //                                 page={currentPage}
// // //                                 onChange={(e, value) => setCurrentPage(value)}
// // //                                 color="primary"
// // //                             />
// // //                         </Stack>
// // //                     )}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default SuperAdminSettingLogs;


// // import React, { useCallback, useEffect, useState } from 'react';
// // import {
// //     CircularProgress,
// //     IconButton,
// //     TextField,
// //     InputAdornment,
// //     Pagination,
// //     Stack,
// //     TableHead,
// //     TableRow,
// //     TableCell,
// //     TableBody,
// //     Table,
// //     Checkbox,
// //     Button
// // } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import { deleteLogsServices, getAllLogsServices } from '../Services/logs.services';

// // function SuperAdminSettingLogs() {
// //     const [logs, setLogs] = useState([]);
// //     const [filteredLogs, setFilteredLogs] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [selectedLogs, setSelectedLogs] = useState([]); // ✅ store selected log IDs
// //     const logsPerPage = 10;

// //     const fetchAllLogs = useCallback(async () => {
// //         setLoading(true);
// //         try {
// //             const response = await getAllLogsServices();
// //             const logData = response?.data?.data || [];

// //             const parsedLogs = logData.map((log) => {
// //                 let parsedInfo = {};
// //                 try {
// //                     if (log?.data?.[0]) {
// //                         parsedInfo = JSON.parse(log.data[0]);
// //                     }
// //                 } catch (err) {
// //                     console.error('Error parsing log data:', err);
// //                 }
// //                 return {
// //                     ...log,
// //                     parsedInfo,
// //                 };
// //             });

// //             setLogs(parsedLogs);
// //             setFilteredLogs(parsedLogs);
// //         } catch (error) {
// //             console.error('Error:', error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         fetchAllLogs();
// //     }, [fetchAllLogs]);

// //     const handleSearch = (value) => {
// //         setSearchTerm(value);
// //         setCurrentPage(1);
// //         if (value.trim() === '') {
// //             setFilteredLogs(logs);
// //         } else {
// //             const filtered = logs.filter((log) =>
// //                 log?.parsedInfo?.name?.toLowerCase().includes(value.toLowerCase())
// //             );
// //             setFilteredLogs(filtered);
// //         }
// //     };

// //     // ✅ handle checkbox select
// //     const handleSelectLog = (id) => {
// //         if (selectedLogs.includes(id)) {
// //             setSelectedLogs(selectedLogs.filter((logId) => logId !== id));
// //         } else {
// //             setSelectedLogs([...selectedLogs, id]);
// //         }
// //     };

// //     // ✅ handle select all
// //     const handleSelectAll = (e) => {
// //         if (e.target.checked) {
// //             const allIds = filteredLogs.map((log) => log.id);
// //             setSelectedLogs(allIds);
// //         } else {
// //             setSelectedLogs([]);
// //         }
// //     };

// //     const handleDelete = async () => {
// //         try {
// //             console.log("Selected Log IDs:", selectedLogs);
// //             const response = await deleteLogsServices(selectedLogs);
// //             console.log("response:", response);

// //         } catch (error) {

// //             console.log("error:", error.message);
// //         }
// //         // 🔥 yahan API call ya confirmation modal bhi laga sakte ho
// //     };

// //     const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
// //     const paginatedLogs = filteredLogs.slice(
// //         (currentPage - 1) * logsPerPage,
// //         currentPage * logsPerPage
// //     );

// //     return (
// //         <div className="container my-5">
// //             <div className="row">
// //                 <div className="col-12">
// //                     <div className="d-flex justify-content-between align-items-center mb-3">
// //                         <h3 className="mb-4">📝 Activity Logs</h3>
// //                         <div className="d-flex gap-2">
// //                             {selectedLogs.length > 0 && (
// //                                 <Button
// //                                     variant="contained"
// //                                     color="error"
// //                                     onClick={handleDelete}
// //                                 >
// //                                     Delete Selected ({selectedLogs.length})
// //                                 </Button>
// //                             )}
// //                             <Button variant="contained" color="success" onClick={fetchAllLogs}>
// //                                 Refresh
// //                             </Button>
// //                         </div>
// //                     </div>

// //                     <div className="row">
// //                         <div className="col-md-6 mb-3">
// //                             <TextField
// //                                 label="Search by name"
// //                                 variant="outlined"
// //                                 fullWidth
// //                                 value={searchTerm}
// //                                 onChange={(e) => handleSearch(e.target.value)}
// //                                 InputProps={{
// //                                     endAdornment: (
// //                                         <InputAdornment position="end">
// //                                             <IconButton>
// //                                                 <SearchIcon />
// //                                             </IconButton>
// //                                         </InputAdornment>
// //                                     ),
// //                                 }}
// //                             />
// //                         </div>
// //                     </div>

// //                     <div
// //                         style={{
// //                             maxHeight: '450px',
// //                             overflowY: 'auto',
// //                             border: '1px solid #dee2e6',
// //                         }}
// //                     >
// //                         <Table>
// //                             <TableHead
// //                                 className="sticky-top"
// //                                 sx={{ backgroundColor: '#6f2da8', color: 'white' }}
// //                             >
// //                                 <TableRow>
// //                                     <TableCell padding="checkbox">
// //                                         <Checkbox
// //                                             checked={
// //                                                 selectedLogs.length === filteredLogs.length &&
// //                                                 filteredLogs.length > 0
// //                                             }
// //                                             indeterminate={
// //                                                 selectedLogs.length > 0 &&
// //                                                 selectedLogs.length < filteredLogs.length
// //                                             }
// //                                             onChange={handleSelectAll}
// //                                             sx={{
// //                                                 color: 'white',
// //                                                 '&.Mui-checked': { color: 'white' },
// //                                             }}
// //                                         />
// //                                     </TableCell>
// //                                     <TableCell className="text-white">Date</TableCell>
// //                                     <TableCell className="text-white">Time</TableCell>
// //                                     <TableCell className="text-white">Name</TableCell>
// //                                     <TableCell className="text-white">Status</TableCell>
// //                                     <TableCell className="text-white">IP</TableCell>
// //                                     <TableCell className="text-white">OS</TableCell>
// //                                     <TableCell className="text-white">Device</TableCell>
// //                                     <TableCell className="text-white">Browser</TableCell>
// //                                     <TableCell className="text-white">Location</TableCell>
// //                                 </TableRow>
// //                             </TableHead>
// //                             <TableBody>
// //                                 {loading ? (
// //                                     <TableRow>
// //                                         <TableCell colSpan={10}>
// //                                             <div
// //                                                 className="d-flex align-items-center justify-content-center w-100"
// //                                                 style={{ height: '300px' }}
// //                                             >
// //                                                 <CircularProgress size={40} />
// //                                             </div>
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 ) : paginatedLogs.length > 0 ? (
// //                                     paginatedLogs.map((data, index) => {
// //                                         const dateObj = new Date(data?.date);
// //                                         const formattedDate = dateObj.toLocaleDateString();
// //                                         const formattedTime = dateObj.toLocaleTimeString();
// //                                         const userData = JSON.parse(data?.data);
// //                                         return (
// //                                             <TableRow key={index} hover>
// //                                                 <TableCell padding="checkbox">
// //                                                     <Checkbox
// //                                                         checked={selectedLogs.includes(data.id)}
// //                                                         onChange={() => handleSelectLog(data.id)}
// //                                                     />
// //                                                 </TableCell>
// //                                                 <TableCell>{formattedDate}</TableCell>
// //                                                 <TableCell>{formattedTime}</TableCell>
// //                                                 <TableCell>{userData?.name || '-'}</TableCell>
// //                                                 <TableCell>{data?.status}</TableCell>
// //                                                 <TableCell>{data?.ip}</TableCell>
// //                                                 <TableCell>{data?.os}</TableCell>
// //                                                 <TableCell>{data?.device}</TableCell>
// //                                                 <TableCell>{data?.browser}</TableCell>
// //                                                 <TableCell>{data?.location}</TableCell>
// //                                             </TableRow>
// //                                         );
// //                                     })
// //                                 ) : (
// //                                     <TableRow>
// //                                         <TableCell colSpan="10" className="text-center">
// //                                             No logs found.
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 )}
// //                             </TableBody>
// //                         </Table>
// //                     </div>

// //                     {!loading && totalPages > 1 && (
// //                         <Stack direction="row" justifyContent="center" className="mt-4">
// //                             <Pagination
// //                                 count={totalPages}
// //                                 page={currentPage}
// //                                 onChange={(e, value) => setCurrentPage(value)}
// //                                 color="primary"
// //                             />
// //                         </Stack>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default SuperAdminSettingLogs;


// import React, { useCallback, useEffect, useState } from "react";
// import {
//     CircularProgress,
//     IconButton,
//     TextField,
//     InputAdornment,
//     Pagination,
//     Stack,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Table,
//     Checkbox,
//     Button,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { deleteLogsServices, getAllLogsServices } from "../Services/logs.services";

// function SuperAdminSettingLogs() {
//     const [logs, setLogs] = useState([]);
//     const [filteredLogs, setFilteredLogs] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [loader, setLoader] = useState(false);
//     const logsPerPage = 10;

//     const safeParse = (value) => {
//         if (!value) return {};
//         if (typeof value === "object") return value;
//         try {
//             return JSON.parse(value);
//         } catch {
//             return {};
//         }
//     };

//     const fetchAllLogs = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await getAllLogsServices();
//             const logData = response?.data?.data || [];

//             const parsedLogs = logData.map((log) => {
//                 let parsedInfo = {};
//                 try {
//                     if (log?.data?.[0]) {
//                         parsedInfo = safeParse(log.data[0]);
//                     } else {
//                         parsedInfo = safeParse(log.data);
//                     }
//                 } catch (err) {
//                     console.error("Error parsing log data:", err);
//                 }
//                 return {
//                     ...log,
//                     parsedInfo,
//                 };
//             });

//             setLogs(parsedLogs);
//             setFilteredLogs(parsedLogs);
//         } catch (error) {
//             console.error("Error fetching logs:", error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchAllLogs();
//     }, [fetchAllLogs]);

//     const handleSearch = (value) => {
//         setSearchTerm(value);
//         setCurrentPage(1);
//         if (value.trim() === "") {
//             setFilteredLogs(logs);
//         } else {
//             const filtered = logs.filter((log) =>
//                 log?.parsedInfo?.name
//                     ?.toLowerCase()
//                     .includes(value.toLowerCase())
//             );
//             setFilteredLogs(filtered);
//         }
//     };
//     const handleSelectRow = (id) => {
//         setSelectedRows((prev) =>
//             prev.includes(id)
//                 ? prev.filter((rowId) => rowId !== id)
//                 : [...prev, id]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectedRows.length === paginatedLogs.length) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(paginatedLogs.map((log) => log.id));
//         }
//     };

//     const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
//     const paginatedLogs = filteredLogs.slice(
//         (currentPage - 1) * logsPerPage,
//         currentPage * logsPerPage
//     );

//     const handleDelete = async () => {
//         setLoader(true);
//         try {
//             const response = await deleteLogsServices(selectedRows);
//             if (response.data.status === 200) {
//                 setLoader(false);
//                 setSelectedRows([])
//                 fetchAllLogs()
//             }
//         } catch (error) {
//             setLoader(false);
//         }

//     };

//     return (
//         <div className="container my-5">
//             <div className="row">
//                 <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h3 className="mb-4">📝 Activity Logs</h3>
//                         <div>
//                             {selectedRows.length > 0 && (
//                                 <Button
//                                     variant="contained"
//                                     color="error"
//                                     onClick={handleDelete}
//                                     className="me-3"
//                                     disabled={loader}
//                                 >
//                                     {loader ? <>
//                                         <CircularProgress size={25} sx={{ color: "white", mr: 1 }} />
//                                         Deleting...
//                                     </> : `Delete Selected (${selectedRows.length})`}
//                                 </Button>
//                             )}
//                             <Button variant="contained" onClick={fetchAllLogs}>
//                                 Refresh
//                             </Button>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-md-6 mb-3">
//                             <TextField
//                                 label="Search by name"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={searchTerm}
//                                 onChange={(e) => handleSearch(e.target.value)}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton>
//                                                 <SearchIcon />
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <div
//                         style={{
//                             maxHeight: "450px",
//                             overflowY: "auto",
//                             border: "1px solid #dee2e6",
//                         }}
//                     >
//                         <Table>
//                             <TableHead
//                                 className="sticky-top"
//                                 sx={{ backgroundColor: "#6f2da8", color: "white" }}
//                             >
//                                 <TableRow>
//                                     <TableCell padding="checkbox">
//                                         <Checkbox
//                                             checked={
//                                                 selectedRows.length === paginatedLogs.length &&
//                                                 paginatedLogs.length > 0
//                                             }
//                                             indeterminate={
//                                                 selectedRows.length > 0 &&
//                                                 selectedRows.length < paginatedLogs.length
//                                             }
//                                             onChange={handleSelectAll}
//                                             sx={{
//                                                 color: "white",
//                                                 "&.Mui-checked": { color: "white" },
//                                             }}
//                                         />
//                                     </TableCell>
//                                     <TableCell className="text-white">Date</TableCell>
//                                     <TableCell className="text-white">Time</TableCell>
//                                     <TableCell className="text-white">Name</TableCell>
//                                     <TableCell className="text-white">Status</TableCell>
//                                     <TableCell className="text-white">IP</TableCell>
//                                     <TableCell className="text-white">OS</TableCell>
//                                     <TableCell className="text-white">Device</TableCell>
//                                     <TableCell className="text-white">Browser</TableCell>
//                                     <TableCell className="text-white">Location</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={10}>
//                                             <div
//                                                 className="d-flex align-items-center justify-content-center w-100"
//                                                 style={{ height: "300px" }}
//                                             >
//                                                 <CircularProgress size={40} />
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : paginatedLogs.length > 0 ? (
//                                     paginatedLogs.map((data, index) => {
//                                         const dateObj = new Date(data?.date);
//                                         const formattedDate = dateObj.toLocaleDateString();
//                                         const formattedTime = dateObj.toLocaleTimeString();
//                                         const userData = safeParse(data?.data);

//                                         return (
//                                             <TableRow key={index} hover>
//                                                 <TableCell padding="checkbox">
//                                                     <Checkbox
//                                                         checked={selectedRows.includes(data.id)}
//                                                         onChange={() => handleSelectRow(data.id)}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>{formattedDate}</TableCell>
//                                                 <TableCell>{formattedTime}</TableCell>
//                                                 <TableCell>{userData?.name || "-"}</TableCell>
//                                                 <TableCell>{data?.status}</TableCell>
//                                                 <TableCell>{data?.ip}</TableCell>
//                                                 <TableCell>{data?.os}</TableCell>
//                                                 <TableCell>{data?.device}</TableCell>
//                                                 <TableCell>{data?.browser}</TableCell>
//                                                 <TableCell>{data?.location}</TableCell>
//                                             </TableRow>
//                                         );
//                                     })
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan="10" className="text-center">
//                                             No logs found.
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </div>

//                     {!loading && totalPages > 1 && (
//                         <Stack direction="row" justifyContent="center" className="mt-4">
//                             <Pagination
//                                 count={totalPages}
//                                 page={currentPage}
//                                 onChange={(e, value) => setCurrentPage(value)}
//                                 color="primary"
//                             />
//                         </Stack>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SuperAdminSettingLogs;


import React, { useCallback, useEffect, useState } from "react";
import {
    CircularProgress,
    IconButton,
    TextField,
    InputAdornment,
    Pagination,
    Stack,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
    Checkbox,
    Button,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deleteLogsServices, getAllLogsServices } from "../Services/logs.services";
import HistoryIcon from "@mui/icons-material/History";


function SuperAdminSettingLogs() {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loader, setLoader] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(100); // ✅ default 100 entries

    // Safe JSON parse utility
    const safeParse = (value) => {
        if (!value) return {};
        if (typeof value === "object") return value;
        try {
            return JSON.parse(value);
        } catch {
            return {};
        }
    };

    // Fetch all logs from backend
    // const fetchAllLogs = useCallback(async () => {
    //     setLoading(true);
    //     try {
    //         const response = await getAllLogsServices();
    //         const logData = response?.data?.data || [];
    //         const parsedLogs = logData.map((log) => {
    //             let parsedInfo = {};
    //             try {
    //                 parsedInfo = log?.data?.[0]
    //                     ? safeParse(log.data[0])
    //                     : safeParse(log.data);
    //             } catch (err) {
    //                 console.error("Error parsing log data:", err);
    //             }
    //             return { ...log, parsedInfo };
    //         });

    //         setLogs(parsedLogs);
    //         setFilteredLogs(parsedLogs);
    //     } catch (error) {
    //         console.error("Error fetching logs:", error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    const fetchAllLogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllLogsServices();
            const logData = response?.data?.data || [];

            // ✅ Parse and flatten
            const parsedLogs = logData.map((log) => {
                const parsedInfo = safeParse(log.data);
                return {
                    ...log,
                    name:
                        parsedInfo?.name ||
                        parsedInfo?.username ||
                        parsedInfo?.user_name ||
                        "-", // fallback
                };
            });

            // ✅ Sort by date (newest first)
            const sortedLogs = parsedLogs.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );

            setLogs(sortedLogs);
            setFilteredLogs(sortedLogs);
        } catch (error) {
            console.error("Error fetching logs:", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllLogs();
    }, [fetchAllLogs]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);

        if (value.trim() === "") {
            setFilteredLogs(logs);
            return;
        }

        const lower = value.toLowerCase();

        // ✅ Search through both name + description (optional)
        const filtered = logs.filter((log) => {
            const name = log?.name?.toLowerCase() || "";
            const desc = log?.description?.toLowerCase() || "";
            return name.includes(lower) || desc.includes(lower);
        });

        setFilteredLogs(filtered);
    };

    // Row select
    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === paginatedLogs.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedLogs.map((log) => log.id));
        }
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Delete selected logs
    const handleDelete = async () => {
        setLoader(true);
        try {
            const response = await deleteLogsServices(selectedRows);
            if (response.data.status === 200) {
                setLoader(false);
                setSelectedRows([]);
                fetchAllLogs();
            }
        } catch (error) {
            console.error("Delete Error:", error);
            setLoader(false);
        }
    };

    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-12">
                    {/* Header & Actions */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-4"><HistoryIcon /> Activity Logs</h3>
                        <div>
                            {selectedRows.length > 0 && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleDelete}
                                    className="me-3"
                                    disabled={loader}
                                >
                                    {loader ? (
                                        <>
                                            <CircularProgress
                                                size={25}
                                                sx={{ color: "white", mr: 1 }}
                                            />
                                            Deleting...
                                        </>
                                    ) : (
                                        `Delete Selected (${selectedRows.length})`
                                    )}
                                </Button>
                            )}
                            <Button variant="contained" onClick={fetchAllLogs}>
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <TextField
                                label="Search by name"
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
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
                        </div>
                        {/* Rows per page selector */}
                        <div className="col-md-3 d-flex align-items-center justify-content-end">
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel>Show Entries</InputLabel>
                                <Select
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    label="Show Entries"
                                >
                                    <MenuItem value={100}>100</MenuItem>
                                    <MenuItem value={200}>200</MenuItem>
                                    <MenuItem value={400}>400</MenuItem>
                                    <MenuItem value={500}>500</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Logs Table */}
                    <div
                        style={{
                            maxHeight: "600px",
                            overflowY: "auto",
                            border: "1px solid #dee2e6",
                        }}
                    >
                        <Table>
                            <TableHead
                                className="sticky-top"
                                sx={{ backgroundColor: "#6f2da8" }}
                            >
                                <TableRow>
                                    <TableCell sx={{ color: "white" }} padding="checkbox">
                                        <Checkbox
                                            checked={
                                                selectedRows.length === paginatedLogs.length &&
                                                paginatedLogs.length > 0
                                            }
                                            indeterminate={
                                                selectedRows.length > 0 &&
                                                selectedRows.length < paginatedLogs.length
                                            }
                                            onChange={handleSelectAll}
                                            sx={{
                                                color: "white",
                                                "&.Mui-checked": { color: "white" },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                                    <TableCell sx={{ color: "white" }}>Time</TableCell>
                                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                                    <TableCell sx={{ color: "white" }}>IP</TableCell>
                                    <TableCell sx={{ color: "white" }}>OS</TableCell>
                                    <TableCell sx={{ color: "white" }}>Device</TableCell>
                                    <TableCell sx={{ color: "white" }}>Browser</TableCell>
                                    <TableCell sx={{ color: "white" }}>Location</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={10}>
                                            <div
                                                className="d-flex align-items-center justify-content-center w-100"
                                                style={{ height: "300px" }}
                                            >
                                                <CircularProgress size={40} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedLogs.length > 0 ? (
                                    paginatedLogs.map((data, index) => {
                                        const dateObj = new Date(data?.date);
                                        const formattedDate = dateObj.toLocaleDateString();
                                        const formattedTime = dateObj.toLocaleTimeString();
                                        const userData = safeParse(data?.data);

                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selectedRows.includes(data.id)}
                                                        onChange={() => handleSelectRow(data.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{formattedDate}</TableCell>
                                                <TableCell>{formattedTime}</TableCell>
                                                <TableCell>{userData?.name || "-"}</TableCell>
                                                <TableCell>{data?.status}</TableCell>
                                                <TableCell>
                                                    {["::1", "::ffff:127.0.0.1", "127.0.0.1"].includes(data?.ip) ? "-" : data?.ip}
                                                </TableCell>

                                                <TableCell>{data?.os}</TableCell>
                                                <TableCell>{data?.device}</TableCell>
                                                <TableCell>{data?.browser}</TableCell>
                                                <TableCell>
                                                    {!data?.location || data?.location === "undefined, undefined" ? "-" : data?.location}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="10" className="text-center">
                                            No logs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <Stack direction="row" justifyContent="center" className="mt-4">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(e, value) => setCurrentPage(value)}
                                color="primary"
                            />
                        </Stack>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SuperAdminSettingLogs;
