import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { loginServices } from '../Services/auth.services';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Providers/userSlice';
import img from '../assets/logo2.png';
import { toast, ToastContainer } from 'react-toastify';
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [ip, setIp] = useState("");

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                setIp(data.ip);
                console.log(data.ip);
            } catch (error) {
                console.error("Error fetching public IP:", error);
            }
        };

        fetchIP();
    }, []);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const payload = { ...formData, ip };
            const response = await loginServices(payload);
            const { department, subDepartment } = jwtDecode(response.data.token);
            dispatch(login(response.data.data))
            console.log(response.data.data)
            localStorage.setItem("fgpts", response.data.data.forgotpassword)
            cookie.set('id', response.data.id, { expires: 0.375, path: "/" });
            cookie.set('token', response.data.token, { expires: 0.375, path: "/" });
            cookie.set("ip", ip)
            if (response.data.data.first === false) {
                cookie.set("id", response.data.id, { expires: 0.375, path: "/" });
                return navigate('/reset-password')
            }
            const departmentRoutes = {
                "Store": "/store-dashboard",
                "Admin Manager": "/admin-manager-dashboard",
                "Senior Manager": "/senior-managers-dashboard",
                "District Manager": "/district-manager-dashboard",
                "Market Manager": "/market-manager-dashboard",
                SuperAdmin: "/superAdminHome",
            };
            if (departmentRoutes[department]) {
                navigate(departmentRoutes[department]);
                return;
            }
            if (departmentRoutes[subDepartment]) {
                navigate(departmentRoutes[subDepartment]);
                return;
            }
            if (subDepartment === "Manager") {
                navigate("/manager");
            } else if (subDepartment === "Agent") {
                navigate("/agent-dashboard");
            } else {
                navigate("/departmenthome");
            }
            setError(null);
        } catch (error) {
            setLoading(false);
            console.log('Login error:', error.message);
            if (error.status === 401) {
                toast.error("Invalid Password")
            } else if (error.status === 404) {
                toast.error("Invalid Email")
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='' style={{ background: "#6f2da8", color: "white" }}>
            <ToastContainer />
            <div className="container-fluid" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="row justify-content-center w-100">
                    <div className="col-md-8 d-none d-md-flex justify-content-center align-items-center">
                        <img src={img} width={900} className='' alt="" />
                    </div>
                    <div className="col-md-4 col-lg-4">
                        <Card className='py-3 rounded-4 shadow-sm d-flex align-items-center justify-content-center' sx={{ height: "93vh" }}>
                            <CardContent className=''>
                                <div className="d-flex align-items-center justify-content-center mb-5">
                                    <img src="https://ticketing-systems-five.vercel.app/logo.webp" width={70} className='img-fluid' alt="TECHNO COMMUNICATIONS LLC logo" />
                                    <Typography variant="h5" component="h2" sx={{ fontSize: "23px" }} className='fw-bold' color='#6f2da8' align="center" gutterBottom>
                                        TECHNO COMMUNICATIONS LLC
                                    </Typography>
                                </div>
                                <Typography variant="h5" component="h2" sx={{ fontSize: "23px" }} className='fw-bold' color='#6f2da8' gutterBottom>
                                    Login
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
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
                                    {
                                        localStorage.getItem("fgpts") === true ?
                                            <Link to={'/fogot-password'}>Forget Password</Link> : ""

                                    }
                                    <Button type="submit" variant="contained" className='py-3 fs-6 fw-semibold' disabled={loading} fullWidth sx={{ mt: 2, background: "#6f2da8", color: "white" }}>
                                        {loading ? <CircularProgress size={20} /> : "Login"}
                                    </Button>
                                </form>
                                <div className=" mt-4 text-center">
                                    <Link to="mailto:it@techno-communication.com" className='fw-semibold text-decoration-none'>Support</Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
