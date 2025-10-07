import React from 'react';
import { message, Upload } from 'antd';
import { Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import imageCompression from 'browser-image-compression';

const { Dragger } = Upload;

function UploadFiles({ setTicketData }) {
    const props = {
        name: 'files',
        multiple: true,
        action: 'https://ticketing-images-backend-aws.vercel.app/upload',
        // action: 'http://localhost:3000/upload',
        accept: '.png,.jpg,.jpeg',

        // Run before uploading each file
        async beforeUpload(file) {
            const isImage =
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/jpg';
            if (!isImage) {
                message.error(`${file.name} is not a valid image file`);
                return Upload.LIST_IGNORE; // stop upload
            }

            try {
                const options = {
                    maxSizeMB: 1, // compress to ~1MB or smaller
                    maxWidthOrHeight: 1024, // resize max dimension
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);

                // console log original vs compressed
                console.log(
                    `Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`
                );
                console.log(
                    `Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
                );

                return compressedFile; // upload this instead of original
            } catch (err) {
                console.error('Compression error:', err);
                return file; // fallback to original
            }
        },

        onChange(info) {
            const { status } = info.file;

            // collect all uploaded image URLs
            const allUrls = info.fileList
                .filter(
                    (file) =>
                        file.status === 'done' &&
                        file.response &&
                        file.response.files
                )
                .flatMap((file) => file.response.files.map((f) => f.url));

            if (allUrls.length > 0) {
                // console.log('Uploaded Image URLs:', allUrls);

                // update parent state
                setTicketData((prev) => ({
                    ...prev,
                    files: allUrls,
                }));
            }

            if (status === 'done') {
                message.success(`${info.file.name} uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files:', e.dataTransfer.files);
        },
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: 600,
                margin: '0 auto',
                padding: 20,
            }}
        >
            <Dragger {...props} style={{ padding: 20 }}>
                <p className="ant-upload-drag-icon">
                    <CloudUpload style={{ fontSize: 48 }} />
                </p>
                <Typography
                    variant="subtitle1"
                    className="ant-upload-text"
                >
                    Click or drag <b>image files</b> to this area to upload
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Only <b>PNG</b>, <b>JPG</b>, <b>JPEG</b> images are allowed.
                    Images will be <b>compressed</b> before uploading.
                </Typography>
            </Dragger>
        </div>
    );
}

export default UploadFiles;
