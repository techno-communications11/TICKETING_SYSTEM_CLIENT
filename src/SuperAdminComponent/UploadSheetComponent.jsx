// // import { useState } from "react";
// // import * as XLSX from "xlsx";
// // import axios from "axios";
// // import { Box, Button } from "@mui/material";

// // function UploadSheetComponent() {
// //   const [file, setFile] = useState(null);

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert("Please select a file first!");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = async (e) => {
// //       const data = new Uint8Array(e.target.result);
// //       const workbook = XLSX.read(data, { type: "array" });
// //       const sheetName = workbook.SheetNames[0];
// //       const worksheet = workbook.Sheets[sheetName];

// //       // Excel → JSON convert
// //       const rows = XLSX.utils.sheet_to_json(worksheet);

// //       // Map fields as per your DB schema
// //       const formattedData = rows.map((row) => ({
// //         bdi_id: row["BDI ID"],
// //         dm_name: row["DM Name"],
// //         door_code: row["Door Code"],
// //         market: row["Market"],
// //         store_addres: row["Store Address"],
// //         store_name: row["Store Name"],
// //         stroe_email: row["Store Email"],
// //         store_phone: row["Store Phone Number"],
// //       }));

// //       try {
// //         // API call to backend
// //         const response = await axios.post(
// //           "http://localhost:5000/stores/addstoresexcelformat", // apna backend API endpoint set karo
// //           formattedData
// //         );
// //         alert("Upload successful!");
// //         console.log(response.data);
// //       } catch (error) {
// //         console.error("Error uploading data:", error);
// //         alert("Upload failed!");
// //       }
// //     };

// //     reader.readAsArrayBuffer(file);
// //   };

// //   return (
// //     <Box p={2}>
// //       <h6>Upload your Excel or CSV Sheet here</h6>
// //       <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={handleUpload}
// //         style={{ marginTop: "10px" }}
// //       >
// //         Upload & Save
// //       </Button>
// //     </Box>
// //   );
// // }

// // export default UploadSheetComponent;


// import { useState } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";
// import { Box, Button } from "@mui/material";

// function UploadSheetComponent() {
//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             alert("Please select a file first!");
//             return;
//         }

//         setUploading(true);

//         const reader = new FileReader();
//         reader.onload = async (e) => {
//             const data = new Uint8Array(e.target.result);
//             const workbook = XLSX.read(data, { type: "array" });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];

//             // Excel → JSON convert
//             const rows = XLSX.utils.sheet_to_json(worksheet);

//             // Map fields as per your DB schema
//             const formattedData = rows.map((row) => ({
//                 bdi_id: row["BDI ID"],
//                 dm_name: row["DM Name"],
//                 door_code: row["Door Code"],
//                 market: row["Market"],
//                 store_addres: row["Store Address"],
//                 store_name: row["Store Name"],
//                 stroe_email: row["Store Email"],
//                 store_phone: row["Store Phone Number"],
//             }));

//             // Chunking logic → 50 rows at a time
//             const chunkSize = 50;
//             for (let i = 0; i < formattedData.length; i += chunkSize) {
//                 const chunk = formattedData.slice(i, i + chunkSize);
//                 try {
//                     await axios.post(
//                         "http://localhost:5000/stores/addstoresexcelformat",
//                         chunk
//                     );
//                     console.log(`✅ Chunk ${i / chunkSize + 1} uploaded successfully`);
//                 } catch (error) {
//                     console.error("❌ Error uploading chunk:", error);
//                     alert("Some chunks failed to upload. Check console.");
//                     break;
//                 }
//             }

//             setUploading(false);
//             alert("🎉 All chunks uploaded successfully!");
//         };

//         reader.readAsArrayBuffer(file);
//     };

//     return (
//         <Box p={2}>
//             <h6>Upload your Excel or CSV Sheet here</h6>
//             <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleUpload}
//                 style={{ marginTop: "10px" }}
//                 disabled={uploading}
//             >
//                 {uploading ? "Uploading..." : "Upload & Save"}
//             </Button>
//         </Box>
//     );
// }

// export default UploadSheetComponent;


import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { MdOutlineCloudUpload } from "react-icons/md";

function UploadSheetComponent() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [parsing, setParsing] = useState(false);

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (!selectedFile) return;
    //     setFile(selectedFile);
    //     setFileName(selectedFile.name);
    // };

    // const handleUpload = async () => {
    //     if (!file) {
    //         alert("Please select a file first!");
    //         return;
    //     }

    //     setUploading(true);
    //     setParsing(true);

    //     const reader = new FileReader();
    //     reader.onload = async (e) => {
    //         try {
    //             const data = new Uint8Array(e.target.result);
    //             const workbook = XLSX.read(data, { type: "array" });
    //             const sheetName = workbook.SheetNames[0];
    //             const worksheet = workbook.Sheets[sheetName];

    //             // Excel → JSON convert
    //             const rows = XLSX.utils.sheet_to_json(worksheet);

    //             // Map fields as per your DB schema
    //             const formattedData = rows.map((row) => ({
    //                 bdi_id: row["BDI ID"],
    //                 dm_name: row["DM Name"],
    //                 door_code: row["Door Code"],
    //                 market: row["Market"],
    //                 store_addres: row["Store Address"],
    //                 store_name: row["Store Name"],
    //                 stroe_email: row["Store Email"],
    //                 store_phone: row["Store Phone Number"],
    //             }));

    //             // Chunking logic → 50 rows at a time
    //             const chunkSize = 50;
    //             for (let i = 0; i < formattedData.length; i += chunkSize) {
    //                 const chunk = formattedData.slice(i, i + chunkSize);
    //                 // await axios.post(
    //                 //     "http://localhost:5000/stores/addstoresexcelformat",
    //                 //     chunk
    //                 // );
    //                 console.log(`✅ Chunk ${i / chunkSize + 1} uploaded successfully`);
    //                 console.log(`✅ Chunk ${chunk}`);
    //             }

    //             alert("🎉 All chunks uploaded successfully!");
    //         } catch (error) {
    //             console.error("❌ Error uploading:", error);
    //             alert("Upload failed. Please check your file format.");
    //         } finally {
    //             setUploading(false);
    //             setParsing(false);
    //             setFile(null);
    //             setFileName("");
    //         }
    //     };

    //     reader.readAsArrayBuffer(file);
    // };



    const [excelData, setExcelData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [fileName, setFileName] = useState("");
    const [isParsing, setIsParsing] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setIsParsing(true);

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);

                const filteredData = parsedData.map((row) => ({
                    bdi_id: row["BDI ID"],
                    dm_name: row["DM Name"],
                    door_code: row["Door Code"],
                    market: row["Market"],
                    store_addres: row["Store Address"],
                    store_name: row["Store Name"],
                    stroe_email: row["Store Email"],
                    store_phone: row["Store Phone Number"] || "N/A",
                }));

                setExcelData(filteredData);
            } catch (error) {
                alert("Error parsing Excel file");
                setFileName("");
            } finally {
                setIsParsing(false);
            }
        };

        reader.onerror = () => {
            alert("Error reading file");
            setIsParsing(false);
            setFileName("");
        };

        reader.readAsBinaryString(file);
    };
    const handleSubmit = async () => {
        if (excelData.length === 0) {
            alert("Please upload a valid Excel file first!");
            return;
        }

        try {
            setUploading(true);
            setIsLoading(true);

            const chunkSize = 20;
            let uploadedCount = 0;

            for (let i = 0; i < excelData.length; i += chunkSize) {
                const chunk = excelData.slice(i, i + chunkSize);

                try {
                    console.log("Uploading chunk:", chunk);

                    await axios.post(
                      "http://localhost:5000/stores/addstoresexcelformat",
                      chunk
                    );

                    uploadedCount += chunk.length;
                    console.log(
                        `✅ Chunk ${i / chunkSize + 1} uploaded (${chunk.length} rows)`
                    );
                    console.log(chunk)
                    console.log(`📊 Progress: ${uploadedCount}/${excelData.length}`);
                } catch (error) {
                    console.error("❌ Error uploading chunk:", error);
                    alert(`Chunk ${i / chunkSize + 1} failed. Check console.`);
                    break;
                }
            }

            if (uploadedCount === excelData.length) {
                alert("🎉 All data uploaded successfully!");
            } else {
                alert(`⚠️ Only ${uploadedCount}/${excelData.length} rows uploaded.`);
            }

            // Reset after upload
            setFileName("");
            setExcelData([]);
        } catch (error) {
            console.error("Error uploading data:", error);
            alert("Error uploading data. Please try again.");
        } finally {
            setIsLoading(false);
            setUploading(false);
        }
    };

    // const handleSubmit = async () => {
    //     try {
    //         setUploading(true);
    //         setIsLoading(true);
    //         console.log(excelData)
    //         const chunkSize = 50;
    //         for (let i = 0; i < excelData.length; i += chunkSize) {
    //             const chunk = excelData.slice(i, i + chunkSize);
    //             try {
    //                 await axios.post(
    //                     "http://localhost:5000/stores/addstoresexcelformat",
    //                     chunk
    //                 );
    //                 console.log(`✅ Chunk ${i / chunkSize + 1} uploaded (${chunk.length} rows)`);
    //             } catch (error) {
    //                 console.error("❌ Error uploading chunk:", error);
    //                 alert(`Chunk ${i / chunkSize + 1} failed. Check console.`);
    //                 break;
    //             }
    //         }
    //         // const respone = await axios.post("http://localhost:5000/stores/addstoresexcelformat", { excelData });
    //         console.log("RESPONSE", respone)
    //         alert("Data uploaded successfully!");
    //         setFileName("");
    //         setExcelData([]);
    //     } catch (error) {
    //         console.error("Error uploading data:", error);
    //         alert("Error uploading data. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    return (
        <Box
            p={3}
            border="1px dashed gray"
            borderRadius="12px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            <Typography variant="h6" textAlign="center">
                Upload your Excel or CSV Sheet here
            </Typography>

            <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="fileInput"
            />

            <label htmlFor="fileInput">
                <Button
                    variant="outlined"
                    startIcon={<MdOutlineCloudUpload />}
                    component="span"
                    disabled={uploading || parsing}
                >
                    Select File
                </Button>
            </label>

            {fileName && (
                <Typography variant="body2" color="textSecondary">
                    {fileName}
                    {parsing && (
                        <CircularProgress size={16} style={{ marginLeft: "8px" }} />
                    )}
                </Typography>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                fullWidth
            >
                {isLoading ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        <CircularProgress size={18} color="inherit" />
                        Uploading...
                    </Box>
                ) : (
                    "Upload & Save"
                )}
            </Button>
        </Box>
    );
}

export default UploadSheetComponent;
