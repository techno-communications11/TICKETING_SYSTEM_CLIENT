// // import React, { useState } from 'react';
// // import { Button, Menu, MenuItem } from '@mui/material';

// // function ExporttoExcel({filterationData}) {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const open = Boolean(anchorEl);

// //   const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = (option) => {
// //     setAnchorEl(null);
// //     if (option) {
// //       // Handle export logic here
// //       console.log(`Exporting ${option}`);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Button
// //         variant="contained"
// //         onClick={handleClick}
// //       >
// //         Export to Excel
// //       </Button>
// //       <Menu
// //         anchorEl={anchorEl}
// //         open={open}
// //         onClose={() => handleClose()}
// //       >
// //         <MenuItem onClick={() => handleClose('Market Wise')}>Market Wise</MenuItem>
// //         <MenuItem onClick={() => handleClose('Department Wise')}>Department Wise</MenuItem>
// //         <MenuItem onClick={() => handleClose('Store Wise')}>Store Wise</MenuItem>
// //       </Menu>
// //     </div>
// //   );
// // }

// // export default ExporttoExcel;


// // import React, { useState } from 'react';
// // import { Button, Menu, MenuItem } from '@mui/material';
// // import * as XLSX from 'xlsx';

// // function ExporttoExcel({ filterationData }) {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const open = Boolean(anchorEl);

// //   const markets = [
// //     "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
// //     "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
// //     "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
// //     "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
// //   ];

// //   const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = (option) => {
// //     setAnchorEl(null);
// //     if (option === 'Market Wise') {
// //       exportMarketWise();
// //     }
// //   };

// //   const exportMarketWise = () => {
// //     const reportData = markets.map(market => {
// //       const marketTickets = filterationData.filter(ticket => ticket.market === market);

// //       return {
// //         Name: market,
// //         Total: marketTickets.length,
// //         Open: marketTickets.filter(t => t.status?.toLowerCase() === 'open').length,
// //         Closed: marketTickets.filter(t => t.status?.toLowerCase() === 'close').length,
// //         Pending: marketTickets.filter(t => t.status?.toLowerCase() === 'pending').length,
// //         Complete: marketTickets.filter(t => t.agentstatus?.toLowerCase() === 'complete').length,
// //         Reopen: marketTickets.filter(t => t.status?.toLowerCase() === 're-open').length
// //       };
// //     });

// //     const worksheet = XLSX.utils.json_to_sheet(reportData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Market Wise Report");

// //     XLSX.writeFile(workbook, "MarketWise_Report.xlsx");
// //   };

// //   return (
// //     <div>
// //       <Button variant="contained" onClick={handleClick}>
// //         Export to Excel
// //       </Button>
// //       <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
// //         <MenuItem onClick={() => handleClose('Market Wise')}>Market Wise</MenuItem>
// //         <MenuItem onClick={() => handleClose('Department Wise')}>Department Wise</MenuItem>
// //         <MenuItem onClick={() => handleClose('Store Wise')}>Store Wise</MenuItem>
// //       </Menu>
// //     </div>
// //   );
// // }

// // export default ExporttoExcel;



// // import React, { useState } from 'react';
// // import { Button, Menu, MenuItem, Modal, Box, Typography, Select, MenuItem as SelectItem, FormControl, InputLabel, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
// // import * as XLSX from 'xlsx';

// // function ExporttoExcel({ filterationData }) {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [selectedDepartment, setSelectedDepartment] = useState('All');
// //   const [selectedStatuses, setSelectedStatuses] = useState({
// //     Total: true,
// //     Pending: true,
// //     Closed: true,
// //     Complete: true,
// //     Reopen: true,
// //   });

// //   const open = Boolean(anchorEl);

// //   const departments = [
// //     "All",
// //     "HR",
// //     "Sales",
// //     "Support",
// //     "IT",
// //     "Finance",
// //     "Operations",
// //     // Add your departments here
// //   ];

