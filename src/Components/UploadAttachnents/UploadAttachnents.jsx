// // import React from 'react';
// // import { message, Upload } from 'antd';
// // import { Typography } from '@mui/material';
// // import { CloudUpload } from '@mui/icons-material';
// // import imageCompression from 'browser-image-compression';

// // const { Dragger } = Upload;

// // function UploadAttachnents({setTicketData}) {
// //     const props = {
// //         name: 'files',
// //         multiple: true,
// //         action: 'https://ticketing-images-backend-aws.vercel.app/upload',
// //         // action: 'http://localhost:3000/upload',
// //         accept: '.png,.jpg,.jpeg',

// //         // Run before uploading each file
// //         async beforeUpload(file) {
// //             const isImage =
// //                 file.type === 'image/jpeg' ||
// //                 file.type === 'image/png' ||
// //                 file.type === 'image/jpg';
// //             if (!isImage) {
// //                 message.error(`${file.name} is not a valid image file`);
// //                 return Upload.LIST_IGNORE; // stop upload
// //             }

// //             try {
// //                 const options = {
// //                     maxSizeMB: 1, // compress to ~1MB or smaller
// //                     maxWidthOrHeight: 1024, // resize max dimension
// //                     useWebWorker: true,
// //                 };
// //                 const compressedFile = await imageCompression(file, options);

// //                 // console log original vs compressed
// //                 console.log(
// //                     `Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`
// //                 );
// //                 console.log(
// //                     `Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
// //                 );

// //                 return compressedFile; // upload this instead of original
// //             } catch (err) {
// //                 console.error('Compression error:', err);
// //                 return file; // fallback to original
// //             }
// //         },

// //         onChange(info) {
// //             const { status } = info.file;

// //             // collect all uploaded image URLs
// //             const allUrls = info.fileList
// //                 .filter(
// //                     (file) =>
// //                         file.status === 'done' &&
// //                         file.response &&
// //                         file.response.files
// //                 )
// //                 .flatMap((file) => file.response.files.map((f) => f.url));

// //             if (allUrls.length > 0) {
// //                 // console.log('Uploaded Image URLs:', allUrls);

// //                 // update parent state
// //                 setTicketData((prev) => ({
// //                     ...prev,
// //                     files: allUrls,
// //                 }));
// //             }

// //             if (status === 'done') {
// //                 message.success(`${info.file.name} uploaded successfully.`);
// //             } else if (status === 'error') {
// //                 message.error(`${info.file.name} upload failed.`);
// //             }
// //         },

// //         onDrop(e) {
// //             console.log('Dropped files:', e.dataTransfer.files);
// //         },
// //     };

// //     return (
// //         <div
// //             style={{
// //                 width: '100%',
// //                 maxWidth: 600,
// //                 margin: '0 auto',
// //                 padding: 20,
// //             }}
// //         >
// //             <Dragger {...props} style={{ padding: 20 }}>
// //                 <p className="ant-upload-drag-icon">
// //                     <CloudUpload style={{ fontSize: 48 }} />
// //                 </p>
// //                 <Typography
// //                     variant="subtitle1"
// //                     className="ant-upload-text"
// //                 >
// //                     Click or drag <b>image files</b> to this area to upload
// //                 </Typography>
// //                 <Typography variant="body2" color="textSecondary">
// //                     Only <b>PNG</b>, <b>JPG</b>, <b>JPEG</b> images are allowed.
// //                     Images will be <b>compressed</b> before uploading.
// //                 </Typography>
// //             </Dragger>
// //         </div>
// //     );
// // }

// // export default UploadAttachnents

// import React from 'react';
// import { message, Upload } from 'antd';
// import { Typography } from '@mui/material';
// import { CloudUpload } from '@mui/icons-material';
// import imageCompression from 'browser-image-compression';

// const { Dragger } = Upload;

// function UploadAttachments({ setTicketData }) {
//     const props = {
//         name: 'files',
//         multiple: true,
//         // action: 'https://ticketing-images-backend-aws.vercel.app/uploads',
//         action: 'http://localhost:3000/uploads',
//         accept:
//             ".png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx,.mp4,.mov,.avi,.mkv",

//         // ✅ beforeUpload runs before each upload
//         async beforeUpload(file) {
//             const isImage =
//                 file.type === 'image/jpeg' ||
//                 file.type === 'image/png' ||
//                 file.type === 'image/jpg';
//             if (!isImage) {
//                 message.error(`${file.name} is not a valid image file.`);
//                 return Upload.LIST_IGNORE;
//             }

//             // ✅ Check file size (max 5MB)
//             const isLt5MB = file.size / 1024 / 1024 <= 5;
//             if (!isLt5MB) {
//                 message.error(`${file.name} is larger than 5MB. Please upload a smaller image.`);
//                 return Upload.LIST_IGNORE;
//             }

//             try {
//                 // ✅ Compress the image before uploading
//                 const options = {
//                     maxSizeMB: 1,
//                     maxWidthOrHeight: 1024,
//                     useWebWorker: true,
//                 };
//                 const compressedFile = await imageCompression(file, options);

