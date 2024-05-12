import React from 'react'
import AppointmentTable from './PractitionerDash/Table/AppointmentTable'

const DoctorDash = () => {
  return (
      <div className="MainDash">
        <div className="top-bar" style={{marginBottom: "30px"}}>
          <h1>Your Appointments</h1>
        </div>
        <AppointmentTable/>
      </div>
  )
}

export default DoctorDash