//SignUpStep2.jsx
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Form.css';
import { SignUpData2 } from '../../../Data/SignUpData';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SignUpStep3 from "./SignUpStep3";
import { TextField, IconButton, Button, InputLabel } from '@mui/material';

const SignUpStep2 = () => {
    const history = useHistory();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const goHome = () => {
        history.push('/');
    };


    const goBack = () => {
        history.push('/register');
    };

    const [showPassword, setShowPassword] = useState([false, false]);

    useEffect(() => {
        if (location.state && location.state.formData) {
            setFormData(location.state.formData);
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleTogglePasswordVisibility = (index) => {
        showPassword[index] = !showPassword[index]
        setShowPassword([...showPassword]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // 打印表单数据以进行调试
        if (!formData.password.trim() || !formData.confirmPassword.trim()) {
            alert("All field cannot be empty.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        sessionStorage.setItem('signUpDataStep2', JSON.stringify(formData)); // Save form data to sessionStorage
        history.push('/register-3', { formData }); // Navigate to next step
    };

    return (
        <div style={{ backgroundColor: "#eaf0f7", display: "flex", height: "100vh" }}>
            <div className="mbanner-btn">
                <button onClick={goHome} style={{ position: "absolute", top: "5%", left: "5%", width:"150px" }}>Back to Home</button>
            </div>
            <div className="bg-register">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} className="form-container mform1"
                >
                    {SignUpData2.map((field, index) => (
                        <div key={index}>

                            <TextField fullWidth style={{marginBottom:"20px"}}
                                type={!showPassword[index] ? "password" : "text"}
                                id={field.name}
                                       label={field.label}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                value={formData[field.name]}
                                className="text-input"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={e => {
                                                handleTogglePasswordVisibility(index)
                                            }}
                                            edge="end"
                                        >
                                            {showPassword[index] ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                        </IconButton>
                                    )
                                }}
                            />

                        </div>
                    ))}
                    <div style={{
                        display: "flex",
                        flexFlow: "column",
                        gap: "10px",
                    }}>
                        <button type="submit" style={{height:"45px"}} className='submit-btn'> Next Step</button>
                        <button onClick={goBack} style={{height:"45px"}} className='submit-btn'> Previous Step</button>
                    </div>
                </form>
            </div>

        </div>

    );
}


export default SignUpStep2;