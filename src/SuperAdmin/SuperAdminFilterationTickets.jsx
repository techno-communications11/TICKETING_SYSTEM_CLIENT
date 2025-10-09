// // import { Typography } from '@mui/material';
// // import React, { useEffect, useState } from 'react';
// // import Chart from 'react-apexcharts';
// // import dayjs from 'dayjs'; 

// // function SuperAdminFilterationTickets({ datas }) {
// //     const [seriesData, setSeriesData] = useState([
// //         { name: 'Tickets', data: [] },
// //     ]);

// //     const [options, setOptions] = useState({
// //         chart: {
// //             id: 'tickets-bar-chart',
// //             type: 'area',
// //             zoom: { enabled: false },
// //             animations: {
// //                 enabled: true,
// //                 easing: 'easeout',
// //                 speed: 1000,
// //                 animateGradually: { delay: 500 },
// //             },
// //         },
// //         xaxis: {
// //             categories: [],
// //         },
// //         fill: {
// //             type: 'gradient',
// //             gradient: {
// //                 shadeIntensity: 1,
// //                 opacityFrom: 0.7,
// //                 opacityTo: 0.3,
// //                 stops: [0, 90, 100],
// //             },
// //             colors: ['#6F2DA8'],
// //         },
// //         markers: {
// //             size: 5,
// //             colors: ['#6F2DA8'],
// //             strokeColors: '#fff',
// //             strokeWidth: 2,
// //         },
// //         tooltip: {
// //             y: {
// //                 formatter: (value) => `${value} Tickets`,
// //             },
// //         },
// //         legend: {
// //             show: true,
// //             position: 'bottom',
// //         },
// //     });

// //     useEffect(() => {
// //         if (datas && Array.isArray(datas)) {
// //             // Step 1: Group tickets by month
// //             const monthCounts = {};
// //             datas.forEach((ticket) => {
// //                 const month = dayjs(ticket.createdAt).format('MMM'); // e.g., 'Jan', 'Feb'
// //                 if (monthCounts[month]) {
// //                     monthCounts[month] += 1;
// //                 } else {
// //                     monthCounts[month] = 1;
// //                 }
// //             });

// //             // Step 2: Sort months correctly (optional: to make them Jan-Dec)
// //             const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// //             const sortedMonths = monthsOrder.filter((m) => monthCounts[m]);

// //             const ticketCounts = sortedMonths.map((month) => monthCounts[month]);

// //             // Step 3: Set chart data
// //             setOptions((prevOptions) => ({
// //                 ...prevOptions,
// //                 xaxis: {
// //                     ...prevOptions.xaxis,
// //                     categories: sortedMonths,
// //                 },
// //             }));

// //             setSeriesData([{ name: 'Tickets', data: ticketCounts }]);
// //         }
// //     }, [datas]);

// //     return (
// //         <div className='my-5'>
// //             <Typography variant="h6" gutterBottom>Ticket Filtration by Month</Typography>
// //             <Chart
// //                 options={options}
// //                 series={seriesData}
// //                 type="area"
// //                 height={320}
// //             />
// //         </div>
// //     );
// // }

// // export default SuperAdminFilterationTickets

// import { Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import dayjs from 'dayjs';

// function SuperAdminFilterationTickets({ datas }) {
//     const [seriesData, setSeriesData] = useState([]);
//     const [options, setOptions] = useState({
//         chart: {
//             id: 'tickets-bar-chart',
//             type: 'area',
//             zoom: { enabled: false },
//             animations: {
//                 enabled: true,
//                 easing: 'easeout',
//                 speed: 800,
//                 animateGradually: { delay: 400 },
//             },
//             toolbar: { show: false },
//         },
//         dataLabels: { enabled: false },
//         stroke: {
//             curve: 'smooth',
//             width: 3,
//         },
//         xaxis: {
//             categories: [],
//             title: { text: 'Months' },
//         },
//         yaxis: {
//             title: { text: 'Tickets Count' },
//         },
//         fill: {
//             type: 'gradient',
//             gradient: {
//                 shadeIntensity: 1,
//                 opacityFrom: 0.7,
//                 opacityTo: 0.3,
//                 stops: [0, 90, 100],
//             },
//         },
//         colors: ['#6F2DA8', '#E01B24', '#FFC107'], // open, closed, pending
//         markers: {
//             size: 4,
//             strokeColors: '#fff',
//             strokeWidth: 2,
//         },
//         tooltip: {
//             y: {
//                 formatter: (value) => `${value} Ticket(s)`,
//             },
//         },
//         legend: {
//             show: true,
//             position: 'bottom',
//         },
//     });

//     useEffect(() => {
//         if (datas && Array.isArray(datas)) {
//             // Define base structure
//             const monthStats = {};
//             const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//             datas.forEach((ticket) => {
//                 const month = dayjs(ticket.createdAt).format('MMM');
//                 if (!monthStats[month]) {
//                     monthStats[month] = { open: 0, closed: 0, pending: 0 };
//                 }

//                 const status = ticket.status?.toLowerCase();
//                 if (status === 'open') monthStats[month].open++;
//                 else if (status === 'closed') monthStats[month].closed++;
//                 else if (status === 'pending') monthStats[month].pending++;
//             });

