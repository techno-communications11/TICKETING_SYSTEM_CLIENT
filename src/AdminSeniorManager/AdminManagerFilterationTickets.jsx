import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';

function AdminManagerFilterationTickets({ datas }) {
    const [seriesData, setSeriesData] = useState([
        { name: 'Tickets', data: [] },
      ]);
    
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
          colors: ['#6F2DA8'],
        },
        markers: {
          size: 5,
          colors: ['#6F2DA8'],
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
          // Step 1: Group tickets by month
          const monthCounts = {};
          datas.forEach((ticket) => {
            const month = dayjs(ticket.createdAt).format('MMM'); // e.g., 'Jan', 'Feb'
            if (monthCounts[month]) {
              monthCounts[month] += 1;
            } else {
              monthCounts[month] = 1;
            }
          });
    
          // Step 2: Sort months correctly (optional: to make them Jan-Dec)
          const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const sortedMonths = monthsOrder.filter((m) => monthCounts[m]);
    
          const ticketCounts = sortedMonths.map((month) => monthCounts[month]);
    
          // Step 3: Set chart data
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: sortedMonths,
            },
          }));
    
          setSeriesData([{ name: 'Tickets', data: ticketCounts }]);
        }
      }, [datas]);
    
      return (
        <div className='my-5'>
          <Typography variant="h6" gutterBottom>Ticket Filtration by Month</Typography>
          <Chart
            options={options}
            series={seriesData}
            type="area"
            height={320}
          />
        </div>
      );
}

export default AdminManagerFilterationTickets