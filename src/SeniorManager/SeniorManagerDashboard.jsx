// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Button,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from '@mui/material';
// import cookie from 'js-cookie';
// import { getalltickets } from '../Services/tickets.services';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import { getAllStores } from '../Services/stores.services';
// import { useSocket } from '../Context/socket.context';
// import { useNavigate } from 'react-router-dom';
// import { useGlobalState } from '../Context/context';
// import SeniorManagerFilterationTickets from './SeniorManagerFilterationTickets';
// import SeniorManagerPiechart from './SeniorManagerPiechart';
// import { useSelector } from 'react-redux';

// function SeniorManagerDashboard() {
//   const { setFilterationsData } = useGlobalState();
//   const decodedTickets = decodeToken();
//   const { department, subDepartment } = decodedTickets;
//   const id = cookie.get('id');
//   const [loader, setLoader] = useState(false);
//   const [filterationData, setFilteration] = useState([]);
//   const [market, setMarket] = useState('');
//   const [store, setStore] = useState('');
//   const [priority, setPriority] = useState('');
//   const [stores, setStores] = useState([]);
//   const navigate = useNavigate();
//   const [currentUserDatas, setCurrentUserDatas] = useState([]);
//   const [tickets, setTickets] = useState({
//     total: 0,
//     open: 0,
//     closed: 0,
//     complete: 0,
//     Pending: 0,
//     reopen: 0,
//   });
//   const { socket } = useSocket();

//   const { user } = useSelector((state) => state.currentUser);

//   const fetchUser = useCallback(async () => {
//     const currentDatauser = await user;
//     setCurrentUserDatas(currentDatauser)
//     console.log(currentDatauser?.managedDepartments)
//   }, [user]);

//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);
//   const fetchTickets = useCallback(async () => {
//     try {
//       const response = await getalltickets();
//       let filtered = response.data.data.filter(
//         (data) => currentUserDatas?.managedDepartments?.includes(data.department) || data.userId === id || data.assignerId === id
//       );
//       // Apply filters
//       if (market) filtered = filtered.filter((data) => data.market === market);
//       if (store) filtered = filtered.filter((data) => data.store_name === store);
//       if (priority) filtered = filtered.filter((data) => data.priority === priority);

//       setTickets({
//         total: filtered.length,
//         open: filtered.filter((data) => data.status === 'open').length,
//         closed: filtered.filter((data) => data.status === 'close').length,
//         Pending: filtered.filter((data) => data.status === 'pending').length,
//         complete: filtered.filter((data) => data.agentstatus === 'complete').length,
//         reopen: filtered.filter((data) => data.status === 're-open').length,
//       });

//       setFilteration(filtered);
//       console.log(filtered);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [department, currentUserDatas, subDepartment, id, market, store, priority]);

//   const fetchAllStores = useCallback(async () => {
//     setLoader(true);
//     try {
//       const response = await getAllStores();
//       const filteredStores = market ? response.filter((s) => s.market === market) : [];
//       setStores(filteredStores);
//       setLoader(false);
//       setStore(''); // Reset store when market changes
//     } catch (error) {
//       setLoader(false);
//       console.error('ERROR', error.message);
//     } finally {
//       setLoader(false);
//     }
//   }, [market]);

//   useEffect(() => {
//     fetchTickets();
//   }, [fetchTickets]);
//   useEffect(() => {
//     fetchAllStores();
//   }, [fetchAllStores]);
//   useEffect(() => {
//     if (socket) {
//       socket.on('receiveNotification', fetchTickets);
//     }

//     return () => {
//       if (socket) {
//         socket.off('receiveNotification', fetchTickets);
//       }
//     };
//   }, [socket]);

