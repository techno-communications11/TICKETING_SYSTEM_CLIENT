import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import StoreTicketPiechart from './StoreTicketPiechart'
import StoreRecentTickets from './StoreRecentTickets'
import SearchIcon from '@mui/icons-material/Search';
import { getalltickets } from '../Services/tickets.services';
import cookie from 'js-cookie'
import StoreCreateTickteBtnCompo from './StoreCreateTickteBtnCompo';
import { useSelector } from 'react-redux';
import { getAllStores } from '../Services/stores.services';
function StoreDashboard() {
  // const id = cookie.get('id');
  // const { user } = useSelector((state) => state.currentUser);
  // const [currentDatauser, setCurrentDatauser] = useState([])
  // const [loader, setLoader] = useState(false);
  // const [store, setStore] = useState('');

  // const getCurrentUser = useCallback(async () => {
  //   const curremntUsre = await user;
  //   setCurrentDatauser(curremntUsre)
  // }, [id])
  // useEffect(() => {
  //   getCurrentUser()
  // }, [getCurrentUser])
  // const [filterationData, setFilteration] = useState([]);
  // const [stores, setStores] = useState([]);
  // const fetchAllStores = useCallback(async () => {
  //   setLoader(true);
  //   try {
  //     const response = await getAllStores();
  //     const filteredStores = market ? response.filter((s) => s.market === currentDatauser) : [];
  //     setStores(filteredStores);
  //   } catch (error) {
  //     console.error('ERROR', error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // }, [currentDatauser]);
  // useEffect(() => {
  //   fetchAllStores()
  // }, [fetchAllStores])
  // const [tickets, setTickets] = useState({
  //   total: 0,
  //   open: 0,
  //   closed: 0,
  //   complete: 0,
  //   Pending: 0,
  //   reopen: 0
  // });
  // const fetchTickets = useCallback(async () => {
  //   try {
  //     const resposne = await getalltickets();
  //     const filterartion = resposne.data.data.filter((data) => data.store_id === id || data.userId === id);
  //     setTickets({
  //       total: filterartion.length,
  //       open: filterartion.filter((data) => data.status === "open").length,
  //       closed: filterartion.filter((data) => data.status === "close").length,
  //       Pending: filterartion.filter((data) => data.status === "pending").length,
  //       complete: filterartion.filter((data) => data.status === "complete").length,
  //       reopen: filterartion.filter((data) => data.status === "re-open").length,
  //     })
  //     setFilteration(filterartion);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [setTickets])

  // useEffect(() => {
  //   fetchTickets();
  // }, [id, fetchTickets]);
  const id = cookie.get('id');
  const { user } = useSelector((state) => state.currentUser);
  const [currentDatauser, setCurrentDatauser] = useState({});
  const [loader, setLoader] = useState(false);
  const [store, setStore] = useState('');
  const [priority, setPriority] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [filterationData, setFilteration] = useState([]);
  const [stores, setStores] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    complete: 0,
    pending: 0,
    reopen: 0,
  });
  const getCurrentUser = useCallback(async () => {
    if (user) setCurrentDatauser(user);
  }, [user]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  const fetchTickets = useCallback(async () => {
    try {
      const response = await getalltickets();
      const data = response.data.data || [];
      const userTickets = data.filter(
        (t) => t.store_id === id || t.userId === id
      );
      setTickets(userTickets);
      setTicketStats({
        total: userTickets?.length,
        open: userTickets.filter((t) => t.status === 'open').length,
        closed: userTickets.filter((t) => t.status === 'close').length,
        complete: userTickets.filter((t) => t.status === 'complete').length,
        pending: userTickets.filter((t) => t.status === 'pending').length,
        reopen: userTickets.filter((t) => t.status === 're-open').length,
      });

      setFilteration(userTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStore = store
        ? store === 'All'
          ? true
          : ticket.store_name === store
        : true;

      const matchesPriority = priority
        ? ticket.priority === priority
        : true;

      const matchesSearch = searchQuery
        ? (ticket.title || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (ticket.description || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        : true;

      return matchesStore && matchesPriority && matchesSearch;
    });
  }, [tickets, store, priority, searchQuery]);

  useEffect(() => {
    setFilteration(filteredTickets);
  }, [filteredTickets]);
  const fetchAllStores = useCallback(async () => {
    setLoader(true);
    try {
      const response = await getAllStores();
      const filteredStores = currentDatauser?.markets ? response.filter((s) => s.market === currentDatauser?.markets) : [];
      setStores(filteredStores);
    } catch (error) {
      console.error('ERROR', error.message);
    } finally {
      setLoader(false);
    }
  }, [currentDatauser?.markets]);
  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores])
  // ✅ Reset all filters
  const handleRefresh = async () => {
    setPriority('');
    setStore('All');
    setSearchQuery('');
    await fetchTickets();
  };
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 d-flex align-items-center mb-3 bg-white py-3 px -2 rounded-3 shadow-sm" style={{ gap: "20px 20px" }}>
          <div className="">
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
          </div>
          <div className="">
            <TextField
              fullWidth
              size='small'
              defaultValue={currentDatauser?.markets}
              InputProps={{ readOnly: true }}
              disabled
              variant="outlined"
            />
          </div>
          <div className="">
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Stores</InputLabel>
              <Select
                value={store}
                label='Store' onChange={(e) => setStore(e.target.value)}
              >
                <MenuItem value="All">All Stores</MenuItem>
                {loader ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  stores.map((storeItem, index) => (
                    <MenuItem key={index} value={storeItem.store_name}>
                      {storeItem.store_name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "0px 10px" }}>
            <Button variant='contained' onClick={handleRefresh}>Refresh</Button>
            <StoreCreateTickteBtnCompo fetchTickets={fetchTickets} />
          </div>
        </div>
      </div>
      <div className="row">
        <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{ticketStats.total}</span> </Typography>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12 d-flex align-items-center" style={{ gap: "20px 20px" }}>
              <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{ticketStats.open}</Typography>
                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Open {ticketStats.open}/{ticketStats.total}</Typography>
              </div>
              <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{ticketStats.closed}</Typography>
                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Closed {ticketStats.closed}/{ticketStats.total}</Typography>
              </div>
              <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{ticketStats.complete}</Typography>
                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Complete {ticketStats.complete}/{ticketStats.total}</Typography>
              </div>
              <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{ticketStats.pending}</Typography>
                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Pending {ticketStats.pending}/{ticketStats.total}</Typography>
              </div>
              <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{ticketStats.reopen}</Typography>
                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Re-open {ticketStats.reopen}/{ticketStats.total}</Typography>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <StoreRecentTickets datas={filterationData} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <StoreTicketPiechart datas={filterationData} />
        </div>
      </div>
    </div>
  )
}

export default StoreDashboard