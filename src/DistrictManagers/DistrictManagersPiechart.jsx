import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

function DistrictManagersPiechart({ datas }) {
    const [chartData, setChartData] = useState({
        labels: ['High', 'Medium', 'Low'],
        datasets: [
            {
                data: [0, 0, 0], // initially 0
                backgroundColor: ['#6F2DA8', '#E01B24', '#FFC107'], // Purple, Red, Yellow
                borderColor: ['transparent', 'transparent', 'transparent'],
                borderWidth: 0,
                hoverOffset: 12,
            },
        ],
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        rotation: -30,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`,
                },
            },
        },
    };

    useEffect(() => {
        if (datas && Array.isArray(datas)) {
            let high = 0, medium = 0, low = 0;

            datas.forEach(ticket => {
                const priority = ticket.priority?.toLowerCase(); // safety check and case insensitive

                if (priority === 'high') high++;
                else if (priority === 'medium') medium++;
                else if (priority === 'low') low++;
            });

            setChartData({
                labels: ['High', 'Medium', 'Low'],
                datasets: [
                    {
                        data: [high, medium, low],
                        backgroundColor: ['#6F2DA8', '#E01B24', '#FFC107'],
                        borderColor: ['transparent', 'transparent', 'transparent'],
                        borderWidth: 0,
                        hoverOffset: 12,
                    },
                ],
            });
        }
    }, [datas]);

    return (
        <Box sx={{ padding: 2 }}>
            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 4,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    borderRadius: 2,
                    background: 'linear-gradient(145deg, #6F2DA8, #E01B24)',
                    color: 'common.white',
                    textAlign: 'center',
                    transform: 'perspective(1000px) rotateX(5deg)',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        marginBottom: 3,
                        fontWeight: 700,
                        fontSize: '1.6rem',
                    }}
                >
                    Tickets Priority
                </Typography>
                <Box
                    sx={{
                        height: 250,
                    }}
                >
                    <Doughnut data={chartData} options={options} />
                </Box>
            </Box>
        </Box>
    );
}

export default DistrictManagersPiechart