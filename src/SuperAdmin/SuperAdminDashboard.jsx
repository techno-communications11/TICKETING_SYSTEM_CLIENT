// import React, { useCallback, useEffect, useState } from 'react'
// import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// import cookie from 'js-cookie';
// import { getalltickets } from '../Services/tickets.services';
// import SuperAdminFilterationTickets from './SuperAdminFilterationTickets';
// import SuperAdminPiechart from './SuperAdminPiechart';
// import ExporttoExcel from '../Components/ExporttoExcel/ExporttoExcel';
// import { getAllStores } from '../Services/stores.services';


// function SuperAdminDashboard() {
//   const id = cookie.get('id');
//   const [filterationData, setFilteration] = useState([])
//   const [market, setMarket] = useState('');
//   const [stores, setStores] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [tickets, setTickets] = useState({
//     total: 0,
//     open: 0,
//     closed: 0,
//     complete: 0,
//     Pending: 0,
//     reopen: 0
//   });
//   const fetchTickets = useCallback(async () => {
//     try {
//       const resposne = await getalltickets();
//       const filterartion = resposne.data.data;;
//       setTickets({
//         total: filterartion.length,
//         open: filterartion.filter((data) => data.status === "open").length,
//         closed: filterartion.filter((data) => data.status === "close").length,
//         Pending: filterartion.filter((data) => data.status === "pending").length,
//         complete: filterartion.filter((data) => data.agentstatus === "complete").length,
//         reopen: filterartion.filter((data) => data.status === "re-open").length,
//       })
//       setFilteration(filterartion);
//       console.log(filterartion);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [setTickets])

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
//   }, [id, fetchTickets]);
//   useEffect(() => {
//     fetchAllStores();
//   }, [fetchAllStores]);

//   return (
//     <div className='container'>
//       <div className="row">
//         <div className="col-md-12 d-flex align-items-center mb-3 bg-white py-3 px -2 rounded-3 shadow-sm" style={{ gap: "20px 20px" }}>
//           <div className="">
//             <FormControl size="small" sx={{ minWidth: 120 }}>
//               <InputLabel>Priority</InputLabel>
//               <Select
//                 // value={priority}
//                 label="Priority"
//               // onChange={(e) => setPriority(e.target.value)}
//               >
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="High">High</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//           <div className="">
//             <FormControl size="small" sx={{ minWidth: 180 }}>
//               <InputLabel>Market</InputLabel>
//               <Select
//                 value={market}
//                 label='Market'
//                 onChange={(e) => setMarket(e.target.value)}
//               >
//                 {[
//                   "ARIZONA",
//                   "BAY AREA",
//                   "COLORADO",
//                   "DALLAS",
//                   "EL PASO",
//                   "FLORIDA",
//                   "HOUSTON",
//                   "LOS ANGELES",
//                   "MEMPHIS",
//                   "NASHVILLE",
//                   "NORTH CAROLINA",
//                   "OXNARD",
//                   "PALMDALE",
//                   "SACRAMENTO",
//                   "SAN DIEGO",
//                   "SAN FRANCISCO",
//                   "SAN JOSE",
//                   "SOLANO COUNTY",
//                 ].map((marketName, index) => (
//                   <MenuItem key={index} value={marketName}>{marketName}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           <div className="">
//             <FormControl size="small" sx={{ minWidth: 200 }}>
//               <InputLabel>Stores</InputLabel>
//               <Select value={store} label='Store' onChange={(e) => setStore(e.target.value)}>
//                 <MenuItem value=''>All</MenuItem>
//                 {loader ? < CircularProgress size={25} sx={{ alignItems: "center" }} /> : stores.map((storeItem, index) => (
//                   <MenuItem key={index} value={storeItem.store_name}>{storeItem.store_name}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           <div className="">
//             <Button variant='contained' onClick={fetchTickets}>Refresh</Button>
//           </div>
//           <div className="">
//             <ExporttoExcel filterationData={filterationData} />
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span> </Typography>
//         <div className="col-md-8">
//           <div className="row">
//             <div className="col-md-12 d-flex align-items-center" style={{ gap: "20px 20px" }}>
// boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//               <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", 
//                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.open}</Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Open</Typography>
// cursor:"pointer"              </div>
//               <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.closed}</Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Closed</Typography>
//               </div>
//               <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.complete}</Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Complete</Typography>
//               </div>
//               <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.Pending}</Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Pending</Typography>
//               </div>
//               <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
//                 <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.reopen}</Typography>
//                 <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Re-open</Typography>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-12">
//               <SuperAdminFilterationTickets datas={filterationData} />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <SuperAdminPiechart datas={filterationData} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SuperAdminDashboard

