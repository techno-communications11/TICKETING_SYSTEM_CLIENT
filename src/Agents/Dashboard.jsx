// import React, { useCallback, useEffect, useState } from 'react'
// import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// import AgentTicketPiechart from './AgentTicketPiechart'
// import AgentRecentTickets from './AgentRecentTickets'
// import SearchIcon from '@mui/icons-material/Search';
// import { decodeToken } from '../Utils/decodedToken.utils';
// import { getalltickets } from '../Services/tickets.services';
// import cookie from 'js-cookie';
// import { getAllStores } from '../Services/stores.services';
// function Dashboard() {
//     const decodedTickets = decodeToken();
//     const { department, subDepartment } = decodedTickets;
//       const [market, setMarket] = useState('');
//     const id = cookie.get('id');
//     const [filterationData, setFilteration] = useState([])
//     const [tickets, setTickets] = useState({
//         total: 0,
//         open: 0,
//         closed: 0,
//         complete: 0,
//         Pending: 0,
//         reopen: 0
//     });
//     const fetchTickets = useCallback(async () => {
//         try {
//             const resposne = await getalltickets();
//             const filterartion = resposne.data.data.filter((data) => data.assignerId
//                 === id);
//             setTickets({
//                 total: filterartion.length,
//                 open: filterartion.filter((data) => data.status === "open").length,
//                 closed: filterartion.filter((data) => data.status === "close").length,
//                 Pending: filterartion.filter((data) => data.status === "pending").length,
//                 complete: filterartion.filter((data) => data.agentstatus === "complete").length,
//                 reopen: filterartion.filter((data) => data.status === "re-open").length,
//             })
//             setFilteration(filterartion);
//         } catch (error) {
//             console.log(error);
//         }
//     }, [setTickets, setFilteration])
//     const fetchAllStores = useCallback(async () => {
//         setLoader(true);
//         try {
//             const response = await getAllStores();
//             const filteredStores = market ? response.filter((s) => s.market === market) : [];
//             setStores(filteredStores);
//             setLoader(false);
//             setStore(''); // Reset store when market changes
//         } catch (error) {
//             setLoader(false);
//             console.error('ERROR', error.message);
//         } finally {
//             setLoader(false);
//         }
//     }, [market]);
//     useEffect(() => {
//         fetchTickets();
//     }, [id, fetchTickets]);
//     useEffect(() => {
//         fetchAllStores();
//     }, [fetchAllStores]);

//     return (
//         <div className='container'>
//             <div className="row">
//                 <div className="col-md-12 d-flex align-items-center mb-3 bg-white py-3 px -2 rounded-3 shadow-sm" style={{ gap: "20px 20px" }}>
//                     <div className="">
//                         <FormControl size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Priority</InputLabel>
//                             <Select
//                                 label="Priority"
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </div>
//                     <div className="">
//                         <FormControl size="small" sx={{ minWidth: 180 }}>
//                             <InputLabel>Market</InputLabel>
//                             <Select
//                                 label="Priority"
//                                 onChange={(e)=>{setMarket(e.target.value)}}
//                             >
//                                 {[
//                                     "ARIZONA",
//                                     "BAY AREA",
//                                     "COLORADO",
//                                     "DALLAS",
//                                     "EL PASO",
//                                     "FLORIDA",
//                                     "HOUSTON",
//                                     "LOS ANGELES",
//                                     "MEMPHIS",
//                                     "NASHVILLE",
//                                     "NORTH CAROLINA",
//                                     "OXNARD",
//                                     "PALMDALE",
//                                     "SACRAMENTO",
//                                     "SAN DIEGO",
//                                     "SAN FRANCISCO",
//                                     "SAN JOSE",
//                                     "SOLANO COUNTY",
//                                 ].map((marketName, index) => (
//                                     <MenuItem key={index} value={marketName}>{marketName}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </div>
//                     <div className="">
//                         <FormControl size="small" sx={{ minWidth: 200 }}>
//                             <InputLabel>Stores</InputLabel>
//                             <Select
//                                 label="Priority"
//                             >
//                                 <MenuItem value="">All</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </div>
//                     <div className="">
//                         <TextField
//                             size="small"
//                             placeholder="Search..."
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
//                     <div className="">
//                         <Button variant='contained' onClick={fetchTickets}>Refresh</Button>
//                     </div>
//                 </div>
//             </div>
//             <div className="row">
//                 <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span> </Typography>
//                 <div className="col-md-8">
//                     <div className="row">
//                         <div className="col-md-12 d-flex align-items-center" style={{ gap: "20px 20px" }}>
//                             <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.open}</Typography>
//                                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Open</Typography>
//                             </div>
//                             <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.closed}</Typography>
//                                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Closed</Typography>
//                             </div>
//                             <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.complete}</Typography>
//                                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Complete</Typography>
//                             </div>
//                             <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.Pending}</Typography>
//                                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Pending</Typography>
//                             </div>
//                             <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.reopen}</Typography>
//                                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Re-open</Typography>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-12">
//                             <AgentRecentTickets datas={filterationData} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <AgentTicketPiechart datas={filterationData} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard


import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import AgentTicketPiechart from './AgentTicketPiechart';
import AgentRecentTickets from './AgentRecentTickets';
import SearchIcon from '@mui/icons-material/Search';
import { decodeToken } from '../Utils/decodedToken.utils';
import { getalltickets } from '../Services/tickets.services';
import cookie from 'js-cookie';
import { getAllStores } from '../Services/stores.services';
import { useSocket } from '../Context/socket.context';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../Context/context';

