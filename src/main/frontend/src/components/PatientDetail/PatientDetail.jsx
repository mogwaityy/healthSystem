import React, { useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent';
import MedicalHistory from './MedicalHistory'; 
import BasicInfoComponent from './BasicInfoComponent';
import SymptomInfoComponent from './SymptonComponent';
import ActionsComponent from './ActionComponent';
import DoctorActionComponent from './DoctorActionComponent';
import './Detail.css';

import { useLocation } from 'react-router-dom';
import { getPatientInfoApi } from '../../api/action/appointment';
import useGender from '../../hooks/gender';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useExtractDate from '../../hooks/exDate';
export const PatientDetail = () => {
    const location = useLocation();
    const history = useHistory();
    const {mapGender} = useGender()
    
    console.log('location.state',location?.state)
    
    
    const curRow = location?.state?.row;
    if(!curRow){
        history.push("/admin/dash")
    }
    const patientInfo = {
        name: curRow?.patient?.name,
        applicationNo: curRow?.appointment?.appointmentId ,
        appointmentTime: curRow?.appointment?.date,
        dob: curRow?.patient?.birth,
        gender: mapGender[curRow?.patient?.gender ?? 0],
        mobile: curRow?.patient?.mobile,
        email: curRow?.patient?.email,
    };
   // let medicalHistoryItems = ["Diabetes", "Hypertension"]; 
    
    const symptoms = [{
        description: curRow?.appointment?.description,
    }];    
    //getPatientInfoApi
    
    const [medicalHistoryItems,setmedicalHistoryItems] = useState([])
    useEffect(() => {
        if(curRow?.patient?.patientId){
            console.log("curRow.patient.patientId==>",curRow.patient.patientId)
            getPatientInfoApi(curRow.patient.patientId).then(res => {
                console.log('curRow.appointment.appointmentId===>',res)
                if(res?.medicalHistories){
                    
                    setmedicalHistoryItems(res?.medicalHistories.map(item=>item.description)??[])
                }
            })
        }
    },[])
    

    

    return (
        <div className="blue-bg">
        <div className="mbox">
            <div className="leftbox">
                <HeaderComponent name={patientInfo.name} applicationNo={patientInfo.applicationNo} appointmentTime={patientInfo.appointmentTime}/>
                <BasicInfoComponent patientInfo={patientInfo}/>
                <SymptomInfoComponent symptoms={symptoms}/>
                <MedicalHistory historyItems={medicalHistoryItems}/>
            </div>
            <div className="rightbox">
                <ActionsComponent row={curRow}/>
            </div>


        </div>
        </div>
    );
}

export default PatientDetail;
