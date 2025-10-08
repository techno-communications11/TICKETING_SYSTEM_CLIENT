// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import {
//     Box,
//     Button,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Paper,
// } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";

// function CreateUsersAccountFromExcel() {
//     const [data, setData] = useState([]);

//     // ✅ Handle Excel file upload
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const workbook = XLSX.read(e.target.result, { type: "binary" });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const jsonData = XLSX.utils.sheet_to_json(worksheet);

//             // ✅ Extract only required fields
//             const extracted = jsonData.map((row) => ({
//                 name: row["Store Name"] || "",
//                 email: row["Store Email"] || "",
//                 password: '123456',
//                 phone: row["Store Phone Number"] || "xxxxxxxxxxxx",
//                 department: row["Designation"] || "",
//                 doorcode: row["Market"] || "",
//                 markets: row["Market"] || "",
//             }));

//             setData(extracted);
//         };

//         reader.readAsBinaryString(file);
//     };

//     return (
//         <Box sx={{ p: 4, textAlign: "center" }}>
//             <Typography variant="h5" gutterBottom>
//                 📊 Excel Data Extractor
//             </Typography>

//             <Button
//                 variant="contained"
//                 component="label"
//                 startIcon={<UploadFileIcon />}
//                 sx={{ backgroundColor: "#6f2da8", mb: 3 }}
//             >
//                 Upload Excel File
//                 <input
//                     type="file"
//                     hidden
//                     accept=".xlsx, .xls"
//                     onChange={handleFileUpload}
//                 />
//             </Button>

//             {data.length > 0 ? (
//                 <Paper sx={{ maxWidth: 900, mx: "auto", overflowX: "auto" }}>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: "#6f2da8" }}>
//                             <TableRow>
//                                 <TableCell sx={{ color: "white" }}>Store Name</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Store Email</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Store password</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Store Phone Number</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Department</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Doorcode</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Markets</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {data.map((row, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell>{row.name}</TableCell>
//                                     <TableCell>{row.email}</TableCell>
//                                     <TableCell>{row.password}</TableCell>
//                                     <TableCell>{row.phone}</TableCell>
//                                     <TableCell>{row.department}</TableCell>
//                                     <TableCell>{row.doorcode}</TableCell>
//                                     <TableCell>{row.markets}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </Paper>
//             ) : (
//                 <Typography color="textSecondary">
//                     Please upload an Excel file to extract data.
//                 </Typography>
//             )}
//         </Box>
//     );
// }

// export default CreateUsersAccountFromExcel


import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

function CreateUsersAccountFromExcel() {
    const [loading, setLoading] = useState(false);

    // ✅ Handle Excel file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const workbook = XLSX.read(e.target.result, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // ✅ Extract required fields
                const extracted = jsonData.map((row) => ({
                    name: row["Store Name"] || "",
                    email: row["Store Email"] || "",
                    password: "123456",
                    phone: row["Store Phone Number"] || "xxxxxxxxxxxx",
                    department: row["Designation"] || "",
                    doorcode: row["Door Code"] || "",
                    markets: row["Market"] || "",
                }));

                console.log("📊 Extracted Users:", extracted);

                console.log("🚀 Uploading users to backend...");
                const response = await axios.post(
                    "http://localhost:5000/auth/registered-multiple-user", // 🔹 your backend API endpoint
                    { signupData: extracted }
                );

                if (response.status === 200 || response.status === 201) {
                    console.log("✅ Upload successful:", response.data);
                } else {
                    console.error("❌ Unexpected response:", response);
                }
            };

            reader.readAsBinaryString(file);
        } catch (error) {
            console.error("❌ Upload failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                p: 4,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                📥 Create Users from Excel
            </Typography>

            <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
                disabled={loading}
                sx={{ backgroundColor: "#6f2da8" }}
            >
                {loading ? "Uploading..." : "Upload Excel File"}
                <input
                    type="file"
                    hidden
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
            </Button>

            {loading && (
                <>
                    <CircularProgress size={24} color="secondary" />
                    <Typography color="textSecondary">
                        Please wait... Uploading users to server.
                    </Typography>
                </>
            )}
        </Box>
    );
}

export default CreateUsersAccountFromExcel;
