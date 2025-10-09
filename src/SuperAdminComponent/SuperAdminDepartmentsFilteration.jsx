import React, { useEffect, useState } from 'react';
import { Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function SuperAdminDepartmentsFilteration({ datas }) {
    const [seriesData, setSeriesData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const [options, setOptions] = useState({
        chart: {
            id: 'department-tickets-chart',
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
            title: { text: 'Departments' },
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
        colors: ['#6F2DA8', '#E01B24', '#FFC107'], // Open, Closed, Pending
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

        const departments = options.xaxis.categories;
        const exportData = departments.map((dept, i) => ({
            Department: dept,
            Open: seriesData[0]?.data[i] || 0,
            Closed: seriesData[1]?.data[i] || 0,
            Pending: seriesData[2]?.data[i] || 0,
        }));

        if (type === 'excel') {
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Department Report');
            XLSX.writeFile(workbook, 'Department_Tickets_Report.xlsx');
        } else if (type === 'csv') {
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Department_Tickets_Report.csv';
            link.click();
        } else if (type === 'pdf') {
            const doc = new jsPDF();
            doc.text('Department-wise Tickets Report', 14, 16);

            const tableData = exportData.map((row) => [row.Department, row.Open, row.Closed, row.Pending]);

            autoTable(doc, {
                head: [['Department', 'Open', 'Closed', 'Pending']],
                body: tableData,
                startY: 22,
            });

            doc.save('Department_Tickets_Report.pdf');
        }

        handleMenuClose();
    };

    useEffect(() => {
        if (datas && Array.isArray(datas)) {
            const departmentsList = [
                "COO", "DCO", "Admin", "Admin / IT", "Finance (GL)", "Finance AR", "SUPERVISOR", "HR",
                "IT", "Software India", "Internal", "Reporting", "Inventory", "Maintenance",
                "Commission", "Compliance", "MIS", "Managment", "SCM", "QA", "Vigilence", "CMG",
                "Data Analytics", "Supervisor", "Local IT"
            ];

            const deptStats = {};
            departmentsList.forEach((dept) => {
                deptStats[dept] = { open: 0, closed: 0, pending: 0 };
            });

            datas.forEach((ticket) => {
                const dept = ticket.department?.name || 'Unknown';
                const status = ticket.status?.toLowerCase();

                if (!deptStats[dept]) deptStats[dept] = { open: 0, closed: 0, pending: 0 };

                if (status === 'open') deptStats[dept].open++;
                else if (status === 'close') deptStats[dept].closed++;
                else if (status === 'pending') deptStats[dept].pending++;
            });

            const depts = Object.keys(deptStats);
            const openData = depts.map((d) => deptStats[d].open);
            const closedData = depts.map((d) => deptStats[d].closed);
            const pendingData = depts.map((d) => deptStats[d].pending);

            setSeriesData([
                { name: 'Open Tickets', data: openData },
                { name: 'Closed Tickets', data: closedData },
                { name: 'Pending Tickets', data: pendingData },
            ]);

            setOptions((prevOptions) => ({
                ...prevOptions,
                xaxis: { ...prevOptions.xaxis, categories: depts },
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
                    Department-wise Ticket Status
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
                height={400}
            />
        </Box>
    );
}

export default SuperAdminDepartmentsFilteration;
