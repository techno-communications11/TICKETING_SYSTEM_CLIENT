import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Grid,
    Typography,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { changePassword, resetPasswordService } from "../Services/auth.services";

function ForgetPassword() {
    const [identifier, setIdentifier] = useState(""); // email or username
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const id = cookies.get("id");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier.trim()) {
            toast.error("Please enter either Email or Username!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await changePassword(identifier, password);
            console.log("Response", response);

            if (response.status === 200) {
                setTimeout(() => {
                    setIsLoading(false);
                    toast.success("Password reset successfully!");
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            toast.error("Something went wrong. Try again!");
            setIsLoading(false);
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
                            <Typography
                                variant="h5"
                                mb={2}
                                textAlign="center"
                                fontWeight="bold"
                                color="#6f2da8"
                            >
                                TECHNO COMMUNICATIONS LLC
                            </Typography>
                            <Typography
                                variant="body2"
                                mb={2}
                                textAlign="center"
                                fontWeight="bold"
                                className="text-secondary"
                            >
                                Reset Your Password Securely
                            </Typography>
                            <Typography
                                variant="body2"
                                mb={3}
                                textAlign="center"
                                color="gray"
                            >
                                Please enter your Email or Username, then create a strong
                                password. Ensure your password is unique and secure.
                            </Typography>

                            <Grid spacing={2}>
                                {/* Email or Username Field */}
                                <Grid item xs={12} className="mb-3">
                                    <TextField
                                        fullWidth
                                        label="Email or Username"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                </Grid>

                                {/* Password */}
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
                                                        <IconButton
                                                            onClick={() =>
                                                                setPasswordVisible(!passwordVisible)
                                                            }
                                                        >
                                                            {passwordVisible ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            required
                                        />
                                    </Box>
                                </Grid>

                                {/* Confirm Password */}
                                <Grid item xs={12} className="mt-3">
                                    <Box position="relative" className="w-100">
                                        <TextField
                                            className="w-100"
                                            label="Confirm Password"
                                            type={passwordVisible ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            variant="outlined"
                                            required
                                        />
                                    </Box>
                                </Grid>

                                {/* Show Password */}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={passwordVisible}
                                                onChange={() =>
                                                    setPasswordVisible(!passwordVisible)
                                                }
                                            />
                                        }
                                        label="Show Password"
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        className="py-3"
                                        sx={{
                                            backgroundColor: "#6f2da8",
                                            "&:hover": { backgroundColor: "#6f2da8" },
                                        }}
                                        disabled={isLoading}
                                        startIcon={
                                            isLoading && (
                                                <CircularProgress size={20} color="inherit" />
                                            )
                                        }
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

export default ForgetPassword