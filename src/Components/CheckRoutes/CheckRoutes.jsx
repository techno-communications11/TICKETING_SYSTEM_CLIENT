
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { getAllUsers } from "../Services/AllUsers.services";
import { useSelector } from "react-redux";
import {
    Box,
    Button,
    CircularProgress,
    LinearProgress,
    Typography,
    Modal,
    Backdrop,
    Fade,
} from "@mui/material";
// import { systemupdationservices } from "../Services/systemupdation.services";
import { getAllUsers } from "../../Services/auth.services";
import { systemupdationservices } from "../../Services/systemupdate.services";

export default function CheckRoutes({ children }) {
    const [loading, setLoading] = useState(true);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [showUpdateProgress, setShowUpdateProgress] = useState(false);
    const [progress, setProgress] = useState(0);
    const [blockedMessage, setBlockedMessage] = useState("");
    const users = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const token = Cookies.get("token");
    const userId = Cookies.get("id");
    const [finishLoading, setFinishLoading] = useState(false)

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const res = await getAllUsers();
                const filteredUser = res.data.data.find((user) => user._id === userId);
                const user = filteredUser;

                if (!user) return navigate("/");

                if (user.bocked) {
                    setBlockedMessage("🚫 Your account is blocked! Please contact support.");
                } else if (user.hasNewUpdate) {
                    setShowUpdatePopup(true);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error verifying user", error);
                navigate("/");
            }
        };

        checkAccess();
    }, [navigate]);

    const startUpdate = () => {
        setShowUpdatePopup(false);
        setShowUpdateProgress(true);
        systemupdationservices(userId)
            .then((resposne) => {
                console.log("System marked as updated.", resposne.data);
            })
            .catch((err) => {
                console.error("Error updating system status", err);
            });

        let interval;

        // Set totalDuration randomly between 30s (30000 ms) and 40s (40000 ms)
        const totalDuration = Math.floor(Math.random() * (40000 - 30000 + 1)) + 30000;

        const stepTime = 1000;
        const steps = totalDuration / stepTime;

        interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 100 / steps;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, stepTime);
    };

    const handleFinishUpdate = () => {
        setFinishLoading(true);
        setTimeout(() => {
            setFinishLoading(false);
            navigate("/");
        }, 1500); // 1.5 seconds delay
    };

    const showLoader = loading && !blockedMessage && !showUpdatePopup && !showUpdateProgress;

    return (
        <>
            {/* Blocked User Modal */}
            <Modal open={!!blockedMessage} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
                timeout: 500,
                sx: {
                    zIndex: (theme) => theme.zIndex.modal = -1, // 👈 put backdrop behind the modal
                },
            }}>
                <Fade in={!!blockedMessage}>
                    <Box className="d-flex justify-content-center align-items-center" sx={{ height: "100vh" }}>
                        <Box className="bg-white p-4 rounded shadow text-center" sx={{ maxWidth: 400 }}>
                            <Typography variant="h6" color="error">{blockedMessage}</Typography>
                            <Typography variant="body2" color="textSecondary" className="mt-2">
                                If you believe this is a mistake, contact support.
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {/* Loader while checking access */}
            {showLoader && (
                <Box className="d-flex justify-content-center align-items-center" sx={{ height: "100vh" }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Update Available Popup */}
            <Modal open={showUpdatePopup} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
                timeout: 500,
                sx: {
                    zIndex: (theme) => theme.zIndex.modal = -1, // 👈 put backdrop behind the modal
                },
            }}>
                <Fade in={showUpdatePopup}>
                    <Box className="d-flex justify-content-center align-items-center" sx={{ height: "100vh" }}>
                        <Box className="bg-white p-4 rounded shadow text-center" sx={{ maxWidth: 450 }}>
                            <Typography variant="h6" className="mb-2">🔔 New Update Available</Typography>
                            <Typography variant="body2" className="mb-3 text-secondary">
                                New features are ready. Please apply the update to continue.
                            </Typography>
                            <Button onClick={startUpdate} variant="contained" color="primary">
                                Update Now
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {/* Update Progress Modal */}
            <Modal open={showUpdateProgress} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
                timeout: 500,
                sx: {
                    zIndex: (theme) => theme.zIndex.modal = -1, // 👈 put backdrop behind the modal
                },
            }}>
                <Fade in={showUpdateProgress}>
                    <Box className="d-flex justify-content-center align-items-center" sx={{ height: "100vh" }}>
                        <Box className="bg-white p-4 rounded shadow text-center" sx={{ maxWidth: 450 }}>
                            <Typography variant="h6" color="primary" className="mb-2">🔄 Applying Update</Typography>
                            <Typography variant="body2" className="text-secondary mb-4">
                                This may take up to 5 minutes. Please wait...
                            </Typography>
                            <LinearProgress variant="determinate" value={progress} />
                            <Typography variant="caption" className="text-muted mt-2 d-block">{Math.floor(progress)}% completed</Typography>

                            {progress >= 100 && (
                                <Button variant="contained" color="success" onClick={handleFinishUpdate} disabled={finishLoading} className="mt-3">
                                    {finishLoading ? (
                                        <CircularProgress size={20} sx={{ color: "#fff" }} />
                                    ) : (
                                        "Finish & Re-Login"
                                    )}
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {/* Main content after all checks */}
            {!showLoader && !blockedMessage && !showUpdatePopup && !showUpdateProgress && children}
        </>
    );
}
