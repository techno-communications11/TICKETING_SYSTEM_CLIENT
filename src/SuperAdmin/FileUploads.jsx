import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import * as XLSX from "xlsx";
import axios from "axios";
import { addmmdninfosevices } from "../Services/mmdminfo.services";

function FileUploads() {
    const [excelData, setExcelData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isParsing, setIsParsing] = useState(false);
const[loader,setLoader]=useState(false);

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

                // Find the sheet named "MMDM Info" (case-insensitive)
                const sheetName = workbook.SheetNames.find(
                    name => name.trim().toLowerCase() === "mmdm info"
                );

                if (!sheetName) {
                    alert("Sheet 'MMDM Info' not found in this Excel file.");
                    setFileName("");
                    return;
                }

                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);

                const filteredData = parsedData.map(row => ({
                    market: row["Market"] || "",
                    name: row["Name"] || "",
                    title: row["Title"] || "",
                    ntid: row["NTID"] || "",
                    tmobile_email: row["T Mobile Email ID"] || "",
                    company_email: row["Company Email ID"] || "",
                    contact_numbers: row["Contact Number"] || "",
                }));

                setExcelData(filteredData);
            } catch (error) {
                alert("Error parsing Excel file.");
                setFileName("");
            } finally {
                setIsParsing(false);
            }
        };

        reader.onerror = () => {
            alert("Error reading file.");
            setIsParsing(false);
            setFileName("");
        };

        reader.readAsBinaryString(file);
    };

    const handleSubmit = async () => {
        setLoader(true);
        console.log("Extracted Data:", excelData);
        try {
            const response = await addmmdninfosevices(excelData);
            console.log("RESPONSE", response.data)
        } catch (error) {
            setLoader(false);
            console.error("Upload error:", error.message);
        } finally {
            setLoader(false);
        }

    };

    return (
        <div className="">
            <div className="">
                <h5 className="text-center fw-medium mb-4 font-family">Upload MMDM Excel File</h5>
                <h6 className="text-danger">
                    <strong>Note<sup>*</sup>:</strong> Sirf Excel files upload ki ja sakti hain.<br />
                    <strong>Required Sheet:</strong> Sheet ka naam <code>MMDM Info</code> hona chahiye.
                </h6>
                <div className="mb-4">
                    <pre>
                        ✅ Market
                        ✅ Name
                        ✅ Title
                        ✅ NTID
                        ✅ Tmobile Email ID
                        ✅ Company Email ID
                        ✅ Contact Numbers
                    </pre>
                    <h6 className="text-warning">
                        Agar sheet ya columns missing hui to file upload nahi hogi.
                    </h6>
                </div>

                <div
                    className="cursor-pointer mb-2"
                    style={{
                        height: "80px",
                        border: "1px dashed",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <input
                        type="file"
                        accept=".xls, .xlsx"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                        id="fileInput"
                    />
                    <label htmlFor="fileInput">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => document.getElementById("fileInput").click()}
                            disabled={isLoading || isParsing}
                        >
                            <MdOutlineCloudUpload className="fs-1 me-2" />
                            Upload Excel
                        </button>
                    </label>
                    {fileName && (
                        <div className="mt-2 text-center">
                            <span className="me-2">{fileName}</span>
                            {isParsing && (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Parsing...</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleSubmit}
                        disabled={isLoading || isParsing || excelData.length === 0}
                    >
                        {loader ? (
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                Uploading...
                            </div>
                        ) : (
                            "Upload"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FileUploads;
