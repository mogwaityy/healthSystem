import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Form.css';
import { SignUpData2 } from '../../../Data/SignUpData';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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

    const [showPassword, setShowPassword] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // 打印表单数据以进行调试
        if (!formData.password.trim() || !formData.confirmPassword.trim()) {
            alert("所有字段不能为空");
            return;
        }
        if (formData.password.length < 8) {
            alert("密码长度必须至少8位");
            return;
        }
        if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password)) {
            alert("密码必须包含大小写字母。");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("两次输入的密码不一致！");
            return;
        }
        sessionStorage.setItem('signUpDataStep2', JSON.stringify(formData)); // Save form data to sessionStorage
        history.push('/register-3', { formData }); // Navigate to next step
    };

    return (
        <div style={{backgroundColor:"#eaf0f7", display:"flex", height:"100vh"}}>
            <div className="mbanner-btn">
                <button onClick={goHome} style={{position:"absolute", top:"5%",left:"5%"}}>返回</button>
            </div>
            <div className="bg-register">
                <h1>注册</h1>
                <form onSubmit={handleSubmit} className="form-container mform1">
                    {SignUpData2.map((field, index) => (
                        <div className="input-group" key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                value={formData[field.name]}
                                className="text-input"
                            />
                        </div>
                    ))}
                    <button type="submit" className='submit-btn'>下一步</button>
                    <button onClick={goBack} className='submit-btn'>上一步</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpStep2;
