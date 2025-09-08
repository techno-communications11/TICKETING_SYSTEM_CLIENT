import React from 'react';
import { Button, Typography, TextField, Box, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import AddIcon from '@mui/icons-material/Add';
import UploadFiles from '../Components/UploadFiles/UploadFiles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,  
    height: 600, // Fixed height
    bgcolor: 'background.paper',
    border: '1px solid #ccc', // Subtle border
    borderRadius: '8px', // Rounded corners
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
};

const contentStyle = {
    height: 'calc(100% - 150px)', // Leave space for header and footer
    overflowY: 'auto', // Enable vertical scrolling
    padding: '20px', // Add padding for better spacing
};
function StoreCreateTickteBtnCompo() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* Button to Open Modal */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    textTransform: 'none', // Prevents uppercase transformation
                    fontSize: '1rem', // Larger font size
                    padding: '10px 20px', // More padding for better clickability
                }}
            >
                Create New Ticket
            </Button>

            {/* Modal */}
            <Modal
                keepMounted
                open={open}

                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2, // Padding for the header
                            borderBottom: '1px solid #ccc', // Separator line
                        }}
                    >
                        {/* Title */}
                        <Typography
                            id="keep-mounted-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            Create New Ticket
                        </Typography>

                        {/* Close Button */}
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                color: '#666', // Subtle color for the close button
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Hover effect
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={contentStyle}>
                        <div className="container">
                            <div className="row d-flex align-items-center" style={{ gap: "10px 0px" }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"Store 1"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"store1@gmail.com"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"xxxxxxxxxxx"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"Arizona"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"store No 10001"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <FormControl size="medium" fullWidth>
                                        <InputLabel>Select Category of Problem</InputLabel>
                                        <Select
                                            label="Priority"
                                        >
                                            <MenuItem value="">Select Category of Problem</MenuItem>
                                            <MenuItem value="Problem 1">Problem 1</MenuItem>
                                            <MenuItem value="Problem 2">Problem 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <IconButton color="primary">
                                        <AddIcon />
                                    </IconButton>
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"Manager"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        value={"manager@gmail.com"}
                                        InputProps={{ readOnly: true }}
                                        disabled
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        margin="normal"
                                        multiline
                                        rows={4}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <UploadFiles />
                                </div>
                                <div className="col-md-12 d-flex justify-content-end">
                                    <div className="">
                                        <FormControl size="medium" sx={{ width: "180px" }}>
                                            <InputLabel>Priority</InputLabel>
                                            <Select
                                                label="Priority"
                                            >
                                                <MenuItem value="">Select Priority</MenuItem>
                                                <MenuItem value="Low">Low</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="High">High</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2,
                            borderTop: '1px solid #ccc',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                textTransform: 'none',
                                padding: '10px',
                            }}
                        >
                            Submit Ticket
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default StoreCreateTickteBtnCompo