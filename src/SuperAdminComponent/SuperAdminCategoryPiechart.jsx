// import React, { useEffect, useState, useCallback } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Box, Typography } from '@mui/material';
// import { getAllProblemCategory } from '../Services/categoryofproblem.services';

// ChartJS.register(ArcElement, Tooltip, Legend);

// function SuperAdminCategoryPiechart({ datas }) {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 data: [],
//                 backgroundColor: [],
//                 borderColor: ['transparent'],
//                 borderWidth: 0,
//                 hoverOffset: 12,
//             },
//         ],
//     });

//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // ✅ Fetch all problem categories
//     const fetchAllCategories = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await getAllProblemCategory();
//             if (response?.data?.data) {
//                 setCategories(response.data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchAllCategories();
//     }, [fetchAllCategories]);

//     // ✅ Update chart data once categories + datas (tickets) are loaded
//     useEffect(() => {
//         if (datas && Array.isArray(datas) && categories.length > 0) {
//             const categoryCounts = {};
//             categories.forEach((cat) => {
//                 categoryCounts[cat.name] = 0;
//             });

//             datas.forEach((ticket) => {
//                 const catName = ticket?.category;
//                 if (catName && categoryCounts.hasOwnProperty(catName)) {
//                     categoryCounts[catName]++;
//                 }
//             });

//             const labels = Object.keys(categoryCounts);
//             const counts = Object.values(categoryCounts);

//             // Random colors for each category for better visualization
//             const colors = labels.map(
//                 (_, i) => `hsl(${(i * 40) % 360}, 70%, 55%)`
//             );

//             setChartData({
//                 labels,
//                 datasets: [
//                     {
//                         data: counts,
//                         backgroundColor: colors,
//                         borderColor: ['transparent'],
//                         borderWidth: 0,
//                         hoverOffset: 10,
//                     },
//                 ],
//             });
//         }
//     }, [datas, categories]);

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         cutout: '60%',
//         rotation: -30,
//         plugins: {
//             legend: {
//                 position: 'bottom',
//                 labels: {
//                     color: '#fff',
//                     font: { size: 13, weight: 'bold' },
//                 },
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (context) => `${context.label}: ${context.raw}`,
//                 },
//             },
//         },
//     };

//     return (
//         <Box sx={{ padding: 2 }}>
//             <Box
//                 sx={{
//                     maxWidth: 500,
//                     margin: 'auto',
//                     padding: 4,
//                     boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
//                     borderRadius: 3,
//                     background: 'linear-gradient(145deg, #6F2DA8, #E01B24)',
//                     color: 'common.white',
//                     textAlign: 'center',
//                     transform: 'perspective(1000px) rotateX(5deg)',
//                 }}
//             >
//                 <Typography
//                     variant="h5"
//                     sx={{
//                         marginBottom: 3,
//                         fontWeight: 700,
//                         fontSize: '1.6rem',
//                     }}
//                 >
//                     Tickets by Category
//                 </Typography>

//                 {loading ? (
//                     <Typography>Loading categories...</Typography>
//                 ) : (
//                     <Box sx={{ height: 300 }}>
//                         <Doughnut data={chartData} options={options} />
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// }

// export default SuperAdminCategoryPiechart;


import React, { useEffect, useState, useCallback } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
import { getAllProblemCategory } from '../Services/categoryofproblem.services';

ChartJS.register(ArcElement, Tooltip, Legend);

function SuperAdminCategoryPiechart({ datas }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: ['transparent'],
                borderWidth: 0,
                hoverOffset: 12,
            },
        ],
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch all problem categories
    const fetchAllCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllProblemCategory();
            if (response?.data?.data) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);

    // ✅ Update chart data once categories + datas (tickets) are loaded
    useEffect(() => {
        if (datas && Array.isArray(datas) && categories.length > 0) {
            const categoryCounts = {};
            categories.forEach((cat) => {
                categoryCounts[cat.name] = 0;
            });

            datas.forEach((ticket) => {
                const catName = ticket?.category;
                if (catName && categoryCounts.hasOwnProperty(catName)) {
                    categoryCounts[catName]++;
                }
            });

            const labels = Object.keys(categoryCounts);
            const counts = Object.values(categoryCounts);

            // Random colors for each category for better visualization
            const colors = labels.map(
                (_, i) => `hsl(${(i * 40) % 360}, 70%, 55%)`
            );

            setChartData({
                labels,
                datasets: [
                    {
                        data: counts,
                        backgroundColor: colors,
                        borderColor: ['transparent'],
                        borderWidth: 0,
                        hoverOffset: 10,
                    },
                ],
            });
        }
    }, [datas, categories]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '58%', // slightly smaller donut hole
        rotation: -30,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: { size: 14, weight: 'bold' },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`,
                },
            },
        },
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box
                sx={{
                    maxWidth: 600, // ✅ wider container
                    margin: 'auto',
                    padding: 4,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    borderRadius: 3,
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
                    Tickets by Category
                </Typography>

                {loading ? (
                    <Typography>Loading categories...</Typography>
                ) : (
                    <Box sx={{ height: 460 }}> {/* ✅ Increased height */}
                        <Doughnut data={chartData} options={options} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default SuperAdminCategoryPiechart;