function Dashboard() {
    const {  setFilterationsData } = useGlobalState();
  const decodedTickets = decodeToken();
  const id = cookie.get('id');
  const { socket } = useSocket();

  const [priority, setPriority] = useState('');
  const [market, setMarket] = useState('');
  const [store, setStore] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [filterationData, setFilteration] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [stores, setStores] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState({
    total: 0,
    open: 0,
    closed: 0,
    complete: 0,
    Pending: 0,
    reopen: 0
  });

  // const fetchTickets = useCallback(async () => {
  //   try {
  //     const resposne = await getalltickets();
  //     const filtered = resposne.data.data.filter((data) => data.assignerId === id);
  //     setTickets({
  //       total: filtered.length,
  //       open: filtered.filter((data) => data.status === "open").length,
  //       closed: filtered.filter((data) => data.status === "close").length,
  //       Pending: filtered.filter((data) => data.status === "pending").length,
  //       complete: filtered.filter((data) => data.agentstatus === "complete").length,
  //       reopen: filtered.filter((data) => data.status === "re-open").length
  //     });
  //     setFilteration(filtered);
  //     setFilteredTickets(filtered);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [id]);

  const fetchTickets = useCallback(async () => {
      try {
        const response = await getalltickets();
        let filtered = response.data.data.filter(
          (data) =>
            data.assignerId === id
        );
  
        // Apply filters
        if (market) filtered = filtered.filter((data) => data.market === market);
        if (store) filtered = filtered.filter((data) => data.store_name === store);
        if (priority) filtered = filtered.filter((data) => data.priority === priority);
  
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
    }, [ id, market, store, priority]);

  const fetchAllStores = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getAllStores();
      const filteredStores = market ? response.filter((s) => s.market === market) : [];
      setStores(filteredStores);
      setStore('');
    } catch (error) {
      console.error('ERROR', error.message);
    } finally {
      setLoader(false);
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
  }, [socket]);
  useEffect(() => {
    const filtered = filterationData.filter((ticket) => {
      return (
        (priority ? ticket.priority === priority : true) &&
        (market ? ticket.market === market : true) &&
        (store ? ticket.store === store : true) &&
        (searchQuery
          ? ticket.ticketId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.store?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.phone?.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
      );
    });
    setFilteredTickets(filtered);
  }, [priority, market, store, searchQuery, filterationData]);

  const resetFilters = () => {
    setPriority('');
    setMarket('');
    setStore('');
    setSearchQuery('');
    fetchTickets();
  };

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 d-flex align-items-center mb-3 bg-white py-3 px-2 rounded-3 shadow-sm" style={{ gap: "20px 20px" }}>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='Low'>Low</MenuItem>
              <MenuItem value='Medium'>Medium</MenuItem>
              <MenuItem value='High'>High</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Market</InputLabel>
            <Select
              label="Market"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            >
              {["ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON",
                "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE",
                "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"].map((m, i) => (
                  <MenuItem key={i} value={m}>{m}</MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Stores</InputLabel>
            <Select
              label="Stores"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              {stores.map((s, i) => (
                <MenuItem key={i} value={s.store}>{s.store}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search by Ticket ID, Store or Phone"
            sx={{ width: 300 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

          <Button variant='contained' onClick={fetchTickets}>Refresh</Button>
          <Button variant='outlined' color='secondary' onClick={resetFilters}>Reset</Button>

        </div>
      </div>

      <div className="row">
        <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span> </Typography>
        <div className="col-md-8">
          <div className="row">
            <div className='col-md-12 d-flex align-items-center' style={{ gap: '20px 20px' }}>
              <div
                className='bg-white p-3 rounded-3 text-center'
                style={{
                  width: '140px',
                  border: '3px solid #ff099b',
                  boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                  cursor: "pointer"
                }}
                onClick={() => { navigate('/agent-open-ticket'),setFilterationsData(filterationData) }}
              >
                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                  {tickets.open}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                  Open
                </Typography>
              </div>
              <div
                className='bg-white p-3 rounded-3 text-center'
                style={{
                  width: '140px',
                  border: '3px solid #ff099b',
                  boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                  cursor: "pointer"
                }}
                onClick={() => { navigate('/agent-close-ticket'),setFilterationsData(filterationData) }}
              >
                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                  {tickets.closed}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                  Closed
                </Typography>
              </div>
              <div
                className='bg-white p-3 rounded-3 text-center'
                style={{
                  width: '140px',
                  border: '3px solid #ff099b',
                  boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                  cursor: "pointer"
                }}
                onClick={() => { navigate('/agent-complete-ticket'),setFilterationsData(filterationData) }}
              >
                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                  {tickets.complete}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                  Complete
                </Typography>
              </div>
              <div
                className='bg-white p-3 rounded-3 text-center'
                style={{
                  width: '140px',
                  border: '3px solid #ff099b',
                  boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                  cursor: "pointer"
                }}
                onClick={() => { navigate('/agent-pending-ticket'),setFilterationsData(filterationData) }}
              >
                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                  {tickets.Pending}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                  Pending
                </Typography>
              </div>
              <div
                className='bg-white p-3 rounded-3 text-center'
                style={{
                  width: '140px',
                  border: '3px solid #ff099b',
                  boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                  cursor: "pointer"
                }}
                onClick={() => { navigate('/agent-reopen-ticket'),setFilterationsData(filterationData) }}
              >
                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                  {tickets.reopen}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                  Re-open
                </Typography>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <AgentRecentTickets datas={filteredTickets} loader={loader}/>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <AgentTicketPiechart datas={filteredTickets} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
