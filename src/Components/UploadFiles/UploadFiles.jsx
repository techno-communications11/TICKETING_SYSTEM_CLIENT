
import React from 'react';
import { message, Upload } from 'antd';
import { Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
function UploadFiles() {
    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <CloudUpload />
                </p>
                <Typography variant='subtitle1' className="ant-upload-text">Click or drag file to this area to upload</Typography>
            </Dragger>
        </div>
    )
}

export default UploadFiles