//   if (!tickets) {
//     return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <CircularProgress />
//     </div>
//   }
//   return (
//     <div className='container-fluid'>
//       <div className='row'>
//         <div
//           className='col-md-12 d-flex align-items-center mb-3 bg-white py-3 px-2 rounded-3 shadow-sm'
//           style={{ gap: '20px 20px' }}
//         >
//           <FormControl size='small' sx={{ minWidth: 120 }}>
//             <InputLabel>Priority</InputLabel>
//             <Select value={priority} label='Priority' onChange={(e) => setPriority(e.target.value)}>
//               <MenuItem value=''>All</MenuItem>
//               <MenuItem value='Low'>Low</MenuItem>
//               <MenuItem value='Medium'>Medium</MenuItem>
//               <MenuItem value='High'>High</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl size='small' sx={{ minWidth: 180 }}>
//             <InputLabel>Market</InputLabel>
//             <Select
//               value={market}
//               label='Market'
//               onChange={(e) => setMarket(e.target.value)}
//             >
//               {[
//                 "ARIZONA",
//                 "BAY AREA",
//                 "COLORADO",
//                 "DALLAS",
//                 "EL PASO",
//                 "FLORIDA",
//                 "HOUSTON",
//                 "LOS ANGELES",
//                 "MEMPHIS",
//                 "NASHVILLE",
//                 "NORTH CAROLINA",
//                 "OXNARD",
//                 "PALMDALE",
//                 "SACRAMENTO",
//                 "SAN DIEGO",
//                 "SAN FRANCISCO",
//                 "SAN JOSE",
//                 "SOLANO COUNTY",
//               ].map((marketName, index) => (
//                 <MenuItem key={index} value={marketName}>{marketName}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl size='small' sx={{ minWidth: 200 }} disabled={!market}>
//             <InputLabel>Stores</InputLabel>
//             <Select value={store} label='Store' onChange={(e) => setStore(e.target.value)}>
//               <MenuItem value=''>All</MenuItem>
//               {loader ? < CircularProgress size={25} sx={{ alignItems: "center" }} /> : stores.map((storeItem, index) => (
//                 <MenuItem key={index} value={storeItem.store_name}>{storeItem.store_name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Button variant='contained' onClick={fetchTickets}>Refresh</Button>
//         </div>
//       </div>

//       <div className='row'>
//         <Typography variant='h6' className='mb-3'>
//           Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span>
//         </Typography>

//         <div className='col-md-8'>
//           <div className='row'>
//             <div className='col-md-12 d-flex align-items-center' style={{ gap: '20px 20px' }}>
//               <div
//                 className='bg-white p-3 rounded-3 text-center'
//                 style={{
//                   width: '180px',
//                   border: '3px solid #ff099b',
//                   boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
//                   cursor: "pointer"
//                 }}
//                 onClick={() => { navigate('/senior-managers-review-open-tickets'); setFilterationsData(filterationData) }}
//               >
//                 <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
//                   {tickets.open}
//                 </Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
//                   Open {tickets.open}/{tickets.total}
//                 </Typography>
//               </div>
//               <div
//                 className='bg-white p-3 rounded-3 text-center'
//                 style={{
//                   width: '180px',
//                   border: '3px solid #ff099b',
//                   boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
//                   cursor: "pointer"
//                 }}
//                 onClick={() => { navigate('/senior-managers-review-close-tickets'); setFilterationsData(filterationData) }}
//               >
//                 <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
//                   {tickets.closed}
//                 </Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
//                   Closed {tickets.closed}/{tickets.total}
//                 </Typography>
//               </div>
//               <div
//                 className='bg-white p-3 rounded-3 text-center'
//                 style={{
//                   width: '180px',
//                   border: '3px solid #ff099b',
//                   boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
//                   cursor: "pointer"
//                 }}
//                 onClick={() => [navigate('/manager-complete-ticket')]}
//               >
//                 <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
//                   {tickets.complete}
//                 </Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
//                   Complete
//                 </Typography>
//               </div>
//               <div
//                 className='bg-white p-3 rounded-3 text-center'
//                 style={{
//                   width: '180px',
//                   border: '3px solid #ff099b',
//                   boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
//                   cursor: "pointer"
//                 }}
//                 onClick={() => { navigate('/manager-pending-ticket'); setFilterationsData(filterationData) }}
//               >
//                 <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
//                   {tickets.Pending}
//                 </Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
//                   Pending {tickets.Pending}/{tickets.total}
//                 </Typography>
//               </div>
//               <div
//                 className='bg-white p-3 rounded-3 text-center'
//                 style={{
//                   width: '180px',
//                   border: '3px solid #ff099b',
//                   boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
//                   cursor: "pointer"
//                 }}
//                 onClick={() => { navigate('/manager-reopen-ticket'); setFilterationsData(filterationData) }}
//               >
//                 <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
//                   {tickets.reopen}
//                 </Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
//                   Re-open {tickets.Pending}/{tickets.total}
//                 </Typography>
//               </div>
//             </div>
//           </div>
//           <div className='row'>
//             <div className='col-12'>
//               <SeniorManagerFilterationTickets datas={filterationData} />
//             </div>
//           </div>
//         </div>

