import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useGlobalState } from '../Context/context';

function SuperAdminAddStoreForm() {
    const { formData, setFormData, errors, setErrors } = useGlobalState();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };
    return (
        <div className="d-flex flex-wrap gap-3">
            <div className="col-12">
                <TextField fullWidth label="BID ID" name="bdi_id" value={formData.bdi_id} onChange={handleChange} error={!!errors.bdi_id} helperText={errors.bdi_id} />
            </div>
            <div className="col-12">
                <TextField fullWidth label="District Manager" name="dm_name" value={formData.dm_name} onChange={handleChange} error={!!errors.dm_name} helperText={errors.dm_name} />
            </div>
            <div className="col-12">
                <TextField fullWidth label="Store Name" name="store_name" value={formData.store_name} onChange={handleChange} error={!!errors.store_name} helperText={errors.store_name} />
            </div>
            <div className="col-12">
                <TextField
                    select fullWidth label="Markets" name="market"
                    value={formData.market} onChange={handleChange}
                    error={!!errors.market} helperText={errors.market}
                >
                    {
                        ["HO", "BOPK", "BOIN", "ARIZONA", "BAY AREA", "COLORADO", "DALLAS", "EL PASO", "FLORIDA", "HOUSTON", "LOS ANGELES", "MEMPHIS", "NASHVILLE", "NORTH CAROLINA", "OXNARD", "PALMDALE", "SACRAMENTO", "SAN DIEGO", "SAN FRANCISCO", "SAN JOSE", "SOLANO COUNTY", "CHARLOTTE"]
                            .map((data) => <MenuItem key={data} value={data}>{data}</MenuItem>)
                    }
                </TextField>
            </div>
            <div className="col-12">
                <TextField fullWidth label="Door Code" name="door_code" value={formData.door_code} onChange={handleChange} error={!!errors.door_code} helperText={errors.door_code} />
            </div>
            <div className="col-12">
                <TextField fullWidth label="Store Address" name="store_addres" value={formData.store_addres} onChange={handleChange} error={!!errors.store_addres} helperText={errors.store_addres} />
            </div>
            <div className="col-12">
                <TextField fullWidth label="Store Email" name="stroe_email" value={formData.stroe_email} onChange={handleChange} error={!!errors.stroe_email} helperText={errors.stroe_email} />
            </div>
            <div className="col-12">
                <TextField fullWidth label="Store Phone" name="store_phone" value={formData.store_phone} onChange={handleChange} error={!!errors.store_phone} helperText={errors.store_phone} />
            </div>
        </div>
    )
}

export default SuperAdminAddStoreForm