// //   const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleCloseMenu = (option) => {
// //     setAnchorEl(null);
// //     if (option === 'Market Wise') {
// //       exportMarketWise();
// //     } else if (option === 'Department Wise') {
// //       setModalOpen(true);
// //     } else if (option === 'Store Wise') {
// //       // Your logic for Store Wise (if any)
// //     }
// //   };

// //   const handleCheckboxChange = (event) => {
// //     const { name, checked } = event.target;
// //     setSelectedStatuses(prev => ({ ...prev, [name]: checked }));
// //   };

// //   const handleDepartmentChange = (event) => {
// //     setSelectedDepartment(event.target.value);
// //   };

// //   const exportMarketWise = () => {
// //     // Your existing exportMarketWise code
// //     const markets = [
// //       "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
// //       "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
// //       "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
// //       "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
// //     ];

// //     const reportData = markets.map(market => {
// //       const marketTickets = filterationData.filter(ticket => ticket.market === market);

// //       return {
// //         Name: market,
// //         Total: marketTickets.length,
// //         Open: marketTickets.filter(t => t.status?.toLowerCase() === 'open').length,
// //         Closed: marketTickets.filter(t => t.status?.toLowerCase() === 'close').length,
// //         Pending: marketTickets.filter(t => t.status?.toLowerCase() === 'pending').length,
// //         Complete: marketTickets.filter(t => t.agentstatus?.toLowerCase() === 'complete').length,
// //         Reopen: marketTickets.filter(t => t.status?.toLowerCase() === 're-open').length
// //       };
// //     });

// //     const worksheet = XLSX.utils.json_to_sheet(reportData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Market Wise Report");

// //     XLSX.writeFile(workbook, "MarketWise_Report.xlsx");
// //   };

// //   const departmentsList = [
// //   "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager", "District Manager", "General Ledger (GL)",
// //   "HR", "Finance", "IT", "Software India", "Internal", "Reporting", "Inventory", "Maintenance",
// //   "Sales", "Commission", "Compliance", "AR", "Employee", "Store"
// // ];

// // const exportDepartmentWise = () => {
// //   const reportData = departmentsList.map(dept => {
// //     const tickets = filterationData.filter(ticket => ticket.department === dept);

// //     return {
// //       Department: dept,
// //       Total: tickets.length,
// //       Open: tickets.filter(t => t.status?.toLowerCase() === 'open').length,
// //       Closed: tickets.filter(t => t.status?.toLowerCase() === 'close').length,
// //       Pending: tickets.filter(t => t.status?.toLowerCase() === 'pending').length,
// //       Reopen: tickets.filter(t => t.status?.toLowerCase() === 're-open').length,
// //     };
// //   });

// //   const worksheet = XLSX.utils.json_to_sheet(reportData);
// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet(workbook, worksheet, "Department Wise Report");

// //   XLSX.writeFile(workbook, "DepartmentWise_Report.xlsx");
// //   setModalOpen(false);  // agar tum modal use kar rahe ho to close karne ke liye
// // };



// //   const modalStyle = {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: 350,
// //     bgcolor: 'background.paper',
// //     borderRadius: 2,
// //     boxShadow: 24,
// //     p: 4,
// //   };

// //   return (
// //     <div>
// //       <Button variant="contained" onClick={handleClick}>
// //         Export to Excel
// //       </Button>
// //       <Menu anchorEl={anchorEl} open={open} onClose={() => handleCloseMenu()}>
// //         <MenuItem onClick={() => handleCloseMenu('Market Wise')}>Market Wise</MenuItem>
// //         <MenuItem onClick={() => handleCloseMenu('Department Wise')}>Department Wise</MenuItem>
// //         <MenuItem onClick={() => handleCloseMenu('Store Wise')}>Store Wise</MenuItem>
// //       </Menu>

