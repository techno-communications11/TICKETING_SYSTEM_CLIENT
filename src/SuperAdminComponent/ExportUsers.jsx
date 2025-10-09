// // import React, { useState } from 'react';
// // import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
// // import * as XLSX from 'xlsx';

// // function ExportUsers({ userData }) {
// //     const [open, setOpen] = useState(false);

// //     const handleExport = () => {
// //         // Filter required fields only
// //         const exportData = userData.map(user => ({
// //             Name: user.name,
// //             Email: user.email,
// //             Phone: user.phone,
// //             Department: user.department,
// //             SubDepartment: user.subDepartment || "-"
// //         }));

// //         // Convert JSON → worksheet
// //         const worksheet = XLSX.utils.json_to_sheet(exportData);

// //         // Create workbook
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

// //         // Export file
// //         XLSX.writeFile(workbook, "UsersData.xlsx");

// //         setOpen(false);
// //     };

// //     return (
// //         <div>
// //             <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={() => setOpen(true)}
// //             >
// //                 Export Excel
// //             </Button>

// //             {/* Confirmation Dialog */}
// //             <Dialog open={open} onClose={() => setOpen(false)}>
// //                 <DialogTitle>Confirm Export</DialogTitle>
// //                 <DialogContent>
// //                     <Typography>
// //                         Are you sure you want to export the user data to Excel?
// //                     </Typography>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={() => setOpen(false)}>Cancel</Button>
// //                     <Button
// //                         variant="contained"
// //                         color="success"
// //                         onClick={handleExport}
// //                     >
// //                         Yes, Export
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>
// //         </div>
// //     );
// // }

// // export default ExportUsers;


// import React, { useState } from 'react';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
// import * as XLSX from 'xlsx';

// function ExportUsers({ userData }) {
//     const [open, setOpen] = useState(false);

//     const handleExport = () => {
//         // Filter users
//         const filteredData = userData.filter(user => {
//             const email = user.email?.toLowerCase() || "";
//             const name = user.name?.toLowerCase() || "";

//             // Condition 1: Skip gmail.com emails
//             if (email.includes("@gmail.com")) return false;

//             // Condition 2: Skip if name/email contains "test"
//             if (email.includes("test") || name.includes("test")) return false;

//             return true;
//         });

//         // Prepare export data
//         const exportData = filteredData.map(user => ({
//             Name: user.name,
//             Email: user.email,
//             Phone: user.phone,
//             Department: user.department,
//             SubDepartment: user.subDepartment || "-"
//         }));

//         // Convert JSON → worksheet
//         const worksheet = XLSX.utils.json_to_sheet(exportData);

//         // Create workbook
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

//         // Export file
//         XLSX.writeFile(workbook, "UsersData.xlsx");

//         setOpen(false);
//     };

//     return (
//         <div>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => setOpen(true)}
//             >
//                 Export Excel
//             </Button>

//             {/* Confirmation Dialog */}
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>Confirm Export</DialogTitle>
//                 <DialogContent>
//                     <Typography>
//                         Are you sure you want to export the filtered user data to Excel?
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button
//                         variant="contained"
//                         onClick={handleExport}
//                     >
//                         Yes, Export
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default ExportUsers;


import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import * as XLSX from 'xlsx';

function ExportUsers({ userData }) {
    const [open, setOpen] = useState(false);

    const handleExport = () => {
        // Filter users
        const filteredData = userData.filter(user => {
            const email = user.email?.toLowerCase() || "";
            const name = user.name?.toLowerCase() || "";

            // Skip gmail.com emails
            if (email.includes("@gmail.com")) return false;

            // Skip if name/email contains "test"
            if (email.includes("test") || name.includes("test")) return false;

            return true;
        });

        // Prepare export data
        const exportData = filteredData.map(user => ({
            Name: user.name,
            Email: user.email,
            Passowrd: 123456,
            Phone: user.phone,
            Market: user.market || user.markets ||'-',
            Department: user.department,
            SubDepartment: user.subDepartment || "-"
        }));

        // Convert JSON → worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Set column widths (wch = width in characters)
        worksheet['!cols'] = [
            { wch: 20 }, // Name
            { wch: 30 }, // Email
            { wch: 15 }, // Phone
            { wch: 25 }, // Department
            { wch: 25 }, // SubDepartment
        ];

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Export file
        XLSX.writeFile(workbook, "UsersData.xlsx");

        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Export Excel
            </Button>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Export</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to export the filtered user data to Excel?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        // color="success"
                        onClick={handleExport}
                    >
                        Yes, Export
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExportUsers;
