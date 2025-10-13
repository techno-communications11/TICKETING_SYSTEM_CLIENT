// import { Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import dayjs from 'dayjs';

// function SeniorManagerFilterationTickets({ datas }) {
//     const [seriesData, setSeriesData] = useState([
//         { name: 'Tickets', data: [] },
//     ]);

//     const [options, setOptions] = useState({
//         chart: {
//             id: 'tickets-bar-chart',
//             type: 'area',
//             zoom: { enabled: false },
//             animations: {
//                 enabled: true,
//                 easing: 'easeout',
//                 speed: 1000,
//                 animateGradually: { delay: 500 },
//             },
//         },
//         xaxis: {
//             categories: [],
//         },
//         fill: {
//             type: 'gradient',
//             gradient: {
//                 shadeIntensity: 1,
//                 opacityFrom: 0.7,
//                 opacityTo: 0.3,
//                 stops: [0, 90, 100],
//             },
//             colors: ['#6F2DA8'],
//         },
//         markers: {
//             size: 5,
//             colors: ['#6F2DA8'],
//             strokeColors: '#fff',
//             strokeWidth: 2,
//         },
//         tooltip: {
//             y: {
//                 formatter: (value) => `${value} Tickets`,
//             },
//         },
//         legend: {
//             show: true,
//             position: 'bottom',
//         },
//     });

//     useEffect(() => {
//         if (datas && Array.isArray(datas)) {
//             // Step 1: Group tickets by month
//             const monthCounts = {};
//             datas.forEach((ticket) => {
//                 const month = dayjs(ticket.createdAt).format('MMM'); // e.g., 'Jan', 'Feb'
//                 if (monthCounts[month]) {
//                     monthCounts[month] += 1;
//                 } else {
//                     monthCounts[month] = 1;
//                 }
//             });

//             // Step 2: Sort months correctly (optional: to make them Jan-Dec)
//             const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//             const sortedMonths = monthsOrder.filter((m) => monthCounts[m]);

//             const ticketCounts = sortedMonths.map((month) => monthCounts[month]);

//             // Step 3: Set chart data
//             setOptions((prevOptions) => ({
//                 ...prevOptions,
//                 xaxis: {
//                     ...prevOptions.xaxis,
//                     categories: sortedMonths,
//                 },
//             }));

//             setSeriesData([{ name: 'Tickets', data: ticketCounts }]);
//         }
//     }, [datas]);

//     return (
//         <div className='my-5'>
//             <Typography variant="h6" gutterBottom>Ticket Filtration by Month</Typography>
//             <Chart
//                 options={options}
//                 series={seriesData}
//                 type="area"
//                 height={320}
//             />
//         </div>
//     );
// }

// export default SeniorManagerFilterationTickets

import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';

function SeniorManagerFilterationTickets({ datas }) {
    const [seriesData, setSeriesData] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            id: 'tickets-status-bar',
            type: 'area',
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800,
                animateGradually: { delay: 300 },
            },
            toolbar: { show: false },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: [],
            labels: { style: { fontSize: '12px' } },
        },
        yaxis: {
            title: { text: 'No. of Tickets' },
            min: 0,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.7,
                opacityFrom: 0.8,
                opacityTo: 0.2,
                stops: [0, 90, 100],
            },
        },
        markers: {
            size: 4,
            strokeWidth: 2,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} tickets`,
            },
        },
        legend: {
            show: true,
            position: 'bottom',
        },
        colors: ['#6F2DA8', '#2196F3', '#4CAF50', '#F44336', '#FFC107', '#9C27B0'],
    });

    useEffect(() => {
        if (datas && Array.isArray(datas)) {
            // Define possible statuses
            const statuses = ['Total', 'open', 'close', 'pending', 'complete', 're-open'];

            // Group by month and status
            const monthlyCounts = {};

            datas.forEach(ticket => {
                const month = dayjs(ticket.createdAt).format('MMM'); // e.g., 'Jan', 'Feb'
                if (!monthlyCounts[month]) {
                    monthlyCounts[month] = { Total: 0, open: 0, close: 0, pending: 0, complete: 0, 're-open': 0 };
                }

                monthlyCounts[month].Total += 1;
                const statusKey = (ticket.status || ticket.agentstatus || '').toLowerCase();

                if (statuses.includes(statusKey)) {
                    monthlyCounts[month][statusKey] += 1;
                }
            });

            // Sort months correctly
            const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const sortedMonths = monthsOrder.filter(m => monthlyCounts[m]);

            // Prepare series for each status
            const statusSeries = statuses.map(status => ({
                name: status.charAt(0).toUpperCase() + status.slice(1),
                data: sortedMonths.map(month => monthlyCounts[month][status] || 0),
            }));

            // Update chart options & series
            setOptions(prev => ({
                ...prev,
                xaxis: { ...prev.xaxis, categories: sortedMonths },
            }));

            setSeriesData(statusSeries);
        }
    }, [datas]);

    return (
        <div className="my-5">
            <Typography variant="h6" gutterBottom>
                Ticket Filtration by Month & Status
            </Typography>
            <Chart
                options={options}
                series={seriesData}
                type="area"
                height={350}
            />
        </div>
    );
}

export default SeniorManagerFilterationTickets;
