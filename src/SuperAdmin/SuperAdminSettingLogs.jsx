// import React, { useCallback, useEffect, useState } from 'react';
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
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { getAllLogsServices } from '../Services/logs.services';

// function SuperAdminSettingLogs() {
//     const [logs, setLogs] = useState([]);
//     const [filteredLogs, setFilteredLogs] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const logsPerPage = 10;

//     const fetchAllLogs = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await getAllLogsServices();
//             const logData = response?.data?.data || [];
//             setLogs(logData);
//             setFilteredLogs(logData);
//             console.log(logData);
//         } catch (error) {
//             console.log('Error', error.message);
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
//         if (value.trim() === '') {
//             setFilteredLogs(logs);
//         } else {
//             const filtered = logs.filter((log) =>
//                 log?.data[0]?.name?.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredLogs(filtered);
//         }
//     };

//     const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
//     const paginatedLogs = filteredLogs.slice(
//         (currentPage - 1) * logsPerPage,
//         currentPage * logsPerPage
//     );

//     return (
//         <div className="container my-5">
//             <div className="row">
//                 <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h3 className="mb-4">📝 Activity Logs</h3>
//                         <button className="btn btn-success" onClick={fetchAllLogs}>
//                             Refresh
//                         </button>
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
//                                             <IconButton sx={{
//                                                 '& .MuiSvgIcon-root': {
//                                                     transition: 'color 0.3s ease',
//                                                 }
//                                             }}>
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
//                             maxHeight: '450px',
//                             overflowY: 'auto',
//                             border: '1px solid #dee2e6',
//                         }}
//                     >
//                         <Table >
//                             <TableHead
//                                 className="sticky-top"
//                                 sx={{ backgroundColor: '#6f2da8', color: "white" }}
//                             >
//                                 <TableRow>
//                                     <TableCell className='text-white'>Date</TableCell>
//                                     <TableCell className='text-white'>Time</TableCell>
//                                     <TableCell className='text-white'>Name</TableCell>
//                                     <TableCell className='text-white'>Status</TableCell>
//                                     <TableCell className='text-white'>IP</TableCell>
//                                     <TableCell className='text-white'>OS</TableCell>
//                                     <TableCell className='text-white'>Device</TableCell>
//                                     <TableCell className='text-white'>Browser</TableCell>
//                                     <TableCell className='text-white'>Location</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={9}>
//                                             <div
//                                                 className="d-flex align-items-center justify-content-center w-100"
//                                                 style={{ height: '300px' }}
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

//                                         return (
//                                             <TableRow key={index}>
//                                                 <TableCell>{formattedDate}</TableCell>
//                                                 <TableCell>{formattedTime}</TableCell>
//                                                 <TableCell>{JSON.parse(data?.data[0])?.name}</TableCell>
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
//                                         <TableCell colSpan="9" className="text-center">
//                                             No logs found.
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </div>

//                     {/* Pagination */}
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


import React, { useCallback, useEffect, useState } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAllLogsServices } from '../Services/logs.services';

function SuperAdminSettingLogs() {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;

    const fetchAllLogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllLogsServices();
            const logData = response?.data?.data || [];

            // ✅ Parse the JSON once here
            const parsedLogs = logData.map((log) => {
                let parsedInfo = {};
                try {
                    if (log?.data?.[0]) {
                        parsedInfo = JSON.parse(log.data[0]);
                    }
                } catch (err) {
                    console.error('Error parsing log data:', err);
                }
                return {
                    ...log,
                    parsedInfo, // new key with parsed object
                };
            });

            setLogs(parsedLogs);
            setFilteredLogs(parsedLogs);
        } catch (error) {
            console.error('Error:', error.message);
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
        if (value.trim() === '') {
            setFilteredLogs(logs);
        } else {
            const filtered = logs.filter((log) =>
                log?.parsedInfo?.name?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredLogs(filtered);
        }
    };

    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * logsPerPage,
        currentPage * logsPerPage
    );

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-4">📝 Activity Logs</h3>
                        <button className="btn btn-success" onClick={fetchAllLogs}>
                            Refresh
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
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
                    </div>

                    <div
                        style={{
                            maxHeight: '450px',
                            overflowY: 'auto',
                            border: '1px solid #dee2e6',
                        }}
                    >
                        <Table>
                            <TableHead
                                className="sticky-top"
                                sx={{ backgroundColor: '#6f2da8', color: 'white' }}
                            >
                                <TableRow>
                                    <TableCell className="text-white">Date</TableCell>
                                    <TableCell className="text-white">Time</TableCell>
                                    <TableCell className="text-white">Name</TableCell>
                                    <TableCell className="text-white">Status</TableCell>
                                    <TableCell className="text-white">IP</TableCell>
                                    <TableCell className="text-white">OS</TableCell>
                                    <TableCell className="text-white">Device</TableCell>
                                    <TableCell className="text-white">Browser</TableCell>
                                    <TableCell className="text-white">Location</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={9}>
                                            <div
                                                className="d-flex align-items-center justify-content-center w-100"
                                                style={{ height: '300px' }}
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
                                        const userData = JSON.parse(data?.data)
                                        console.log(data)
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{formattedDate}</TableCell>
                                                <TableCell>{formattedTime}</TableCell>
                                                <TableCell>{userData?.name || '-'}</TableCell>
                                                <TableCell>{data?.status}</TableCell>
                                                <TableCell>{data?.ip}</TableCell>
                                                <TableCell>{data?.os}</TableCell>
                                                <TableCell>{data?.device}</TableCell>
                                                <TableCell>{data?.browser}</TableCell>
                                                <TableCell>{data?.location}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="9" className="text-center">
                                            No logs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

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
