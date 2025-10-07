import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

function StoreTicketPiechart() {
    const data = {
        labels: ['Hight', 'Medium', 'Low'],
        datasets: [
            {
                data: [300, 50, 250],
                backgroundColor: ['#6F2DA8', '#E01B24', '#FFC107'], 
                borderColor: ['transparent', 'transparent', 'transparent'], 
                borderWidth: 0,
                hoverOffset: 12, 
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%', // Creates a donut chart
        rotation: -30, // Rotates the chart slightly
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff', // White text for legend
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`, // Tooltip label
                },
            },
        },
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 4,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    borderRadius: 2,
                    background: 'linear-gradient(145deg, #6F2DA8, #ff099b)', // Gradient background
                    color: 'common.white', // White text
                    textAlign: 'center',
                    transform: 'perspective(1000px) rotateX(5deg)', // 3D effect
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
                    <Doughnut data={data} options={options} />
                </Box>
            </Box>
        </Box>
    );
}

export default StoreTicketPiechart