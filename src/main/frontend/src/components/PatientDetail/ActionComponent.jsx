import React, { useEffect } from 'react';
import { useState } from 'react';
import './Detail.css';
import { getDoctorBySpecialtyApi, getDoctorScheduleApi, getSpecialtyApi, rejectAppointmentApi } from '../../api/action/appointment';

function ActionsComponent({ row }) {
    //获取所有科室的数据
    //getSpecialtyApi
    const [specialty, setSpecialty] = useState([]);
    const [dockers, setDockers] = useState([]);
    const [actionItems, setActionItems] = useState({
        action: "accept"
    });
    const [actionSubmitItems,setActionSubmitItems] = useState({
         "doctorId": "",
         "startTime": "",
         "endTime": "",
         "patientId": row?.patient.patientId,
         "appointmentId": row?.appointment?.appointmentId
        });


    async function handlerSubmit(){
            //getDoctorSchedule
         let data = await  getDoctorScheduleApi(actionSubmitItems);
         if(!data?.reponseFailStatus){
            alert("Success");
         }
    }


    useEffect(() => {
        getSpecialtyApi().then(res => {
            //{specialtyId: 1, name: 'General Medicine'}
            console.log('getSpecialtyApi==>', res)
            setSpecialty(res)
        })
    }, [])

    async function rejectAppointmentAction() {
        if (row?.appointment?.appointmentId) {
            let data = await rejectAppointmentApi(row.appointment.appointmentId)
            if (!data?.reponseFailStatus) {
                alert(data)
            }
        }

    }

    async function Check() {
        switch (actionItems.action) {
            case "accept":
                break;
            case "reject":
                break;
            case "alternative":
                break;
        }
    }
    async function handleChange(e) {
        console.log("e.target", e.target.value)
        let data = await getDoctorBySpecialtyApi(e.target.value)
        console.log('getDoctorBySpecialtyApi==>', data)
        setDockers(data)

    }

    return (
        <div className="actions">
            <h3>Actions</h3>
            <select value={actionItems.action} onChange={(e) => {
                let val = e.target.value;
                setActionItems({ ...actionItems, action: val })
            }}>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
                <option value="alternative">Alternative Option</option>
            </select>
            <button onClick={() => {
                Check();
            }}>Check Doctor Timetable</button>
            <select onChange={handleChange} >
                {specialty.length > 0 ?
                    specialty.map(option => <option key={option.specialtyId} value={option.name}>{option.name}</option>)
                    : <option>Loading...</option>
                }
            </select>
            <select onChange={(e)=>{
                let val = e.target.val;
                setActionItems({...actionItems,doctor:val})
            }}>
                <option>Assign Doctor</option>
                {dockers.length > 0 ?
                    dockers.map(option => <option key={option.doctorId} value={option.name}>{option.name}</option>)
                    : <option>Loading...</option>
                }
            </select>
            <input type="datetime-local" value={actionSubmitItems.startTime} onChange={e=>{
                let val = e.target.value;
                setActionSubmitItems({ ...actionSubmitItems, startTime: val })
            }}/>
            <input type="datetime-local" value={actionSubmitItems.endTime} onChange={e=>{
                let val = e.target.value;
                setActionSubmitItems({ ...actionSubmitItems, endTime: val })
            }}/>

            <div className="btns">
                <button onClick={()=>{
                    handlerSubmit()
                }}>Submit</button>
                <button>Back</button>
            </div>
        </div>
    );
}

export default ActionsComponent;
