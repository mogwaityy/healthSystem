import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Container, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './PractitionerDash/Practitioner.css'

const CreateDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        introduction: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 这里处理表单提交逻辑，通常是将数据发送到后端服务器
        console.log(formData);
    };

    return (
        <div className="MainDash">
            <div className="top-bar">

            </div>
            <Container component="main" maxWidth="sm">
                <Paper style={{ padding: '20px', marginTop:'20px' }}>
                    <Typography variant="h5" component="h1" style={{ marginBottom: '5px' }}>
                        Doctor Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Specialty"
                            name="specialty"
                            variant="outlined"
                            value={formData.specialty}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Introduction"
                            name="introduction"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.introduction}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handlePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Box style={{ marginTop: '10px' }}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>

        </div>
    );
}

export default CreateDoctor;
