import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, getAppBarUtilityClass } from '@mui/material';
import {getAppointmentApi, getAppointmentByStatusApi} from "../../../api/action/appointment"

// Function to create mock appointment data
function createAppointment(applicationNo, date, doctor, symptom, specialty, test = '', prescription = '') {
  return { applicationNo, date, doctor, symptom, specialty, test, prescription };
}

// Initial appointments data
const initialAppointments = []

// Main component
export default function BasicTable() {
  const history = useHistory();

  const [appointments, setAppointments] = useState(initialAppointments);
  useEffect( ()=>{
      let token = localStorage.getItem('token')
      let result =  getAppointmentApi({token}).then(res=>{
          if(res){
            setAppointments(res);
            console.log('getAppointmentApi==>',res)
          }
      })
      //getAppointmentByStatusApi
      // getAppointmentByStatusApi(1).then(res=>{
      //   console.log('getAppBarUtilityClassres==>',res)
      // })
      
    

    return ()=>{
      console.log(111)
    }
    
  },[])

  // Handler for canceling an appointment
  // const handleCancel = (applicationNo) => {
  //   const updatedUpcoming = appointments.upcoming.filter(app => app.applicationNo !== applicationNo);
  //   setAppointments(prev => ({ ...prev, upcoming: updatedUpcoming }));
  //   alert("Appointment canceled successfully!");
  // };

  // Handler for rescheduling an appointment
  const handleReschedule = (appointment) => {
    history.push({
      pathname: '/make-appointment',
      state: { appointment } // Passing appointment details for pre-filling the form
    });
  };

  // Handler for showing prescription details
  const gotoPrescription = (applicationNo) => {
    history.push(`/prescription/${applicationNo}`);
  };

  return (
    <div className="Table">
    
      <h3>Your appointments</h3>
      <TableContainer
        component={Paper}
        className="table-container"
        style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: "20px" }}
      >
        <Table sx={{ minWidth: 1100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Application No.</TableCell>
              <TableCell>Date</TableCell>
            
              <TableCell>Doctor</TableCell>
              <TableCell>Symptom</TableCell>
              <TableCell>Specialty</TableCell>
          
              <TableCell>Prescription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
         
            {appointments.length> 0 ? appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment?.appointment?.appointmentId}</TableCell>
                <TableCell>{appointment?.appointment?.date}</TableCell>
                
                <TableCell>{appointment?.doctor?.name}</TableCell>
                <TableCell>{appointment?.appointment?.description}</TableCell>
                <TableCell>{appointment?.doctor?.specialty}</TableCell>
          
                <TableCell>
                 <Button onClick={() => gotoPrescription(appointment?.appointment?.appointmentId)}>Show</Button>
                </TableCell>
              </TableRow>
            )) : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
