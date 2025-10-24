import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useGlobalState } from '../../Context/context'

function AlertCompo() {
    const { snackbarOpen, setSnackbarOpen, snackbarSeverity, snackbarMessage } = useGlobalState()
    return (
        <div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertCompo