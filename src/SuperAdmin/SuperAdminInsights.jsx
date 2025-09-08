import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import SuperAdminTicketWiseInsigh from './SuperAdminTicketWiseInsigh';
import SuperAdminMarketWise from './SuperAdminMarketWise';
import SuperAdminDistrictWise from './SuperAdminDistrictWise';
import SuperAdminMarketManagerWise from './SuperAdminMarketManagerWise';
import BasicBreadcrumbs from '../Components/BasicBreadcrumbs/BasicBreadcrumbs';

function SuperAdminInsights() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div className="container my-5">
            <BasicBreadcrumbs name={"Insights"} />
            <div className="row mb-4">
                <div className="col-12">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="insights tabs"
                        >
                            <Tab label="Tickets" />
                            <Tab label="Market Wise" />
                            <Tab label="District Manager Wise" />
                            <Tab label="Market Manager Wise" />
                            <Tab label="Store Wise" />
                        </Tabs>
                    </Box>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {activeTab === 0 && <div><SuperAdminTicketWiseInsigh /></div>}
                    {activeTab === 1 && <div><SuperAdminMarketWise /></div>}
                    {activeTab === 2 && <div><SuperAdminDistrictWise /></div>}
                    {activeTab === 3 && <div><SuperAdminMarketManagerWise /></div>}
                    {activeTab === 4 && <div className='text-center display-5'>working on it.</div>}
                </div>
            </div>
        </div>
    );
}

export default SuperAdminInsights