import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SignUpDataStaff } from '../Data/SignUpData';  
import './home/Login/Form.css';

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in SignUpDataStaff) {
      if (formData[key].trim() === '' && SignUpDataStaff[key].required) {
        alert('字段不能为空');
        return;
      }
    }

    if (SignUpDataStaff.email.required && !/\S+@\S+\.\S+/.test(formData.email)) {
      alert('邮箱格式无效');
      return;
    }

    console.log('Form Submitted', formData); 
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <div className="bg-register">
    <form onSubmit={handleSubmit} className='form-container'>
      {Object.values(SignUpDataStaff).map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          name={field.name}
          type={(field.name === 'password' || field.name === 'confirmPassword') ? (showPassword[field.name] ? 'text' : 'password') : field.type}
          placeholder={field.placeholder}
          required={field.required}
          value={formData[field.name]}
          onChange={handleChange}
          InputProps={{
            endAdornment: (field.name === 'password' || field.name === 'confirmPassword') ? (
              <InputAdornment position="end">
                <IconButton onClick={() => togglePasswordVisibility(field.name)} edge="end">
                  {showPassword[field.name] ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </IconButton>
              </InputAdornment>
            ) : null
          }}
          fullWidth
          margin="normal"
        />
      ))}
      <button type="submit" className="submit-btn">注册</button>
    </form>
    </div>
  );
};

export default StaffRegister;

