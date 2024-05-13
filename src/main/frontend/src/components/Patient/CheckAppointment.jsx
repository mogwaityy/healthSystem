import React from 'react';
import '../PractitionerDash/MainDash/MainDash.css';
import CheckAppointmentTable from '../PractitionerDash/Table/CheckAppointmentTable';
import AppointmentImg2 from "../../assets/img_1.png";
import {useHistory} from "react-router-dom";

export const CheckAppointment = () => {
    const history = useHistory();

    const goBack = () => {
        history.push('/'); // 使用history.push()方法导航到主页
    };
  return (
      <>
          <div className="container" style={{background: "#eaf0f7", minHeight:"100vh"}}>
              <div className="mbanner">
                  <img style={{width: "100%"}} src={AppointmentImg2}></img>
                  <button onClick={goBack}>Back</button>
              </div>
              <div style={{margin:"20px 100px"}}>
              <CheckAppointmentTable/>
              </div>
          </div>
      </>

  )
}
