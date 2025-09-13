import React, { useCallback, useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import cookie from 'js-cookie';
import { getalltickets } from '../Services/tickets.services';
import SuperAdminFilterationTickets from './SuperAdminFilterationTickets';
import SuperAdminPiechart from './SuperAdminPiechart';
function SuperAdminTicket() {
    const id = cookie.get('id');
    const [filterationData, setFilteration] = useState([])
    const [tickets, setTickets] = useState({
        total: 0,
        open: 0,
        closed: 0,
        complete: 0,
        Pending: 0,
        reopen: 0
    });
    const fetchTickets = useCallback(async () => {
        try {
            const resposne = await getalltickets();
            const filterartion = resposne.data.data;;
            setTickets({
                total: filterartion.length,
                open: filterartion.filter((data) => data.status === "open").length,
                closed: filterartion.filter((data) => data.status === "close").length,
                Pending: filterartion.filter((data) => data.status === "pending").length,
                complete: filterartion.filter((data) => data.agentstatus === "complete").length,
                reopen: filterartion.filter((data) => data.status === "re-open").length,
            })
            setFilteration(filterartion);
            console.log(filterartion);
        } catch (error) {
            console.log(error);
        }
    }, [setTickets])

    useEffect(() => {
        fetchTickets();
    }, [id, fetchTickets]);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 d-flex align-items-center mb-3 bg-white py-3 px -2 rounded-3 shadow-sm" style={{ gap: "20px 20px" }}>
                    <div className="">
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                label="Priority"
                            // onChange={(e) => setPriority(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="">
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Market</InputLabel>
                            <Select
                                // value={priority}
                                label="Priority"
                            // onChange={(e) => setPriority(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="">
                        <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Stores</InputLabel>
                            <Select
                                // value={priority}
                                label="Priority"
                            // onChange={(e) => setPriority(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="">
                        <Button variant='contained' onClick={fetchTickets}>Refresh</Button>
                    </div>
                </div>
            </div>
            <div className="row">
                <Typography variant='h6' className='mb-3'>Total Tickets: <span style={{ color: '#6f2da8' }}>{tickets.total}</span> </Typography>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center" style={{ gap: "20px 20px" }}>
                            <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.open}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Open</Typography>
                            </div>
                            <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.closed}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Closed</Typography>
                            </div>
                            <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.complete}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Complete</Typography>
                            </div>
                            <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.Pending}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Pending</Typography>
                            </div>
                            <div className="bg-white p-3 rounded-3 text-center" style={{ width: "140px", border: "3px solid #ff099b", boxShadow: "0px 4px 10px rgba(255, 9, 155, 0.3)", }}>
                                <Typography variant='h2' sx={{ fontSize: "35px" }} className='fw-bold' color='#6f2da8'>{tickets.reopen}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: "19px" }} className='fw-semibold'>Re-open</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <SuperAdminFilterationTickets datas={filterationData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <SuperAdminPiechart datas={filterationData} />
                </div>
            </div>
        </div>
    )
}

export default SuperAdminTicket