//         <div className='col-md-4'>
//           <SeniorManagerPiechart datas={filterationData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SeniorManagerDashboard

import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import cookie from 'js-cookie';
import { getalltickets } from '../Services/tickets.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import { getAllStores } from '../Services/stores.services';
import { useSocket } from '../Context/socket.context';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../Context/context';
import SeniorManagerFilterationTickets from './SeniorManagerFilterationTickets';
import SeniorManagerPiechart from './SeniorManagerPiechart';
import { useSelector } from 'react-redux';
import SeniorManagerCreateTickets from './SeniorManagerCreateTickets';

function SeniorManagerDashboard() {
  const { setFilterationsData } = useGlobalState();
  const decodedTickets = decodeToken();
  const { department, subDepartment } = decodedTickets;
  const id = cookie.get('id');
  const [loader, setLoader] = useState(false);
  const [filterationData, setFilteration] = useState([]);
  const [market, setMarket] = useState('');
  const [store, setStore] = useState('');
  const [priority, setPriority] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const [currentUserDatas, setCurrentUserDatas] = useState([]);
  const [departments] = useState([
    "Admin", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR", "IT", "Software India", "Internal", "Reporting", "Inventory", "Maintenance", "Commission", "Compliance", "MIS",
    "AR", "Managment", "SCM", "QA", "Vigilence", "MIS", "Data Analytics", "Supervisor", "Local IT"
  ])
  const [tickets, setTickets] = useState({
    total: 0,
    open: 0,
    closed: 0,
    complete: 0,
    Pending: 0,
    reopen: 0,
  });
  const { socket } = useSocket();
  const { user } = useSelector((state) => state.currentUser);

  const fetchUser = useCallback(async () => {
    const currentDatauser = await user;
    setCurrentUserDatas(currentDatauser);
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchTickets = useCallback(async () => {
    try {
      const response = await getalltickets();
      let filtered = response.data.data.filter(
        (data) =>
          currentUserDatas?.managedDepartments?.includes(data.department) ||
          data.userId === id ||
          data.assignerId === id
      );

      // ✅ Apply filters
      if (market) filtered = filtered.filter((data) => data.market === market);
      if (store) filtered = filtered.filter((data) => data.store_name === store);
      if (priority) filtered = filtered.filter((data) => data.priority === priority);
      if (departmentFilter) filtered = filtered.filter((data) => data.department === departmentFilter);

      // ✅ Apply search filter (ticketId, name, email, phone)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (data) =>
            data.ticketId?.toLowerCase().includes(term) ||
            data.name?.toLowerCase().includes(term) ||
            data.email?.toLowerCase().includes(term) ||
            data.phone?.toString().includes(term)
        );
      }

      setTickets({
        total: filtered.length,
        open: filtered.filter((data) => data.status === 'open').length,
        closed: filtered.filter((data) => data.status === 'close').length,
        Pending: filtered.filter((data) => data.status === 'pending').length,
        complete: filtered.filter((data) => data.agentstatus === 'complete').length,
        reopen: filtered.filter((data) => data.status === 're-open').length,
      });

      setFilteration(filtered);
    } catch (error) {
      console.error(error);
    }
  }, [department, currentUserDatas, subDepartment, id, market, store, priority, departmentFilter, searchTerm]);

  const fetchAllStores = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getAllStores();
      const filteredStores = market ? response.filter((s) => s.market === market) : [];
      setStores(filteredStores);
      setLoader(false);
      setStore('');
    } catch (error) {
      setLoader(false);
      console.error('ERROR', error.message);
    }
  }, [market]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveNotification', fetchTickets);
    }
    return () => {
      if (socket) {
        socket.off('receiveNotification', fetchTickets);
      }
    };
  }, [socket, fetchTickets]);

  if (!tickets) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* 🔍 Filters Row */}
        <div
          className="col-md-12 d-flex flex-wrap align-items-center mb-3 bg-white py-3 px-2 rounded-3 shadow-sm"
          style={{ gap: '15px' }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Market</InputLabel>
            <Select value={market} label="Market" onChange={(e) => setMarket(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {[
                'ARIZONA',
                'BAY AREA',
                'COLORADO',
                'DALLAS',
                'EL PASO',
                'FLORIDA',
                'HOUSTON',
                'LOS ANGELES',
                'MEMPHIS',
                'NASHVILLE',
                'NORTH CAROLINA',
                'OXNARD',
                'PALMDALE',
                'SACRAMENTO',
                'SAN DIEGO',
                'SAN FRANCISCO',
                'SAN JOSE',
                'SOLANO COUNTY',
              ].map((m, i) => (
                <MenuItem key={i} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }} disabled={!market}>
            <InputLabel>Store</InputLabel>
            <Select value={store} label="Store" onChange={(e) => setStore(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {loader ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                stores.map((s, i) => (
                  <MenuItem key={i} value={s.store_name}>
                    {s.store_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* 🏢 Department Filter */}
          {/* <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={departmentFilter}
              label="Department"
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {departments?.map((dept, idx) => (
                <MenuItem key={idx} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          {/* 🔍 Search Bar */}
          <TextField
            size="small"
            sx={{ width: 250 }}
            placeholder="Search by Name, Ticket ID, Email, Phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchTickets}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="outlined" onClick={fetchTickets}>
            Refresh
          </Button>
          <SeniorManagerCreateTickets fetchTickets={fetchTickets} />
        </div>
      </div>

      {/* 📊 Dashboard Stats */}
      <div className="row">
        <Typography variant="h6" className="mb-3">
          Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span>
        </Typography>

        <div className="col-md-8">
          {/* Ticket Status Cards */}
          <div className="row">
            <div className="col-md-12 d-flex flex-wrap align-items-center" style={{ gap: '20px' }}>
              {[
                { label: 'Open', value: tickets.open, path: '/senior-managers-review-open-tickets' },
                { label: 'Closed', value: tickets.closed, path: '/senior-managers-review-close-tickets' },
                { label: 'Complete', value: tickets.complete, path: '/manager-complete-ticket' },
                { label: 'Pending', value: tickets.Pending, path: '/manager-pending-ticket' },
                { label: 'Re-open', value: tickets.reopen, path: '/manager-reopen-ticket' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-3 text-center"
                  style={{
                    width: '180px',
                    border: '3px solid #ff099b',
                    boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigate(item.path);
                    setFilterationsData(filterationData);
                  }}
                >
                  <Typography variant="h2" sx={{ fontSize: '35px' }} className="fw-bold" color="#6f2da8">
                    {item.value}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: '19px' }} className="fw-semibold">
                    {item.label} {item.value}/{tickets.total}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <SeniorManagerFilterationTickets datas={filterationData} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <SeniorManagerPiechart datas={filterationData} />
        </div>
      </div>
    </div>
  );
}

export default SeniorManagerDashboard;