//             // Prepare ordered arrays
//             const sortedMonths = monthsOrder.filter((m) => monthStats[m]);
//             const openData = sortedMonths.map((m) => monthStats[m].open);
//             const closedData = sortedMonths.map((m) => monthStats[m].closed);
//             const pendingData = sortedMonths.map((m) => monthStats[m].pending);

//             // Update chart data
//             setSeriesData([
//                 { name: 'Open Tickets', data: openData },
//                 { name: 'Closed Tickets', data: closedData },
//                 { name: 'Pending Tickets', data: pendingData },
//             ]);

//             // Update x-axis categories
//             setOptions((prevOptions) => ({
//                 ...prevOptions,
//                 xaxis: { ...prevOptions.xaxis, categories: sortedMonths },
//             }));
//         }
//     }, [datas]);

//     return (
//         <div className="my-5">
//             <Typography
//                 variant="h6"
//                 gutterBottom
//                 sx={{ fontWeight: 600, color: '#6F2DA8', mb: 2 }}
//             >
//                 Ticket Status by Month
//             </Typography>

//             <Chart
//                 options={options}
//                 series={seriesData}
//                 type="area"
//                 height={350}
//             />
//         </div>
//     );
// }

// export default SuperAdminFilterationTickets;


import React, { useEffect, useState } from 'react';
import { Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


function SuperAdminFilterationTickets({ datas }) {
    const [seriesData, setSeriesData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const [options, setOptions] = useState({
        chart: {
            id: 'tickets-bar-chart',
            type: 'area',
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800,
                animateGradually: { delay: 400 },
            },
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        xaxis: {
            categories: [],
            title: { text: 'Months' },
        },
        yaxis: {
            title: { text: 'Tickets Count' },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100],
            },
        },
        colors: ['#6F2DA8', '#E01B24', '#FFC107'], // open, closed, pending
        markers: {
            size: 4,
            strokeColors: '#fff',
            strokeWidth: 2,
        },
        tooltip: {
            y: {
                formatter: (value) => `${value} Ticket(s)`,
            },
        },
        legend: {
            show: true,
            position: 'bottom',
        },
    });

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleExport = (type) => {
        if (!seriesData.length) return;

        const months = options.xaxis.categories;
        const exportData = months.map((month, i) => ({
            Month: month,
            Open: seriesData[0]?.data[i] || 0,
            Closed: seriesData[1]?.data[i] || 0,
            Pending: seriesData[2]?.data[i] || 0,
        }));

        if (type === 'excel') {
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets Report');
            XLSX.writeFile(workbook, 'Tickets_Report.xlsx');
        } else if (type === 'csv') {
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Tickets_Report.csv';
            link.click();
        } else if (type === 'pdf') {
            const doc = new jsPDF();
            doc.text('Tickets Report by Month', 14, 16);

            const tableData = exportData.map((row) => [row.Month, row.Open, row.Closed, row.Pending]);

            autoTable(doc, {
                head: [['Month', 'Open', 'Closed', 'Pending']],
                body: tableData,
                startY: 22,
            });

            doc.save('Tickets_Report.pdf');

        }

        handleMenuClose();
    };

    useEffect(() => {
        if (datas && Array.isArray(datas)) {
            const monthStats = {};
            const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            datas.forEach((ticket) => {
                const month = dayjs(ticket.createdAt).format('MMM');
                if (!monthStats[month]) {
                    monthStats[month] = { open: 0, closed: 0, pending: 0 };
                }

                const status = ticket.status?.toLowerCase();
                if (status === 'open') monthStats[month].open++;
                else if (status === 'close') monthStats[month].closed++;
                else if (status === 'pending') monthStats[month].pending++;
            });

            const sortedMonths = monthsOrder.filter((m) => monthStats[m]);
            const openData = sortedMonths.map((m) => monthStats[m].open);
            const closedData = sortedMonths.map((m) => monthStats[m].closed);
            const pendingData = sortedMonths.map((m) => monthStats[m].pending);

            setSeriesData([
                { name: 'Open Tickets', data: openData },
                { name: 'Closed Tickets', data: closedData },
                { name: 'Pending Tickets', data: pendingData },
            ]);

            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: { ...prevOptions.xaxis, categories: sortedMonths },
            }));
        }
    }, [datas]);

    return (
        <Box className="my-5">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: '#6F2DA8' }}
                >
                    Ticket Status by Month
                </Typography>

                {/* Three-dot Menu */}
                <div>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVertIcon sx={{ color: '#6F2DA8' }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleExport('excel')}>Export as Excel (.xlsx)</MenuItem>
                        <MenuItem onClick={() => handleExport('csv')}>Export as CSV (.csv)</MenuItem>
                        <MenuItem onClick={() => handleExport('pdf')}>Export as PDF (.pdf)</MenuItem>
                    </Menu>
                </div>
            </Box>

            <Chart
                options={options}
                series={seriesData}
                type="area"
                height={350}
            />
        </Box>
    );
}

export default SuperAdminFilterationTickets;
