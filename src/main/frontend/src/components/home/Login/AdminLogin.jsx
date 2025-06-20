import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {LoginApi} from "../../../api/action/login";
import Cookies from "js-cookie";
import {emitter} from "../../../api/m";
import {LoginData2} from "../../../Data/SignUpData";
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const AdminLogin = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'admin'
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

    function parseDynamicLoginResponse(responseString) {
        // 兼容中文逗号和冒号，提取token
        const regex = /token[:：]\s*([a-f0-9-]+)/i;
        const match = responseString.match(regex);

        if (match) {
            const token = match[1];
            const successMessage = responseString.split(/token[:：]/)[0].trim();
            history.push('./admin/dash')
            return { successMessage, token };
        } else {
            return { successMessage: "", token: null }; // 如果匹配失败
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password ) {
            alert("所有字段均为必填！");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("邮箱格式不正确！");
            return;
        }

        const data = await LoginApi(formData);
        if(data?.reponseFailStatus){
            return false;
        }
        //data

        const result = parseDynamicLoginResponse(data);
        console.log("Login message:", result.successMessage);
        console.log("Token:", result.token);
        if(result.token){
            alert(result.successMessage)
            //处理对应的存储
            localStorage.setItem('token', result.token);
            localStorage.setItem( 'role','admin');
            Cookies.set("satoken",result.token)
            localStorage.setItem('curUser',JSON.stringify({
                user_name:formData.email,
            }))

            emitter.emit('userLoginIn',{
                user_name:formData.email,
                role:"admin"
            })
            //向上发送对应的通
        }
    };


    return (
        <div style={{backgroundColor: "#eaf0f7", display: "flex", height: "100vh"}}>
            <div className="bg-register">
                <h1 style={{textAlign: "center", color: "#1F2B6C", marginBottom: "40px"}}>登录</h1>
                <form onSubmit={handleSubmit}>
                    {LoginData2.map((field, index) => (
                        <FormControl fullWidth key={index} margin="normal" variant="outlined" fullwidth>
                            {field.type === "select" ? <InputLabel htmlFor={field.name}>{field.label}</InputLabel> : ""}
                            <TextField
                                type={field.name === "password" && !showPassword ? "password" : "text"}
                                id={field.name}
                                name={field.name}
                                label={field.label}
                                value={formData[field.name]}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: field.name === "password" && (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon/> : <RemoveRedEyeIcon/>}
                                        </IconButton>
                                    )
                                }}
                            />

                            {errors[field.name] &&
                                <div style={{color: 'red', marginTop: '8px'}}>{errors[field.name]}</div>}
                        </FormControl>
                    ))}
                    {errors.form && <div style={{color: 'red', marginTop: '8px'}}>{errors.form}</div>}
                    <Button type="submit" style={{
                        width: "100%",
                        padding: "10px 20px",
                        backgroundColor: "#BFD2F8",
                        color: "#1F2B6C",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "20px"
                    }}>
                        登录
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