//                 console.log(
//                     `Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`
//                 );
//                 console.log(
//                     `Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
//                 );

//                 return compressedFile; // ✅ upload the compressed file
//             } catch (err) {
//                 console.error('Compression error:', err);
//                 return file;
//             }
//         },

//         // ✅ onChange handles upload progress and updates ticket data
//         onChange(info) {
//             const { status } = info.file;

//             const allUrls = info.fileList
//                 .filter(
//                     (file) =>
//                         file.status === 'done' &&
//                         file.response &&
//                         file.response.files
//                 )
//                 .flatMap((file) => file.response.files.map((f) => f.url));

//             if (allUrls.length > 0) {
//                 setTicketData((prev) => ({
//                     ...prev,
//                     documents: allUrls,
//                 }));
//             }

//             if (status === 'done') {
//                 message.success(`${info.file.name} uploaded successfully.`);
//             } else if (status === 'error') {
//                 message.error(`${info.file.name} upload failed.`);
//             }
//         },

//         onDrop(e) {
//             console.log('Dropped files:', e.dataTransfer.files);
//         },
//     };

//     return (
//         <div
//             style={{
//                 width: '100%',
//                 maxWidth: 600,
//                 margin: '0 auto',
//                 padding: 20,
//             }}
//         >
//             <Dragger {...props} style={{ padding: 20 }}>
//                 <p className="ant-upload-drag-icon">
//                     <CloudUpload style={{ fontSize: 48 }} />
//                 </p>
//                 <Typography variant="subtitle1" className="ant-upload-text">
//                     Click or drag <b>image files</b> here to upload
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                     Only <b>PNG</b>, <b>JPG</b>, <b>JPEG</b> images allowed.
//                     <br />
//                     Maximum size: <b>5 MB per file</b>.
//                     Images will be <b>compressed</b> before uploading.
//                 </Typography>
//             </Dragger>
//         </div>
//     );
// }

// export default UploadAttachments;


import React from "react";
import { message, Upload } from "antd";
import { Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import imageCompression from "browser-image-compression";

const { Dragger } = Upload;

function UploadAttachments({ setTicketData }) {
    const props = {
        name: "files",
        multiple: true,
        // action: "https://ticketing-images-backend-aws.vercel.app/uploads",
        // action: "http://localhost:3000/uploads",
        action: "https://ticketing-images-backend-aws.vercel.app/uploads",
        // ✅ allow all supported file types
        accept:
            ".png,.jpg,.jpeg,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.csv,.mp4,.mov,.avi,.mkv",

        async beforeUpload(file) {
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/gif",
                "image/webp",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "text/csv",
                "video/mp4",
                "video/quicktime",
                "video/x-msvideo",
                "video/x-matroska",
            ];

            if (!validTypes.includes(file.type)) {
                message.error(`${file.name} is not a supported file type.`);
                return Upload.LIST_IGNORE;
            }

            // ✅ limit: 5 MB per file
            const isLt5MB = file.size / 1024 / 1024 <= 5;
            if (!isLt5MB) {
                message.error(`${file.name} exceeds 5MB limit.`);
                return Upload.LIST_IGNORE;
            }

            // ✅ compress only images
            if (file.type.startsWith("image/")) {
                try {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(file, options);

                    console.log(
                        `Compressed ${file.name}: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
                    );

                    return compressedFile;
                } catch (err) {
                    console.error("Compression error:", err);
                    return file; // fallback
                }
            }

            return file; // other file types skip compression
        },

        onChange(info) {
            const { status } = info.file;

            const allUrls = info.fileList
                .filter(
                    (file) =>
                        file.status === "done" &&
                        file.response &&
                        file.response.files
                )
                .flatMap((file) => file.response.files.map((f) => f.url));

            if (allUrls.length > 0) {
                setTicketData((prev) => ({
                    ...prev,
                    documents: allUrls, // store in a unified key
                }));
            }

            if (status === "done") {
                message.success(`${info.file.name} uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} upload failed.`);
            }
        },

        onDrop(e) {
            console.log("Dropped files:", e.dataTransfer.files);
        },
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 600,
                margin: "0 auto",
                padding: 20,
            }}
        >
            <Dragger {...props} style={{ padding: 20 }}>
                <p className="ant-upload-drag-icon">
                    <CloudUpload style={{ fontSize: 48 }} />
                </p>
                <Typography variant="subtitle1" className="ant-upload-text">
                    Click or drag files to upload
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Supported formats:
                    <b>Documents</b> (PDF, DOC, DOCX),
                    <b>Spreadsheets</b> (XLS, XLSX, CSV),
                    <b>Videos</b> (MP4, MOV, AVI, MKV)
                    <br />
                    Max file size: <b>5 MB each</b>. Images will be <b>compressed</b>.
                </Typography>
            </Dragger>
        </div>
    );
}

export default UploadAttachments;
