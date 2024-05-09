import React, { useState, useEffect } from 'react';

import "../home/Login/Form.css"
import AppointmentImg from '../../assets/bookAppointment.jpg';
import AppointmentImg2 from '../../assets/img.png'
import  "../../App.css"
import "../PractitionerDash/Practitioner.css"
import MakeAppointmentForm from "../MakeAppointmentForm";
import { useHistory } from 'react-router-dom';

function MakeAppointment() {
    const history = useHistory(); // 获取history对象

    
    const goBack = () => {
        history.push('/'); // 使用history.push()方法导航到主页
    };
    return (
        <>
            <section className="make-appointment">
                <div className="container" style={{background: "#eaf0f7", minHeight:"100vh"}}>
                    <div className="mbanner">
                        <img style={{width: "100%"}} src={AppointmentImg}></img>
                        <button onClick={goBack}>Back</button>
                    </div>
                        <div className="container flex"
                             style={{marginTop: "20px", marginLeft: "10%", marginRight: "10%"}}>
                            
                            <div className="bigger-container"><MakeAppointmentForm/></div>
                            <div className="smaller-container"><img src={AppointmentImg2} style={{width: "100%"}}></img>
                            </div>
                        </div>

                    </div>
            </section>
        </>
    );
}

export default MakeAppointment;
