import React from 'react';
import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGlobalState } from '../Context/context';

function AddMMDMCompo() {
    const { mmdmformData, setMMDMFormData, errors, setErrors } = useGlobalState()
    const handleChange = (e) => {
        setMMDMFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setErrors(prev => ({
            ...prev,
            [e.target.name]: ''
        }));
    };
    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={500} mx="auto">
            <Typography variant="h6">Add MMDM Info</Typography>
            <FormControl fullWidth>
                <InputLabel>Market</InputLabel>
                <Select value={mmdmformData.market} label="Market" name="market" onChange={handleChange} error={!!errors.market}
                    helperText={errors.market}>
                    {["ALL", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY"].map((market, idx) => (
                        <MenuItem key={idx} value={market}>{market}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Name"
                name="name"
                value={mmdmformData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
            />
            <TextField
                label="Title"
                name="title"
                value={mmdmformData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
            />
            <TextField
                label="NTID"
                name="ntid"
                value={mmdmformData.ntid}
                onChange={handleChange}
                error={!!errors.ntid}
                helperText={errors.ntid}
                fullWidth
            />
            <TextField
                label="T-Mobile Email ID"
                name="tmobile_email"
                value={mmdmformData.tmobile_email}
                onChange={handleChange}
                error={!!errors.tmobile_email}
                helperText={errors.tmobile_email}
                type="email"
                fullWidth
            />
            <TextField
                label="Company Email"
                name="company_email"
                value={mmdmformData.company_email}
                onChange={handleChange}
                error={!!errors.company_email}
                helperText={errors.company_email}
                type="email"
                fullWidth
            />
            <TextField
                label="Contact Number"
                name="contact_numbers"
                value={mmdmformData.contact_numbers}
                onChange={handleChange}
                error={!!errors.contact_numbers}
                helperText={errors.contact_numbers}
                fullWidth
            />
        </Box>
    );
}

export default AddMMDMCompo;
