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
import SuperAdminDepartmentsFilteration from '../SuperAdminComponent/SuperAdminDepartmentsFilteration';
import SuperAdminCategoryPiechart from '../SuperAdminComponent/SuperAdminCategoryPiechart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { getAllUser } from '../Services/auth.services';

function SuperAdminDashboard() {
  // const id = cookie.get('id');
  // const [allTickets, setAllTickets] = useState([]);
  // const [filteredTickets, setFilteredTickets] = useState([]);
  // const [market, setMarket] = useState('');
  // const [store, setStore] = useState('');
  // const [priority, setPriority] = useState('');
  // const [stores, setStores] = useState([]);
  // const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();
  // const [tickets, setTickets] = useState({
  //   total: 0,
  //   open: 0,
  //   closed: 0,
  //   complete: 0,
  //   Pending: 0,
  //   reopen: 0
  // });
  // const [totalStores, setTotalStores] = useState(0)
  // const [totalDistrictManagers, setTotalDistrictManagers] = useState(0)
  // const [totalMarketManagers, setTotalMarketManagers] = useState(0)
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  // const applyFilters = useCallback((ticketList) => {
  //   let filtered = [...ticketList];
  //   if (market) {
  //     filtered = filtered.filter(t => t.market === market);
  //   }
  //   if (store) {
  //     filtered = filtered.filter(t => t.store_name === store);
  //   }
  //   if (priority) {
  //     filtered = filtered.filter(t => t.priority === priority);
  //   }
  //   if (startDate && endDate) {
  //     filtered = filtered.filter(t => {
  //       const ticketDate = dayjs(t.createdAt);
  //       return ticketDate.isAfter(dayjs(startDate).startOf('day')) &&
  //         ticketDate.isBefore(dayjs(endDate).endOf('day'));
  //     });
  //   }

  //   setFilteredTickets(filtered);
  //   setTickets({
  //     total: filtered.length,
  //     open: filtered.filter((data) => data.status === "open").length,
  //     closed: filtered.filter((data) => data.status === "close").length,
  //     Pending: filtered.filter((data) => data.status === "pending").length,
  //     complete: filtered.filter((data) => data.agentstatus === "complete").length,
  //     reopen: filtered.filter((data) => data.status === "re-open").length,
  //   });
  // }, [market, store, priority]);

  // const fetchTickets = useCallback(async () => {
  //   try {
  //     const response = await getalltickets();
  //     const data = response.data.data;
  //     setAllTickets(data);
  //     applyFilters(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [applyFilters]);

  // const fetchAllStores = useCallback(async () => {
  //   setLoader(true);
  //   try {
  //     const response = await getAllStores();
  //     const filteredStores = market ? response.filter((s) => s.market === market) : [];
  //     setStores(filteredStores);
  //     setStore('');
  //     setTotalStores(response.length)
  //   } catch (error) {
  //     console.error('ERROR', error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // }, [market]);
  // const fetchGetAllUsersData = useCallback(async () => {
  //   try {
  //     const response = await getAllUser();
  //     const getAllDistrictManagersData = await response.data.data.filter((data) => data.department === "District Manager")
  //     const getAllMarketManagersData = await response.data.data.filter((data) => data.department === "Market Manager")
  //     // console.log(getAllDistrictManagersData.length);
  //     setTotalDistrictManagers(getAllDistrictManagersData.length || 0)
  //     setTotalMarketManagers(getAllMarketManagersData.length || 0)
  //   } catch (error) {
  //     console.log("ERROR", error.message);
  //   }
  // }, [])

  // useEffect(() => {
  //   fetchGetAllUsersData();
  // }, [fetchGetAllUsersData])
  // useEffect(() => {
  //   fetchTickets();
  // }, [id, fetchTickets]);

  // useEffect(() => {
  //   fetchAllStores();
  // }, [fetchAllStores]);

  // useEffect(() => {
  //   applyFilters(allTickets);
  // }, [market, store, priority, allTickets, applyFilters]);

  const id = cookie.get('id');
  const navigate = useNavigate();

  const [allTickets, setAllTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [market, setMarket] = useState('');
  const [store, setStore] = useState('');
  const [priority, setPriority] = useState('');
  const [stores, setStores] = useState([]);
  const [loader, setLoader] = useState(false);
  const [tickets, setTickets] = useState({
    total: 0,
    open: 0,
    closed: 0,
    complete: 0,
    Pending: 0,
    reopen: 0,
  });
  const [totalStores, setTotalStores] = useState(0);
  const [totalDistrictManagers, setTotalDistrictManagers] = useState(0);
  const [totalMarketManagers, setTotalMarketManagers] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 🟢 APPLY FILTERS FUNCTION
  const applyFilters = useCallback(
    (ticketList) => {
      let filtered = [...ticketList];

      // Filter by market
      if (market && market !== 'All') {
        filtered = filtered.filter((t) => t.market === market);
      }

      // Filter by store
      if (store && store !== 'All') {
        filtered = filtered.filter((t) => t.store_name === store);
      }

      // Filter by priority
      if (priority && priority !== 'All') {
        filtered = filtered.filter((t) => t.priority === priority);
      }

      // Filter by date range
      if (startDate && endDate) {
        filtered = filtered.filter((t) => {
          const ticketDate = dayjs(t.createdAt);
          return (
            ticketDate.isAfter(dayjs(startDate).startOf('day')) &&
            ticketDate.isBefore(dayjs(endDate).endOf('day'))
          );
        });
      }

      setFilteredTickets(filtered);
      setTickets({
        total: filtered.length,
        open: filtered.filter((d) => d.status === 'open').length,
        closed: filtered.filter((d) => d.status === 'close').length,
        Pending: filtered.filter((d) => d.status === 'pending').length,
        complete: filtered.filter((d) => d.agentstatus === 'complete').length,
        reopen: filtered.filter((d) => d.status === 're-open').length,
      });
    },
    [market, store, priority, startDate, endDate]
  );

  // 🟢 FETCH ALL TICKETS
  const fetchTickets = useCallback(async () => {
    try {
      const response = await getalltickets();
      const data = response.data.data || [];
      setAllTickets(data);
      applyFilters(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, [applyFilters]);

  // 🟢 FETCH ALL STORES
  const fetchAllStores = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getAllStores();
      setTotalStores(response.length);

      // If specific market selected, show only those stores
      const filteredStores =
        market && market !== 'All'
          ? response.filter((s) => s.market === market)
          : response;

      setStores(filteredStores);
    } catch (error) {
      console.error('ERROR fetching stores:', error.message);
    } finally {
      setLoader(false);
    }
  }, [market]);

  // 🟢 FETCH ALL USERS (Managers)
  const fetchGetAllUsersData = useCallback(async () => {
    try {
      const response = await getAllUser();
      const allUsers = response.data.data || [];
      const districtManagers = allUsers.filter(
        (u) => u.department === 'District Manager'
      );
      const marketManagers = allUsers.filter(
        (u) => u.department === 'Market Manager'
      );
      setTotalDistrictManagers(districtManagers.length);
      setTotalMarketManagers(marketManagers.length);
    } catch (error) {
      console.error('ERROR fetching users:', error.message);
    }
  }, []);

  // 🟢 REFRESH HANDLER (Reset Filters + Reload Data)
  const handleRefresh = async () => {
    setMarket('');
    setStore('');
    setPriority('');
    setStartDate(null);
    setEndDate(null);
    await fetchTickets();
    await fetchAllStores();
  };

  // Effects
  useEffect(() => {
    fetchGetAllUsersData();
  }, [fetchGetAllUsersData]);

  useEffect(() => {
    fetchTickets();
  }, [id, fetchTickets]);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  useEffect(() => {
    applyFilters(allTickets);
  }, [market, store, priority, startDate, endDate, allTickets, applyFilters]);

  return (
    <div className='container-fluid'>
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
              <MenuItem value="All">All</MenuItem>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
            <DatePicker
              label="To Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>

          <Button variant='contained' onClick={handleRefresh}>Refresh</Button>
          <ExporttoExcel filterationData={filteredTickets} />
          <SuperAdminCreateTicket fetchTickets={fetchTickets} />

        </div>
      </div>

      <div className="row">
        <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span> </Typography>
        <div className="col-12 mb-3">
          <div className="row g-3">

            {/* Ticket Cards */}
            {[
              { label: 'Open', value: tickets.open, path: '/superAdmin-open-tickets', color: '#6f2da8' },
              { label: 'Closed', value: tickets.closed, path: '/superAdmin-close-tickets', color: '#6f2da8' },
              { label: 'Complete', value: tickets.complete, path: '/superAdmin-complete-tickets', color: '#6f2da8' },
              { label: 'Pending', value: tickets.Pending, path: '/superAdmin-pending-tickets', color: '#6f2da8' },
              { label: 'Re-open', value: tickets.reopen, path: '/superAdmin-reopen-tickets', color: '#6f2da8' },
            ].map((ticket, idx) => (
              <div key={idx} className="col-6 col-sm-6 col-md-4 col-lg-2 d-flex">
                <div
                  className="bg-white rounded-3 text-center shadow-sm w-100 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    border: "3px solid #ff099b",
                    cursor: "pointer",
                    minHeight: 150,
                  }}
                  onClick={() => navigate(ticket.path)}
                >
                  <Typography
                    variant='h2'
                    className='fw-bold'
                    color={ticket.color}
                    sx={{
                      fontSize: { xs: '36px', sm: '38px', md: '42px', lg: '46px' }, // slightly bigger
                    }}
                  >
                    {ticket.value}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    className='fw-semibold'
                    sx={{
                      fontSize: { xs: '16px', sm: '17px', md: '18px', lg: '20px' }, // readable
                    }}
                  >
                    {ticket.label} {ticket.value}/{tickets.total}
                  </Typography>
                </div>
              </div>
            ))}

            {/* Additional Cards */}
            {[
              { label: 'Total Market Managers', value: totalMarketManagers },
              { label: 'Total District Managers', value: totalDistrictManagers },
              { label: 'Total Stores', value: totalStores },
            ].map((item, idx) => (
              <div key={`extra-${idx}`} className="col-6 col-sm-6 col-md-4 col-lg-2 d-flex">
                <div
                  className="bg-white p-3 rounded-3 text-center shadow-sm w-100 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    border: "3px solid #ff099b",
                    minHeight: 150,
                  }}
                >
                  <Typography
                    variant='h2'
                    className='fw-bold'
                    color='#ff6600'
                    sx={{
                      fontSize: { xs: '32px', sm: '34px', md: '38px', lg: '42px' }, // slightly bigger
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    className='fw-semibold'
                    sx={{
                      fontSize: { xs: '14px', sm: '15px', md: '16px', lg: '18px' },
                    }}
                  >
                    {item.label}
                  </Typography>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="col-md-8">
          <SuperAdminFilterationTickets datas={filteredTickets} />
          <SuperAdminDepartmentsFilteration datas={filteredTickets} />
        </div>
        <div className="col-md-4">
          <SuperAdminPiechart datas={filteredTickets} />
          <SuperAdminCategoryPiechart datas={filteredTickets} />
        </div>
      </div >
    </div >
  );
}

export default SuperAdminDashboard;
