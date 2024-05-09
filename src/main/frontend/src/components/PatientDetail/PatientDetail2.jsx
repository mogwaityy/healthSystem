import React, { useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent';
import MedicalHistory from './MedicalHistory';
import BasicInfoComponent from './BasicInfoComponent';
import SymptomInfoComponent from './SymptonComponent';
import ActionsComponent from './ActionComponent';
import DoctorActionComponent from './DoctorActionComponent';
import './Detail.css';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const PatientDetail = () => {
    const location = useLocation();
    const history = useHistory();
 
    console.log('location.state',location?.state)
    const curRow = location?.state?.row;
    if(!curRow){
        history.push("/doctor")
    }
    const patientInfo = {
        name: curRow?.patient?.name,
        applicationNo: curRow?.appointment?.appointmentId ,
        dob: curRow?.patient?.birth,
        gender: curRow?.patient?.gender,
        mobile: curRow?.patient?.mobile,
        email: curRow?.patient?.email,
        //nhsNumber: "112233445"
    };
    //curRow.patient.patientId

    let medicalHistoryItems = ["Diabetes", "Hypertension"]; 
    const symptoms = [{
        description: curRow?.appointment?.description,
    }];  

  

    return (
        <div className="mbox">
            <div className="leftbox">
                <HeaderComponent name={patientInfo.name} applicationNo={patientInfo.applicationNo}/>
                <BasicInfoComponent patientInfo={patientInfo}/>
                <SymptomInfoComponent symptoms={symptoms}/>
                <MedicalHistory historyItems={medicalHistoryItems}/>
            </div>
            <div className="rightbox">
                <DoctorActionComponent row={curRow}/>
            </div>


        </div>
    );
}

export default PatientDetail;