import React, { useCallback, useEffect, useState } from 'react';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import cookie from 'js-cookie';
import { getalltickets } from '../Services/tickets.services';
import SuperAdminFilterationTickets from './SuperAdminFilterationTickets';
import SuperAdminPiechart from './SuperAdminPiechart';
import ExporttoExcel from '../Components/ExporttoExcel/ExporttoExcel';
import { getAllStores } from '../Services/stores.services';
import { useNavigate } from 'react-router-dom';
import SuperAdminCreateTicket from './SuperAdminCreateTicket';

function SuperAdminDashboard() {
  const id = cookie.get('id');
  const [allTickets, setAllTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [market, setMarket] = useState('');
  const [store, setStore] = useState('');
  const [priority, setPriority] = useState('');
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

  const applyFilters = useCallback((ticketList) => {
    let filtered = [...ticketList];
    if (market) {
      filtered = filtered.filter(t => t.market === market);
    }
    if (store) {
      filtered = filtered.filter(t => t.store_name === store);
    }
    if (priority) {
      filtered = filtered.filter(t => t.priority === priority);
    }

    setFilteredTickets(filtered);
    setTickets({
      total: filtered.length,
      open: filtered.filter((data) => data.status === "open").length,
      closed: filtered.filter((data) => data.status === "close").length,
      Pending: filtered.filter((data) => data.status === "pending").length,
      complete: filtered.filter((data) => data.agentstatus === "complete").length,
      reopen: filtered.filter((data) => data.status === "re-open").length,
    });
  }, [market, store, priority]);

  const fetchTickets = useCallback(async () => {
    try {
      const response = await getalltickets();
      const data = response.data.data;
      setAllTickets(data);
      applyFilters(data);
    } catch (error) {
      console.log(error);
    }
  }, [applyFilters]);

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
  }, [id, fetchTickets]);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  useEffect(() => {
    applyFilters(allTickets);
  }, [market, store, priority, allTickets, applyFilters]);

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 d-flex align-items-center mb-3 bg-white py-3 px-2 rounded-3 shadow-sm" style={{ gap: "20px 20px" }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Market</InputLabel>
            <Select value={market} label='Market' onChange={(e) => setMarket(e.target.value)}>
              {[
                "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON",
                "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE",
                "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"
              ].map((marketName, index) => (
                <MenuItem key={index} value={marketName}>{marketName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Stores</InputLabel>
            <Select value={store} label='Store' onChange={(e) => setStore(e.target.value)}>
              <MenuItem value=''>All</MenuItem>
              {loader ? (
                <MenuItem disabled><CircularProgress size={20} /></MenuItem>
              ) : (
                stores.map((storeItem, index) => (
                  <MenuItem key={index} value={storeItem.store_name}>{storeItem.store_name}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <Button variant='contained' onClick={() => fetchTickets()}>Refresh</Button>
          <ExporttoExcel filterationData={filteredTickets} />
          <SuperAdminCreateTicket fetchTickets={fetchTickets} />

        </div>
      </div>

      <div className="row">
        <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span> </Typography>
        <div className="col-md-8">
          <div className="row mb-3 d-flex" style={{ gap: "0px 10px" }}>

            <div className="bg-white p-3 rounded-3 text-center"
              style={{
                width: "140px",
                border: "3px solid #ff099b",
                boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)",
                cursor: "pointer"
              }}
              onClick={() => { navigate('/superAdmin-open-tickets') }}
            >
              <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>
                {tickets.open}
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Open</Typography>
            </div>
            <div className="bg-white p-3 rounded-3 text-center"
              style={{
                width: "140px",
                border: "3px solid #ff099b",
                boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)",
                cursor: "pointer"
              }}
              onClick={() => { navigate('/superAdmin-close-tickets') }}
            >
              <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>
                {tickets.closed}
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Closed</Typography>
            </div>
            <div className="bg-white p-3 rounded-3 text-center"
              style={{
                width: "140px",
                border: "3px solid #ff099b",
                boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)",
                cursor: "pointer"
              }}
              onClick={() => { navigate('/superAdmin-complete-tickets') }}
            >
              <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>
                {tickets.complete}
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Complete</Typography>
            </div>
            <div className="bg-white p-3 rounded-3 text-center"
              style={{
                width: "140px",
                border: "3px solid #ff099b",
                boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)",
                cursor: "pointer"
              }}
              onClick={() => { navigate('/superAdmin-pending-tickets') }}
            >
              <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>
                {tickets.Pending}
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Pending</Typography>
            </div>
            <div className="bg-white p-3 rounded-3 text-center"
              style={{
                width: "140px",
                border: "3px solid #ff099b",
                boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)",
                cursor: "pointer"
              }}
              onClick={() => { navigate('/superAdmin-reopen-tickets') }}
            >
              <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>
                {tickets.reopen}
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Re-open</Typography>
            </div>
          </div>
          <SuperAdminFilterationTickets datas={filteredTickets} />
        </div>
        <div className="col-md-4">
          <SuperAdminPiechart datas={filteredTickets} />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
