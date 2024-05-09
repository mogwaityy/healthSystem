import React, { useState, useRef, useEffect } from 'react';
import { Link as ScrollLink } from "react-scroll";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Model from 'react-modal'
import Login from './Login/Login';
import { useHistory } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { emitter } from "@/api/m/index"
import Cookies from 'js-cookie';
const Header = () => {
    const [sidebar, setSidebar] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loginIn, setloginIn] = useState(false);
    const [UserData, setUserData] = useState({});
    const history = useHistory();
    useEffect(() => {
        let curUser = localStorage.getItem('curUser');

        if (curUser) {
            curUser = JSON.parse(curUser)
            if(curUser?.user_name){
                setUserData(curUser)
                setloginIn(true);
            }

        }

    }, [])
    function clearSession(){
        localStorage.clear();
        setloginIn(false);
        setUserData({})
        const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]);
// 遍历所有cookie名称并使用js-cookie的remove方法删除它们
        cookies.forEach(cookieName => {
            Cookies.remove(cookieName);
        });
        alert("Logout success")
    }


    //触发弹窗的关闭
    emitter.on("userLoginIn", (data) => {
        setVisible(false)
        setloginIn(true)
        setUserData(data)
        console.log("ata.role===>",data.role)
        if(data.role == "admin"){
            history.push('/admin/dash')
        }
    })
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header")
        header?.classList?.toggle("active", this.window.scrollY > 170)
    })

    return (
        <header className='header'>
            <div className="title">
                <h1>E-CLINIC</h1>
            </div>
            <div className="nav flex">
                <ul className={sidebar ? "nav-links-sidebar" : "nav-links"} onClick={() => setSidebar(false)}>
                    <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
                    <li><ScrollLink to="service" smooth={true} duration={500}>Service</ScrollLink></li>
                    <li><ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink></li>
                </ul>
                {
                    loginIn ?
                        <><span style={{color: "#a4c0f7", fontSize:"0.8rem", position:"absolute", right:"31%"}}>{UserData.user_name}</span>
                            <button onClick={() => clearSession()} >Sign Out</button></>
                        : <button onClick={() => setVisible(true)}>Sign In</button>
                }

                <div className='navbar-items-icon' onClick={() => setSidebar(!sidebar)}>
                    {sidebar ? <CloseIcon /> : <MenuIcon />}
                </div>
            </div>
            <Model
                style={{ overlay: { background: "none" }, content: { margin: "auto", width: "450px", height: "600px" } }}
                isOpen={visible} onRequestClose={() => setVisible(false)}>
                <HighlightOffIcon style={{position:"absolute", "right":"5%", color:"#1F2B6C"}} onClick={() => setVisible(false)}
                />
                <Login />
            </Model>
        </header>

    );
}

export default Header;
