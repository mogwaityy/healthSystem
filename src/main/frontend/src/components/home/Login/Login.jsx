import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginData } from '../../../Data/SignUpData';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {LoginApi} from "../../../api/action/login";
import {emitter} from "../../../api/m/index";
import Cookies from 'js-cookie';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { getPatientStatusApi } from '../../../api/action/appointment';

const Login = () => {
    const history = useHistory();

    const goRegister = () => {
        history.push('/register');
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
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
        const regex = /(.+), token: ([a-f0-9-]+)/i;
        const match = responseString.match(regex);

        if (match) {
            const successMessage = match[1].trim(); // 匹配登录成功的未知信息并去除前后空白
            const token = match[2]; // 第二个括号内的内容即为token
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
        //et data = await getPatientStatusApi()
        if(formData.role === "patient"){
            let dataStatus = await getPatientStatusApi()
            console.log('getPatientStatusApi===>',dataStatus)
            //不存在状态
            if(dataStatus?.reponseFailStatus){
                localStorage.setItem("pStatus",0)
            }else{
                localStorage.setItem("pStatus",dataStatus)
            }
        }
      

        const result = parseDynamicLoginResponse(data);
        console.log("Login message:", result.successMessage);
        console.log("Token:", result.token);
        if(result.token){
            alert(result.successMessage)
            //处理对应的存储
            localStorage.setItem('token', result.token);
            localStorage.setItem('role', formData.role);
            Cookies.set("satoken",result.token)
            localStorage.setItem('curUser',JSON.stringify({
                user_name:formData.email,
            }))

            emitter.emit('userLoginIn',{
                user_name:formData.email,
                role:formData.role
            })
            //向上发送对应的通
        }
    };


    return (
        <div style={{marginTop:"50px"}}>
            <h1 style={{textAlign:"center", color:"#1F2B6C",marginBottom:"40px"}}>登录</h1>
            <form onSubmit={handleSubmit}>
                {LoginData.map((field, index) => (
                    <FormControl fullWidth key={index} margin="normal" variant="outlined" fullwidth>
                        {field.type === "select" ? <InputLabel htmlFor={field.name}>{field.label}</InputLabel> :""}
                        {field.type === "select" ? (
                            <Select
                                label={field.label}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                            >
                                {field.options.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        ) : (
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
                        )}
                        {errors[field.name] && <div style={{color: 'red', marginTop: '8px'}}>{errors[field.name]}</div>}
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

                <div className="register-link">
                    <p onClick={goRegister}> 没有账号？点击注册！</p>
                </div>

            </form>
        </div>
    );
};

export default Login;
