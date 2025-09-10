
import React, { useCallback, useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, InputAdornment, IconButton,
    CircularProgress,
    Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';
import { getAllUsers } from '../Services/auth.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import cookie from 'js-cookie';
import { getalltickets } from '../Services/tickets.services';
import { useSelector } from 'react-redux';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


function SenioeManagerAgents() {
    const [tickets, setTickets] = useState([]);
    const [pendingCounts, setPendingCounts] = useState({});
    const [completedCounts, setCompletedCounts] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const decodedTickets = decodeToken();
    const { department } = decodedTickets;
    const id = cookie.get('id');
    const { user } = useSelector((state) => state.currentUser);
    const [currentUserDatas, setCurrentUserDatas] = useState([]);

    const fetchUser = useCallback(async () => {
        const currentDatauser = await user;
        setCurrentUserDatas(currentDatauser);
    }, [user]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
// console.log(currentUserDatas,'currentUserDatas')
    const fetchAllAgents = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllUsers();
            const filteredAgents = response.data.data.filter(
                (data) =>
                    data._id !== id &&
                    currentUserDatas.managedDepartments?.includes(data.department)
            );

            // Sort by subDepartment (Managers first)
            filteredAgents.sort((a, b) => {
                if (a.subDepartment === 'Manager') return -1;
                if (b.subDepartment === 'Manager') return 1;
                return 0;
            });

            setTickets(filteredAgents);

            const allTickets = await getalltickets();
            const ticketData = allTickets.data.data;

            const countsPending = {};
            const countsCompleted = {};

            filteredAgents.forEach((agent) => {
                const pending = ticketData.filter(
                    (ticket) =>
                        ticket.assignerId === agent._id &&
                        ticket.agentstatus !== 'complete'
                );

                const completed = ticketData.filter(
                    (ticket) =>
                        ticket.assignerId === agent._id &&
                        ticket.agentstatus === 'complete'
                );

                countsPending[agent._id] = pending.length;
                countsCompleted[agent._id] = completed.length;
            });

            setPendingCounts(countsPending);
            setCompletedCounts(countsCompleted);
        } catch (error) {
            console.log("ERROR", error.message);
        } finally {
            setLoading(false);
        }
    }, [department, id, currentUserDatas.managedDepartments]);

    useEffect(() => {
        fetchAllAgents();
    }, [fetchAllAgents]);

    const filteredTickets = tickets.filter(
        (ticket) =>
            ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedTickets = filteredTickets.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const generateExcelReport = async (ticket) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Agent Report');

        // Add columns
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Department', key: 'department', width: 20 },
            { header: 'Role', key: 'role', width: 15 },
            { header: 'Total Tickets', key: 'total', width: 15 },
            { header: 'Pending Tickets', key: 'pending', width: 15 },
            { header: 'Completed Tickets', key: 'completed', width: 15 },
            { header: 'Re-open Tickets', key: 'reopen', width: 15 },
        ];

        // Filter tickets for this user
        const allTickets = await getalltickets();
        const userTickets = allTickets.data.data.filter(t => t.assignerId === ticket._id);

        const total = userTickets.length;
        const pending = userTickets.filter(t => t.agentstatus !== 'complete').length;
        const completed = userTickets.filter(t => t.agentstatus === 'complete').length;
        const reopen = userTickets.filter(t => t.agentstatus === 're-open').length;

        worksheet.addRow({
            name: ticket.name,
            email: ticket.email,
            department: ticket.department,
            role: ticket.subDepartment,
            total,
            pending,
            completed,
            reopen
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${ticket.name}-Report.xlsx`);
    };

    return (
        <div className="container">
            <BasicBreadcrumbs name={"Agents"} />
            <div className="row my-4">
                <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
                    <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            sx={{ width: 300 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton sx={{ color: '#6f2da8' }}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>

            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#6f2da8' }}>
                                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                                <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                                <TableCell sx={{ color: 'white' }}>Department</TableCell>
                                <TableCell sx={{ color: 'white' }}>Sub-Department</TableCell>
                                <TableCell sx={{ color: 'white' }}>Pending Tickets</TableCell>
                                <TableCell sx={{ color: 'white' }}>Completed Tickets</TableCell>
                                <TableCell sx={{ color: 'white' }}>Report</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : paginatedTickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <span style={{ fontWeight: 500, color: '#777' }}>No Tickets Found</span>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedTickets.map((ticket) => (
                                    <TableRow key={ticket._id} hover>
                                        <TableCell>{ticket.name}</TableCell>
                                        <TableCell>{ticket.email}</TableCell>
                                        <TableCell>{ticket.phone}</TableCell>
                                        <TableCell>{ticket.department}</TableCell>
                                        <TableCell>{ticket.subDepartment}</TableCell>
                                        <TableCell>{pendingCounts[ticket._id] ?? 'Loading...'}</TableCell>
                                        <TableCell>{completedCounts[ticket._id] ?? 'Loading...'}</TableCell>
                                        <TableCell>
                                            <IconButton sx={{ color: '#6f2da8' }} onClick={() => generateExcelReport(ticket)}>
                                            <DownloadIcon color="primary" />
                                        </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                {filteredTickets.length > itemsPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={Math.ceil(filteredTickets.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </div>
    );
}

export default SenioeManagerAgents;



// function SenioeManagerAgents() {
//     const [tickets, setTickets] = useState([]);
//     const [pendingCounts, setPendingCounts] = useState({});
//     const [completedCounts, setCompletedCounts] = useState({});
//     const [searchTerm, setSearchTerm] = useState("");
//     const [loading, setLoading] = useState(false);
//     const decodedTickets = decodeToken();
//     const { department } = decodedTickets;
//     const id = cookie.get('id');
//     const { user } = useSelector((state) => state.currentUser);
//   const [currentUserDatas, setCurrentUserDatas] = useState([]);

//     const fetchUser = useCallback(async () => {
//         const currentDatauser = await user;
//         setCurrentUserDatas(currentDatauser)
//     }, [user]);

//     useEffect(() => {
//         fetchUser();
//     }, [fetchUser]);
//     const fetchAllAgents = useCallback(async () => {
//         setLoading(true)
//         try {
//             const response = await getAllUsers();
//             const filteredAgents = response.data.data.filter(
//                 (data) => data._id !== id && currentUserDatas.managedDepartments.includes(data.department)
//             );
//             setTickets(filteredAgents);

//             const allTickets = await getalltickets();
//             const ticketData = allTickets.data.data;

//             const countsPending = {};
//             const countsCompleted = {};

//             filteredAgents.forEach((agent) => {
//                 const pending = ticketData.filter(
//                     (ticket) =>
//                         ticket.assignerId === agent._id &&
//                         ticket.agentstatus !== 'complete'
//                 );

//                 const completed = ticketData.filter(
//                     (ticket) =>
//                         ticket.assignerId === agent._id &&
//                         ticket.agentstatus === 'complete'
//                 );

//                 countsPending[agent._id] = pending.length;
//                 countsCompleted[agent._id] = completed.length;
//             });

//             setPendingCounts(countsPending);
//             setCompletedCounts(countsCompleted);
//         } catch (error) {
//             setLoading(false)
//             console.log("ERROR", error.message);
//         } finally {
//             setLoading(false)
//         }
//     }, [department, id]);

//     useEffect(() => {
//         fetchAllAgents();
//     }, [fetchAllAgents]);

//     return (
//         <div className="container">
//             <BasicBreadcrumbs name={"Agents"} />
//             <div className="row my-4">
//                 <div className="col-md-12 py-3 bg-white rounded-3 shadow-sm">
//                     <div className="d-flex align-items-center" style={{ gap: "10px" }}>
//                         <TextField
//                             size="small"
//                             placeholder="Search..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             sx={{ width: 300 }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton>
//                                             <SearchIcon />
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>

//             <Box sx={{ mt: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: '#6f2da8' }}>
//                                 <TableCell sx={{ color: 'white' }}>Name</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Email</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Phone</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Department</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Pending Tickets</TableCell>
//                                 <TableCell sx={{ color: 'white' }}>Completed Tickets</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? <TableRow > <TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow> : tickets.length === 0 ? <TableRow>
//                                 <TableCell colSpan={8} align="center">
//                                     <span style={{ fontWeight: 500, color: '#777' }}>No Tickets Found</span>
//                                 </TableCell>
//                             </TableRow> : tickets
//                                 .filter((ticket) =>
//                                     ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                                     ticket.email.toLowerCase().includes(searchTerm.toLowerCase())
//                                 )
//                                 .map((ticket) => (
//                                     <TableRow key={ticket._id} hover>
//                                         <TableCell>{ticket.name}</TableCell>
//                                         <TableCell>{ticket.email}</TableCell>
//                                         <TableCell>{ticket.phone}</TableCell>
//                                         <TableCell>{ticket.department}</TableCell>
//                                         <TableCell>{pendingCounts[ticket._id] ?? 'Loading...'}</TableCell>
//                                         <TableCell>{completedCounts[ticket._id] ?? 'Loading...'}</TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </div>
//     );
// }

// export default SenioeManagerAgents