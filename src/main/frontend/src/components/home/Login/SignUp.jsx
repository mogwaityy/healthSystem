import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
import {SignUpData1, SignUpData2} from '../../../Data/SignUpData';

const SignUpStep1 = () => {
    const [formData, setFormData] = useState({});
    const history = useHistory();

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const goBack = () => {
        history.push('/'); // 使用history.push()方法导航到主页
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // 打印表单数据以进行调试
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
            sessionStorage.setItem('signUpDataStep1', JSON.stringify(formData)); // Save form data to sessionStorage
            history.push('/register-2'); // Navigate to next step
        } else {
            alert(validationErrors.common);
        }
    };

    const validateFormData = (data) => {
        let errors = {};

        SignUpData1.forEach(field => {
            if (field.required && (!data[field.name] || data[field.name].trim() === '')) {
                errors.common = 'Field cannot be empty';
            }
        });

        if (data.email && !isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div style={{backgroundColor:"#eaf0f7", display:"flex", height:"100vh"}}>
            <div className="mbanner-btn">
                <button onClick={goBack} style={{position:"absolute", top:"5%",left:"5%", width:"150px"}}>返回主页</button>
            </div>

            <div className="bg-register">
                <h1>注册</h1>
                <form onSubmit={handleSubmit} className="form-container mform1">
                    {SignUpData1.map((field, index) => (
                        <div className="input-group" key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === "select" ? (
                                <select
                                    id={field.name}
                                    name={field.name}
                                    onChange={handleChange}
                                    value={formData[field.name] || ""}
                                    required={field.required}
                                    className="text-input"
                                >
                                    {field.options.map((option, index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    value={formData[field.name] || ""}
                                    required={field.required}
                                    className="text-input"
                                    max={field.type === 'date' ? getTodayDate() : ''}
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className='submit-btn'> Next Step</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpStep1;
