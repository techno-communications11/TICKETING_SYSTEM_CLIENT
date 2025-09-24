import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography, CircularProgress, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
// import { resetPasswordService } from "../Services/addusers.service";
import cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPasswordService } from "../Services/auth.services";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const id = cookies.get('id');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        setIsLoading(true);
        const response = await resetPasswordService(id, password)
        // console.log("Response", response)
        toast.success("Password reset successfully!");
        if (response.status === 200) {
            cookies.remove("id")
            cookies.remove("token")
            setTimeout(() => {
                setIsLoading(false);
                navigate('/')
            }, 2000);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                        bgcolor="#f4f4f4"
                        px={2}
                    >
                        <ToastContainer />
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                width: "100%",
                                maxWidth: 400,
                                p: 4,
                                bgcolor: "white",
                                boxShadow: 3,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h5" mb={2} textAlign="center" fontWeight="bold" color="#6f2da8">
                                TECHNO COMMUNICATIONS LLC
                            </Typography>
                            <Typography variant="body2" mb={2} textAlign="center" fontWeight="bold" className="text-secondary">
                                Reset Your Password Securely
                            </Typography>
                            <Typography variant="body2" mb={3} textAlign="center" color="gray">
                                Please create a strong password and do not share it with anyone. Ensure your password is unique and secure.
                            </Typography>

                            <Grid spacing={2}>
                                <Grid item xs={12}>
                                    <Box position="relative" className="w-100">
                                        <TextField
                                            className="w-100"
                                            label="Password"
                                            type={passwordVisible ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                                            {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} className="mt-3">
                                    <Box position="relative" className="w-100">
                                        <TextField
                                            className="w-100"
                                            label="Confirm Password"
                                            type={passwordVisible ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox checked={passwordVisible} onChange={() => setPasswordVisible(!passwordVisible)} />}
                                        label="Show Password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        className="py-3"
                                        sx={{ backgroundColor: "#6f2da8", "&:hover": { backgroundColor: "#6f2da8" } }}
                                        disabled={isLoading}
                                        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                                    >
                                        {isLoading ? "Resetting..." : "Reset Password"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword