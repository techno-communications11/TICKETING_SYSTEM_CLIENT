import React from "react";
import { Typography, Link } from "@mui/material";

function ShowAttachmentsFile({ documents = [] }) {
    if (!documents || documents.length === 0) {
        return (
            <Typography color="textSecondary">
                No documents uploaded yet.
            </Typography>
        );
    }

    return (
        <div style={{ marginTop: 20 }}>
           

            <ul style={{ paddingLeft: 20 }}>
                {documents.map((url, index) => {
                    const fileName = decodeURIComponent(url.split("/").pop());
                    return (
                        <li key={index} style={{ marginBottom: 8 }}>
                            <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                                sx={{ color: "#1677ff" }}
                            >
                                {fileName}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ShowAttachmentsFile;