// //       {/* Department Wise Modal */}
// //       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
// //         <Box sx={modalStyle}>
// //           <Typography variant="h6" mb={2}>Select Department and Statuses</Typography>

// //           <FormControl fullWidth sx={{ mb: 2 }}>
// //             <InputLabel id="department-select-label">Department</InputLabel>
// //             <Select
// //               labelId="department-select-label"
// //               value={selectedDepartment}
// //               label="Department"
// //               onChange={handleDepartmentChange}
// //             >
// //               {departments.map(dep => (
// //                 <SelectItem key={dep} value={dep}>{dep}</SelectItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <FormGroup>
// //             {Object.keys(selectedStatuses).map(status => (
// //               <FormControlLabel
// //                 key={status}
// //                 control={
// //                   <Checkbox
// //                     checked={selectedStatuses[status]}
// //                     onChange={handleCheckboxChange}
// //                     name={status}
// //                   />
// //                 }
// //                 label={status}
// //               />
// //             ))}
// //           </FormGroup>

// //           <Box mt={3} display="flex" justifyContent="space-between">
// //             <Button variant="outlined" onClick={() => setModalOpen(false)}>Close</Button>
// //             <Button variant="contained" onClick={exportDepartmentWise}>Export</Button>
// //           </Box>
// //         </Box>
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default ExporttoExcel;

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Button, Menu, MenuItem, Modal, Box, Typography,
//   Select, MenuItem as SelectItem, FormControl, InputLabel,
//   Checkbox, FormControlLabel, FormGroup
// } from '@mui/material';
// import * as XLSX from 'xlsx';
// import { getAllStores } from '../../Services/stores.services';

// function ExportToExcel({ filterationData }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   const [selectedDepartment, setSelectedDepartment] = useState('All');
//   const [selectedStore, setSelectedStore] = useState('All');
//   const [selectedMarket, setSelectedMarket] = useState('All');

//   const [selectedStatuses, setSelectedStatuses] = useState({
//     Total: true,
//     Pending: true,
//     Closed: true,
//     Reopen: true,
//   });

//   const[filteredStores,setFilteredStores]=useState([]);
//   const open = Boolean(anchorEl);

