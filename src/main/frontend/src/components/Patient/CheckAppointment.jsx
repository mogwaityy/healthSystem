import React from 'react';
import '../PractitionerDash/MainDash/MainDash.css';
import CheckAppointmentTable from '../PractitionerDash/Table/CheckAppointmentTable';
import AppointmentImg2 from "../../assets/img_1.png";

export const CheckAppointment = () => {
  return (
      <>
          <section className="check-appointment">
              <div className="mbanner">
                  <img style={{width: "100%"}} src={AppointmentImg2}></img>
                  <button>Back</button>
              </div>
              <div className='admin-dash-container'>
              <CheckAppointmentTable/>
              </div>
          </section>
      </>

  )
}
