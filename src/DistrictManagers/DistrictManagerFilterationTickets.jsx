// import { Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import dayjs from 'dayjs';
// function DistrictManagerFilterationTickets({ datas }) {
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

// export default DistrictManagerFilterationTickets

import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';

function DistrictManagerFilterationTickets({ datas }) {
    const [seriesData, setSeriesData] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            id: 'tickets-bar-chart',
            type: 'area',
            zoom: { enabled: false },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 1000,
                animateGradually: { delay: 500 },
            },
        },
        xaxis: {
            categories: [],
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
        colors: ['#6F2DA8', '#FF4560', '#00E396', '#008FFB'], // total, open, closed, pending
        markers: {
            size: 4,
            strokeColors: '#fff',
            strokeWidth: 2,
        },
        tooltip: {
            y: {
                formatter: (value) => `${value} Tickets`,
            },
        },
        legend: {
            show: true,
            position: 'bottom',
        },
    });

    useEffect(() => {
        if (datas && Array.isArray(datas)) {
            // --- 1️⃣ Define data holders ---
            const monthCounts = {}; // { Jan: { total: 0, open: 0, closed: 0, pending: 0 } }

            // --- 2️⃣ Group tickets by month and status ---
            datas.forEach((ticket) => {
                const month = dayjs(ticket.createdAt).format('MMM');
                if (!monthCounts[month]) {
                    monthCounts[month] = { total: 0, open: 0, closed: 0, pending: 0 };
                }

                // Assuming ticket.status can be 'open', 'closed', 'pending'
                monthCounts[month].total += 1;
                if (ticket.status) {
                    const status = ticket.status.toLowerCase();
                    if (status === 'open') monthCounts[month].open += 1;
                    else if (status === 'closed' || status === 'complete') monthCounts[month].closed += 1;
                    else if (status === 'pending') monthCounts[month].pending += 1;
                }
            });

            // --- 3️⃣ Sort months chronologically ---
            const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const sortedMonths = monthsOrder.filter((m) => monthCounts[m]);

            // --- 4️⃣ Build arrays for each series ---
            const totalData = sortedMonths.map((m) => monthCounts[m].total);
            const openData = sortedMonths.map((m) => monthCounts[m].open);
            const closedData = sortedMonths.map((m) => monthCounts[m].closed);
            const pendingData = sortedMonths.map((m) => monthCounts[m].pending);

            // --- 5️⃣ Update chart options & series ---
            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: sortedMonths,
                },
            }));

            setSeriesData([
                { name: 'Total Tickets', data: totalData },
                { name: 'Open Tickets', data: openData },
                { name: 'Closed Tickets', data: closedData },
                { name: 'Pending Tickets', data: pendingData },
            ]);
        }
    }, [datas]);

    return (
        <div className="my-5">
            <Typography variant="h6" gutterBottom>
                Ticket Filtration by Month
            </Typography>
            <Chart
                options={options}
                series={seriesData}
                type="area"
                height={320}
            />
        </div>
    );
}

export default DistrictManagerFilterationTickets;