//   const departments = [
//     "All", "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager",
//     "District Manager", "General Ledger (GL)", "HR", "Finance", "IT", "Software India",
//     "Internal", "Reporting", "Inventory", "Maintenance", "Sales", "Commission",
//     "Compliance", "AR", "Employee", "Store"
//   ];
//   const marketList = [
//     "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
//     "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
//     "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
//     "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
//   ];

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const fetchAllStores=useCallback(async()=>{
//     try {
//       const response = await getAllStores();
//       const filterationStores=response.filter((stores)=>stores.market===selectedMarket)
//       setFilteredStores(filterationStores)
//     } catch (error) {
//       console.log("ERROR",error.message);
//     }
//   },[selectedMarket])

//   useEffect(()=>{
// fetchAllStores()
//   },[fetchAllStores,selectedMarket]);

//   const handleCloseMenu = (option) => {
//     setAnchorEl(null);
//     if (option === 'Market Wise') {
//       exportMarketWise();
//     } else if (option === 'Department Wise') {
//       setModalType('department');
//       setModalOpen(true);
//     } else if (option === 'Store Wise') {
//       setModalType('store');
//       setModalOpen(true);
//     }
//   };

//   const handleStatusChange = (e) => {
//     const { name, checked } = e.target;
//     setSelectedStatuses(prev => ({ ...prev, [name]: checked }));
//   };

//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//   };

//   const handleStoreChange = (e) => {
//     setSelectedStore(e.target.value);
//   };

//   const handleMarketChange = (e) => {
//     setSelectedMarket(e.target.value);
//   };

//   const exportMarketWise = () => {
//     const marketList = [
//       "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
//       "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
//       "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
//       "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
//     ];

//     const reportData = marketList.map(market => {
//       const marketTickets = filterationData.filter(ticket => ticket.market === market);

//       return {
//         Name: market,
//         Total: marketTickets.length,
//         Open: marketTickets.filter(t => t.status?.toLowerCase() === 'open').length,
//         Closed: marketTickets.filter(t => t.status?.toLowerCase() === 'close').length,
//         Pending: marketTickets.filter(t => t.status?.toLowerCase() === 'pending').length,
//         Complete: marketTickets.filter(t => t.agentstatus?.toLowerCase() === 'complete').length,
//         Reopen: marketTickets.filter(t => t.status?.toLowerCase() === 're-open').length
//       };
//     });

//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Market Wise Report");

//     XLSX.writeFile(workbook, "MarketWise_Report.xlsx");
//   };

//   const exportDepartmentWise = () => {
//     const departmentsList = [
//       "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager",
//       "District Manager", "General Ledger (GL)", "HR", "Finance", "IT", "Software India",
//       "Internal", "Reporting", "Inventory", "Maintenance", "Sales", "Commission",
//       "Compliance", "AR", "Employee", "Store"
//     ];

//     const reportData = departmentsList.map(dept => {
//       const tickets = filterationData.filter(ticket => ticket.department === dept);

//       return {
//         Department: dept,
//         Total: tickets.length,
//         Open: tickets.filter(t => t.status?.toLowerCase() === 'open').length,
//         Closed: tickets.filter(t => t.status?.toLowerCase() === 'close').length,
//         Pending: tickets.filter(t => t.status?.toLowerCase() === 'pending').length,
//         Reopen: tickets.filter(t => t.status?.toLowerCase() === 're-open').length,
//       };
//     });

//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Department Wise Report");

//     XLSX.writeFile(workbook, "DepartmentWise_Report.xlsx");
//     setModalOpen(false);
//   };

//   const exportStoreWise = () => {
//     const filtered = filterationData.filter(ticket => {
//       return (selectedDepartment === 'All' || ticket.department === selectedDepartment) &&
//         (selectedStore === 'All' || ticket.store === selectedStore) &&
//         (selectedMarket === 'All' || ticket.market === selectedMarket);
//     });

//     const result = {
//       Department: selectedDepartment,
//       Store: selectedStore,
//       Market: selectedMarket,
//     };

//     if (selectedStatuses.Total) result.Total = filtered.length;
//     if (selectedStatuses.Pending) result.Pending = filtered.filter(t => t.status?.toLowerCase() === 'pending').length;
//     if (selectedStatuses.Closed) result.Closed = filtered.filter(t => t.status?.toLowerCase() === 'close').length;
//     if (selectedStatuses.Reopen) result.Reopen = filtered.filter(t => t.status?.toLowerCase() === 're-open').length;

//     const worksheet = XLSX.utils.json_to_sheet([result]);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Store Wise Report");

//     XLSX.writeFile(workbook, "StoreWise_Report.xlsx");
//     setModalOpen(false);
//   };

//   const modalStyle = {
//     position: 'absolute',
//     top: '50%', left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     borderRadius: 2,
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <>
//       <Button variant="contained" onClick={handleClick}>Export to Excel</Button>

//       <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
//         <MenuItem onClick={() => handleCloseMenu('Market Wise')}>Market Wise</MenuItem>
//         <MenuItem onClick={() => handleCloseMenu('Department Wise')}>Department Wise</MenuItem>
//         <MenuItem onClick={() => handleCloseMenu('Store Wise')}>Store Wise</MenuItem>
//       </Menu>

//       {/* Shared Modal for Department and Store Wise */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" mb={2}>
//             {modalType === 'department' ? 'Department Wise Export' : 'Store Wise Export'}
//           </Typography>

//           {modalType === 'store' && (
//             <>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Department</InputLabel>
//                 <Select value={selectedDepartment} onChange={handleDepartmentChange}>
//                   {departments.map(dep => (
//                     <SelectItem key={dep} value={dep}>{dep}</SelectItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Market</InputLabel>
//                 <Select value={selectedMarket} onChange={handleMarketChange}>
//                   <SelectItem value="All">All</SelectItem>
//                   {marketList.map(m => (
//                     <SelectItem key={m} value={m}>{m}</SelectItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Store</InputLabel>
//                 <Select value={selectedStore} onChange={handleStoreChange}>
//                   <SelectItem value="All">All</SelectItem>
//                   {filteredStores.map(store => (
//                     <SelectItem key={store} value={store}>{store.store_name}</SelectItem>
//                   ))}
//                 </Select>
//               </FormControl>


//             </>
//           )}

//           <FormGroup>
//             {Object.keys(selectedStatuses).map(status => (
//               <FormControlLabel
//                 key={status}
//                 control={
//                   <Checkbox
//                     name={status}
//                     checked={selectedStatuses[status]}
//                     onChange={handleStatusChange}
//                   />
//                 }
//                 label={status}
//               />
//             ))}
//           </FormGroup>

//           <Box mt={3} display="flex" justifyContent="space-between">
//             <Button onClick={() => setModalOpen(false)}>Close</Button>
//             <Button
//               variant="contained"
//               onClick={modalType === 'department' ? exportDepartmentWise : exportStoreWise}
//             >
//               Export
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default ExportToExcel;



import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Menu, MenuItem, Modal, Box, Typography,
  Select, MenuItem as SelectItem, FormControl, InputLabel,
  Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import * as XLSX from 'xlsx';
import { getAllStores } from '../../Services/stores.services';

function ExportToExcel({ filterationData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStore, setSelectedStore] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState('All');

  const [selectedStatuses, setSelectedStatuses] = useState({
    Total: true,
    Pending: true,
    Closed: true,
    Reopen: true,
  });

  const [filteredStores, setFilteredStores] = useState([]);
  const open = Boolean(anchorEl);

  const departments = [
    "All", "SuperAdmin", "Admin", "Admin Manager", "Senior Manager", "Market Manager",
    "District Manager", "General Ledger (GL)", "HR", "Finance", "IT", "Software India",
    "Internal", "Reporting", "Inventory", "Maintenance", "Sales", "Commission",
    "Compliance", "AR", "Employee", "Store"
  ];

  const marketList = [
    "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO",
    "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE",
    "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO",
    "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
  ];

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = (option) => {
    setAnchorEl(null);
    if (option === 'Market Wise') {
      exportMarketWise();
    } else if (option === 'Department Wise') {
      setModalType('department');
      setModalOpen(true);
    } else if (option === 'Store Wise') {
      setModalType('store');
      setModalOpen(true);
    }
  };

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setSelectedStatuses(prev => ({ ...prev, [name]: checked }));
  };

  const handleDepartmentChange = (e) => setSelectedDepartment(e.target.value);
  const handleStoreChange = (e) => setSelectedStore(e.target.value);
  const handleMarketChange = (e) => setSelectedMarket(e.target.value);

  const fetchAllStores = useCallback(async () => {
    try {
      const response = await getAllStores();
      if (selectedMarket === 'All') {
        setFilteredStores(response);
      } else {
        const filtered = response.filter(store => store.market === selectedMarket);
        setFilteredStores(filtered);
      }
    } catch (error) {
      console.log("ERROR fetching stores", error.message);
    }
  }, [selectedMarket]);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  const exportMarketWise = () => {
    const reportData = marketList.map(market => {
      const marketTickets = filterationData.filter(ticket => ticket.market === market);

      return {
        Name: market,
        Total: marketTickets.length,
        Open: marketTickets.filter(t => t.status?.toLowerCase() === 'open').length,
        Closed: marketTickets.filter(t => t.status?.toLowerCase() === 'close').length,
        Pending: marketTickets.filter(t => t.status?.toLowerCase() === 'pending').length,
        Complete: marketTickets.filter(t => t.agentstatus?.toLowerCase() === 'complete').length,
        Reopen: marketTickets.filter(t => t.status?.toLowerCase() === 're-open').length
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Market Wise Report");

    XLSX.writeFile(workbook, "MarketWise_Report.xlsx");
  };

  const exportDepartmentWise = () => {
    const reportData = departments
      .filter(dep => dep !== "All")
      .map(dep => {
        const tickets = filterationData.filter(ticket => ticket.department === dep);

        return {
          Department: dep,
          Total: tickets.length,
          Open: tickets.filter(t => t.status?.toLowerCase() === 'open').length,
          Closed: tickets.filter(t => t.status?.toLowerCase() === 'close').length,
          Pending: tickets.filter(t => t.status?.toLowerCase() === 'pending').length,
          Reopen: tickets.filter(t => t.status?.toLowerCase() === 're-open').length,
        };
      });

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Department Wise Report");

    XLSX.writeFile(workbook, "DepartmentWise_Report.xlsx");
    setModalOpen(false);
  };

  const exportStoreWise = () => {
    const filtered = filterationData.filter(ticket => {
      const matchDepartment = selectedDepartment === 'All' || ticket.department === selectedDepartment;
      const matchStore = selectedStore === 'All' || ticket.store === selectedStore;
      const matchMarket = selectedMarket === 'All' || ticket.market === selectedMarket;
      return matchDepartment && matchStore && matchMarket;
    });

    const result = {
      Department: selectedDepartment,
      Market: selectedMarket,
      Store: selectedStore,
    };

    if (selectedStatuses.Total) result.Total = filtered.length;
    if (selectedStatuses.Pending) result.Pending = filtered.filter(t => t.status?.toLowerCase() === 'pending').length;
    if (selectedStatuses.Closed) result.Closed = filtered.filter(t => t.status?.toLowerCase() === 'close').length;
    if (selectedStatuses.Reopen) result.Reopen = filtered.filter(t => t.status?.toLowerCase() === 're-open').length;

    const worksheet = XLSX.utils.json_to_sheet([result]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Store Wise Report");

    XLSX.writeFile(workbook, "StoreWise_Report.xlsx");
    setModalOpen(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>Export to Excel</Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleCloseMenu('Market Wise')}>Market Wise</MenuItem>
        <MenuItem onClick={() => handleCloseMenu('Department Wise')}>Department Wise</MenuItem>
        <MenuItem onClick={() => handleCloseMenu('Store Wise')}>Store Wise</MenuItem>
      </Menu>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            {modalType === 'department' ? 'Department Wise Export' : 'Store Wise Export'}
          </Typography>

          {modalType === 'store' && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Department</InputLabel>
                <Select value={selectedDepartment} onChange={handleDepartmentChange}>
                  {departments.map(dep => (
                    <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Market</InputLabel>
                <Select value={selectedMarket} onChange={handleMarketChange}>
                  <SelectItem value="All">All</SelectItem>
                  {marketList.map(market => (
                    <SelectItem key={market} value={market}>{market}</SelectItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Store</InputLabel>
                <Select value={selectedStore} onChange={handleStoreChange}>
                  <SelectItem value="All">All</SelectItem>
                  {filteredStores.map(store => (
                    <SelectItem key={store._id} value={store.store_name}>{store.store_name}</SelectItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <FormGroup>
            {Object.keys(selectedStatuses).map(status => (
              <FormControlLabel
                key={status}
                control={
                  <Checkbox
                    name={status}
                    checked={selectedStatuses[status]}
                    onChange={handleStatusChange}
                  />
                }
                label={status}
              />
            ))}
          </FormGroup>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button onClick={() => setModalOpen(false)}>Close</Button>
            <Button
              variant="contained"
              onClick={modalType === 'department' ? exportDepartmentWise : exportStoreWise}
            >
              Export
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ExportToExcel;
