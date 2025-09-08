import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import AddCamCastCredentialsBttn from './AddCamCastCredentialsBttn';
import { useGlobalState } from '../Context/context';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function AddCamCastCredentials() {
    const [open, setOpen] = useState(false);
    const { ccformData, setccFormData, errors, setErrors } = useGlobalState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setErrors({});
        setccFormData({
            username: '',
            password: '',
            name: '',
            website_url: '',
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setccFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Add
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Cam Cast Credentials</DialogTitle>

                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={500} mx="auto">
                        <TextField
                            label="User Name"
                            name="username"
                            value={ccformData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={ccformData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Name"
                            name="name"
                            value={ccformData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                        />
                        <TextField
                            label="Website"
                            name="website_url"
                            value={ccformData.website_url}
                            onChange={handleChange}
                            error={!!errors.website_url}
                            helperText={errors.website_url}
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button> */}
                    <AddCamCastCredentialsBttn handleClose={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddCamCastCredentials;
