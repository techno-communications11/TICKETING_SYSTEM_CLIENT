import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import cookie from 'js-cookie';
import { getalltickets } from '../Services/tickets.services';
import { decodeToken } from '../Utils/decodedToken.utils';
import { getAllStores } from '../Services/stores.services';
import { useSocket } from '../Context/socket.context';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../Context/context';
// import MarketManagerFilterationTickets from './MarketManagerFilterationTickets';
// import MarketManagersPiechart from './MarketManagersPiechart';
import DistrictManagerFilterationTickets from './DistrictManagerFilterationTickets';
import DistrictManagersPiechart from './DistrictManagersPiechart';
import DistrictManagerCreateTickets from './DistrictManagerCreateTickets';


function DistrictManagerDashboard() {
    const { filterationsData, setFilterationsData } = useGlobalState();
    const decodedTickets = decodeToken();
    const { department, subDepartment } = decodedTickets;
    const id = cookie.get('id');
    const [loader, setLoader] = useState(false);
    const [filterationData, setFilteration] = useState([]);
    const [market, setMarket] = useState('');
    const [store, setStore] = useState('');
    const [priority, setPriority] = useState('');
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState({
        total: 0,
        open: 0,
        closed: 0,
        complete: 0,
        Pending: 0,
        reopen: 0,
    });
    const { socket } = useSocket();

    const fetchTickets = useCallback(async () => {
        try {
            const response = await getalltickets();
            console.log(response.data.data)
            let filtered = response.data.data.filter(
                (data) =>
                    data.districtManager_id === id
            );
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
    }, [department, subDepartment, id, market, store, priority]);

    const fetchAllStores = useCallback(async () => {
        setLoader(true);
        try {
            const response = await getAllStores();
            const filteredStores = market ? response.filter((s) => s.market === market) : [];
            setStores(filteredStores);
            setLoader(false);
            setStore(''); // Reset store when market changes
        } catch (error) {
            setLoader(false);
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

    if (!tickets) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <CircularProgress />
        </div>
    }
    return (
        <div className='container'>
            <div className='row'>
                <div
                    className='col-md-12 d-flex align-items-center mb-3 bg-white py-3 px-2 rounded-3 shadow-sm'
                    style={{ gap: '20px 20px' }}
                >
                    <FormControl size='small' sx={{ minWidth: 120 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select value={priority} label='Priority' onChange={(e) => setPriority(e.target.value)}>
                            <MenuItem value=''>All</MenuItem>
                            <MenuItem value='Low'>Low</MenuItem>
                            <MenuItem value='Medium'>Medium</MenuItem>
                            <MenuItem value='High'>High</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size='small' sx={{ minWidth: 180 }}>
                        <InputLabel>Market</InputLabel>
                        <Select
                            value={market}
                            label='Market'
                            onChange={(e) => setMarket(e.target.value)}
                        >
                            {[
                                "ARIZONA",
                                "BAY AREA",
                                "COLORADO",
                                "DALLAS",
                                "EL PASO",
                                "FLORIDA",
                                "HOUSTON",
                                "LOS ANGELES",
                                "MEMPHIS",
                                "NASHVILLE",
                                "NORTH CAROLINA",
                                "OXNARD",
                                "PALMDALE",
                                "SACRAMENTO",
                                "SAN DIEGO",
                                "SAN FRANCISCO",
                                "SAN JOSE",
                                "SOLANO COUNTY",
                            ].map((marketName, index) => (
                                <MenuItem key={index} value={marketName}>{marketName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size='small' sx={{ minWidth: 200 }} disabled={!market}>
                        <InputLabel>Stores</InputLabel>
                        <Select value={store} label='Store' onChange={(e) => setStore(e.target.value)}>
                            <MenuItem value=''>All</MenuItem>
                            {loader ? < CircularProgress size={25} sx={{ alignItems: "center" }} /> : stores.map((storeItem, index) => (
                                <MenuItem key={index} value={storeItem.store_name}>{storeItem.store_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant='contained' onClick={fetchTickets}>Refresh</Button>
                    <DistrictManagerCreateTickets fetchTickets={fetchTickets} />
                </div>
            </div>

            <div className='row'>
                <Typography variant='h6' className='mb-3'>
                    Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span>
                </Typography>

                <div className='col-md-8'>
                    <div className='row'>
                        <div className='col-md-12 d-flex align-items-center' style={{ gap: '20px 20px' }}>
                            <div
                                className='bg-white p-3 rounded-3 text-center'
                                style={{
                                    width: '180px',
                                    border: '3px solid #ff099b',
                                    boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                                    cursor: "pointer"
                                }}
                                onClick={() => { navigate('/manager-open-ticket'); setFilterationsData(filterationData) }}
                            >
                                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                                    {tickets.open}
                                </Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                                    Open {tickets.open}/{tickets.total}
                                </Typography>
                            </div>
                            <div
                                className='bg-white p-3 rounded-3 text-center'
                                style={{
                                    width: '180px',
                                    border: '3px solid #ff099b',
                                    boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                                    cursor: "pointer"
                                }}
                                onClick={() => { navigate('/manager-close-ticket'); setFilterationsData(filterationData) }}
                            >
                                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                                    {tickets.closed}
                                </Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                                    Closed {tickets.closed}/{tickets.total}
                                </Typography>
                            </div>
                            {/* <div
                  className='bg-white p-3 rounded-3 text-center'
                  style={{
                    width: '180px',
                    border: '3px solid #ff099b',
                    boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                    cursor: "pointer"
                  }}
                  onClick={() => [navigate('/manager-complete-ticket')]}
                >
                  <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                    {tickets.complete}
                  </Typography>
                  <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                    Complete
                  </Typography>
                </div> */}
                            <div
                                className='bg-white p-3 rounded-3 text-center'
                                style={{
                                    width: '180px',
                                    border: '3px solid #ff099b',
                                    boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                                    cursor: "pointer"
                                }}
                                onClick={() => { navigate('/manager-pending-ticket'); setFilterationsData(filterationData) }}
                            >
                                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                                    {tickets.Pending}
                                </Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                                    Pending {tickets.Pending}/{tickets.total}
                                </Typography>
                            </div>
                            <div
                                className='bg-white p-3 rounded-3 text-center'
                                style={{
                                    width: '180px',
                                    border: '3px solid #ff099b',
                                    boxShadow: '0px 4px 10px rgba(255, 9, 155, 0.3)',
                                    cursor: "pointer"
                                }}
                                onClick={() => { navigate('/manager-reopen-ticket'); setFilterationsData(filterationData) }}
                            >
                                <Typography variant='h2' sx={{ fontSize: '35px' }} className='fw-bold' color='#6f2da8'>
                                    {tickets.reopen}
                                </Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: '19px' }} className='fw-semibold'>
                                    Re-open {tickets.Pending}/{tickets.total}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <DistrictManagerFilterationTickets datas={filterationData} />
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <DistrictManagersPiechart datas={filterationData} />
                </div>
            </div>
        </div>
    );
}

export default DistrictManagerDashboard