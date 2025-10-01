import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import {
    Edit as EditIcon,
} from '@mui/icons-material';
import { editicketServices } from '../Services/tickets.services';
function EditTickets({ selectedRows }) {

    const efditTickets = async () => {
        try {
            const response = await editicketServices(selectedRows[0])
            console.log(response)
        } catch (error) {
            console.log("ERROR", error.message)
        }
    }
    return (
        <div>
            <Tooltip title="Edit">
                <IconButton onClick={() => efditTickets()} sx={{
                    '& .MuiSvgIcon-root': {
                        transition: 'color 0.3s ease',
                    }
                }}>
                    <EditIcon color="primary" />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default EditTickets