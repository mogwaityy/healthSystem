import React, { useEffect, useState } from 'react';
import { TextField, Select, Button, InputLabel, FormControl, Typography, Paper, MenuItem, Box, Container, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './PractitionerDash/Practitioner.css'
import { addDoctorApi, getDoctorBySpecialtyApi, getSpecialtyApi } from '../api/action/appointment';

const CreateDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        introduction: '',
        email: '',
        password: ''
    });
    const [specialty, setSpecialty] = useState([]);
    const [dockers, setDockers] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        getSpecialtyApi().then(res => {
            console.log('getSpecialtyApi==>', res)
            setSpecialty(res)
        })
    }, [])

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let result = await addDoctorApi(formData)
        if (!result?.responseFailStatus) {
            alert(result)
        }
    };

    return (
        <div className="MainDash">
            <Container component="main" maxWidth="sm">
                <Paper style={{ padding: '50px', marginTop: '50px' }}>
                    <h1 style={{ textAlign: "center" }}>新增医生</h1>
                    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
                        <TextField
                            fullWidth
                            label="姓名"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="Surgery-select-label">选择科室</InputLabel>
                            <Select
                                labelId="Surgery-select-label"
                                label="选择科室"
                                value={formData.specialty}
                                name="specialty"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>无</em>
                                </MenuItem>
                                {specialty.length && specialty.map((doctor) => (
                                    <MenuItem key={doctor.name} value={doctor.name}>{doctor.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="邮箱"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="简介"
                            name="introduction"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.introduction}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <Box style={{ marginTop: '10px' }}>
                            <button type="submit" className="submit-btn" style={{height:"45px"}}>
                                添加
                            </button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default CreateDoctor;
