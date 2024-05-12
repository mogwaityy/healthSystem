import React, { useEffect, useState } from 'react';
import HeaderComponent2 from './HeaderComponent';
import MedicalHistory from './MedicalHistory';
import BasicInfoComponent from './BasicInfoComponent';
import SymptomInfoComponent from './SymptonComponent';
import ActionsComponent from './ActionComponent';
import DoctorActionComponent from './DoctorActionComponent';
import './Detail.css';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useGender from '../../hooks/gender';
import { getPatientInfoApi } from '../../api/action/appointment';
import useExtractDate from '../../hooks/exDate';
import { emitter } from "@/api/m/index"
export const PatientDetail = () => {
    const location = useLocation();
    const history = useHistory();
    const { extractDate } = useExtractDate()
    //useExtractDate()

    console.log('location.state', location?.state)
    const curRow = location?.state?.row;
    const { mapGender } = useGender()
    if (!curRow) {
        history.push("/admin/dash")
    }
    const patientInfo = {
        name: curRow?.patient?.name,
        applicationNo: curRow?.appointment?.appointmentId,
        dob: extractDate(curRow?.patient?.birth),
        gender: mapGender[curRow?.patient?.gender ?? 0],
        mobile: curRow?.patient?.mobile,
        email: curRow?.patient?.email,
        //nhsNumber: "112233445"
    };
    console.log("curRow===>",curRow)
    //curRow.patient.patientId

    // let medicalHistoryItems = ["Diabetes", "Hypertension"]; 
    const symptoms = [{
        description: curRow?.appointment?.description,
    }];

    const [medicalHistoryItems, setmedicalHistoryItems] = useState([])
    useEffect(() => {
        if (curRow?.patient?.patientId) {
            console.log("curRow.patient.patientId==>", curRow.patient.patientId)

            getPatientInfoApi(curRow.patient.patientId).then(res => {
                console.log('curRow.appointment.appointmentId===>', res)
                if (res?.medicalHistories) {

                    setmedicalHistoryItems(res?.medicalHistories.map(item => item.description) ?? [])
                }
            })
        }
    }, [])

    emitter.on("updateMedicalHistoryItems", () => {
        if (curRow?.patient?.patientId) {
            console.log("curRow.patient.patientId==>", curRow.patient.patientId)

            getPatientInfoApi(curRow.patient.patientId).then(res => {
                console.log('curRow.appointment.appointmentId===>', res)
                if (res?.medicalHistories) {

                    setmedicalHistoryItems(res?.medicalHistories.map(item => item.description) ?? [])
                }
            })
        }
    })


    return (
        <div className="blue-bg">
            <div className="mbox">
                <div className="leftbox">
                    <HeaderComponent2 name={patientInfo.name} applicationNo={patientInfo.applicationNo}  appointmentTime={curRow.appointment.date}  />
                    <BasicInfoComponent patientInfo={patientInfo} />
                    <SymptomInfoComponent symptoms={symptoms} />
                    <MedicalHistory historyItems={medicalHistoryItems} />
                </div>
                <div className="rightbox">
                    <DoctorActionComponent row={curRow} />
                </div>


            </div>
        </div>
    );
}

export default PatientDetail;
