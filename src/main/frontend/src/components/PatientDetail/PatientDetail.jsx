import React from 'react';
import HeaderComponent from './HeaderComponent';
import MedicalHistory from './MedicalHistory'; 
import BasicInfoComponent from './BasicInfoComponent';
import SymptomInfoComponent from './SymptonComponent';
import ActionsComponent from './ActionComponent';
import DoctorActionComponent from './DoctorActionComponent';
import './Detail.css';

import { useLocation } from 'react-router-dom';
import { getPatientInfoApi } from '../../api/action/appointment';
export const PatientDetail = () => {
    const location = useLocation();
    console.log('location.state',location?.state)
    const curRow = location?.state?.row;
    const patientInfo = {
        name: curRow?.patient?.name,
        applicationNo: curRow?.appointment?.appointmentId ,
        dob: curRow?.patient?.birth,
        gender: curRow?.patient?.gender,
        mobile: curRow?.patient?.mobile,
        email: curRow?.patient?.email,
        //nhsNumber: "112233445"
    };
    let medicalHistoryItems = ["Diabetes", "Hypertension"]; 
    const symptoms = [{
        description: curRow?.appointment?.description,
    }];    
    //getPatientInfoApi
    if(curRow?.patient?.patientId){
        console.log("curRow.patient.patientId==>",curRow.patient.patientId)
        getPatientInfoApi(curRow.patient.patientId).then(res => {
            console.log('curRow.appointment.appointmentId===>',res)
        })
    }
    

    

    return (
        <div className="mbox">
            <div className="leftbox">
                <HeaderComponent name={patientInfo.name} applicationNo={patientInfo.applicationNo}/>
                <BasicInfoComponent patientInfo={patientInfo}/>
                <SymptomInfoComponent symptoms={symptoms}/>
                <MedicalHistory historyItems={medicalHistoryItems}/>
            </div>
            <div className="rightbox">
                <ActionsComponent row={curRow}/>
            </div>


        </div>
    );
}

export default PatientDetail;
