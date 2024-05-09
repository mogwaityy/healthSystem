import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'admin'  // Set the role to 'admin' by default
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        if (!formData.email || !formData.password) {
            alert("Email and password are required!");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Invalid email format!");
            return;
        }

        const response = await fetch('/login', { // Assuming the endpoint might be different for admin
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (response.ok && data.success) {
            localStorage.setItem('adminToken', data.token); // Store token in localStorage
            history.push('/dash'); // Redirect to admin dashboard
            alert('Admin login successful!');
        } else {
            console.error('Admin login failed:', data.message);
            alert(data.message || "Admin login failed");
            setErrors({ form: data.message || "Failed to login, please try again." });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="text-input" />
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="password">Password:</label>
                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="text-input" />
                <span onClick={handleTogglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '8px', cursor: 'pointer' }}>
                    {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </span>
            </div>
            {errors.form && <div className="error">{errors.form}</div>}
            <button type="submit" className="submit-btn">Sign In</button>
        </form>
    );
};

export default Login;
