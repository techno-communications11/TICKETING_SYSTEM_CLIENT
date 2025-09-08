import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


export default function BasicBreadcrumbs({ name, secondname }) {
    function handleClick(event) {
        event.preventDefault();
        window.history.back();
    }
    return (
        <div role="presentation" className='mb-3' onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }} className='fw-semibold'>
                    Dashboard
                </Link>
                {
                    secondname &&
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                        className='fw-semibold text-secondary'
                    >
                        {name}
                    </Link>
                }
                <Typography sx={{ color: 'text.primary' }} className='fw-semibold text-secondary'>{secondname ? secondname : name}</Typography>
            </Breadcrumbs>
        </div>
    );
}
