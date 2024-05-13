import React, { useEffect } from 'react';
import { useState } from 'react';
import {useHistory} from "react-router-dom";
import './Detail.css';
import Model from 'react-modal';
import { alternativeAppointmentApi, getDoctorBySpecialtyApi, getDoctorScheduleApi, getSpecialtyApi, rejectAppointmentApi, updateDoctorScheduleApi } from '../../api/action/appointment';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoctorTimetable2 from "../DoctorTimetable2";

function ActionsComponent({ row }) {
    const [visible, setVisible] = useState(false);
    const [visibleAlt, setVisibleAlt] = useState(false);
    const [newTime, setNewTime] = useState();
    const history = useHistory();

    const goBack = () => {
        history.push('/admin/dash'); // 使用history.push()方法导航到主页
    };

    //获取所有科室的数据
    //getSpecialtyApi
    const [specialty, setSpecialty] = useState([]);
    const [dockers, setDockers] = useState([]);
    const [actionItems, setActionItems] = useState({
        action: "accept"
    });
    const [actionSubmitItems, setActionSubmitItems] = useState({
        "doctorId": "",
        "startTime": "",
        "endTime": "",
        "patientId": row?.patient.patientId,
        "appointmentId": row?.appointment?.appointmentId
    });


    async function handlerSubmit() {
        //getDoctorSchedule
        //  let data = await  getDoctorScheduleApi(actionSubmitItems);
        //  if(!data?.reponseFailStatus){
        //     alert("Success");
        //  }
  
        Check()
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

    function addOneHour(date) {
        // 创建一个新的Date对象，基于传入的日期
        var newDate = new Date(date.getTime());
        
        // 使用setHours方法设置小时数，参数为当前小时数加1
        // setHours方法会自动处理小时溢出，比如从23小时变为00小时
        newDate.setHours(date.getHours() + 1);
        
        return newDate;
    }
    async function Check() {
        let data = null;
        switch (actionItems.action) {
            case "accept":
                //updateDoctorScheduleApi
                if(!actionSubmitItems?.startTime || !actionSubmitItems?.endTime){
                        alert("Please select time")
                    return 
                }
     
                let startTime = addOneHour(new Date(actionSubmitItems.startTime ));
                let endTime =  addOneHour(new Date(actionSubmitItems.endTime ));;
                

               setActionSubmitItems({
                ...actionSubmitItems,
                startTime,
                endTime
               })
              
             

                 data =await updateDoctorScheduleApi({
                    ...actionSubmitItems,
                    startTime,
                    endTime
                   })
                if (!data?.reponseFailStatus) {
                    alert("Success");
                }
                break;
            case "reject":
                alert("Please wait for a while")
                rejectAppointmentAction()
                break;
            case "alternative":
                //alternativeAppointmentApi
             
                if(!newTime){
                        alert("Please select time")
                        return false
                }
                alert("Please wait for a while")
                 data = await alternativeAppointmentApi({
                    appointmentId:row.appointment.appointmentId,
                    newTime:newTime
                })
                if (!data?.reponseFailStatus) {
                    alert("Success");
                    setNewTime('')
                }
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
            <select style={{marginTop:"20px"}} value={actionItems.action} onChange={(e) => {
                let val = e.target.value;
                setActionItems({ ...actionItems, action: val })
                if(val == "alternative"){
                    setVisibleAlt(true)
                }else{
                    setVisibleAlt(false)
                }
            }}>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
                <option value="alternative">Alternative Option</option>
            </select>
            {visibleAlt? <input type="datetime-local" value={newTime} onChange={e => {
                let val = e.target.value;
                setNewTime(val)
            }} /> : ""}
            {actionItems.action == "accept" ? <button onClick={() => {
                setVisible(true);
            }}>Check Doctor Timetable</button> : ""}
            {actionItems.action == "accept" ? <select onChange={handleChange} >
                {specialty.length > 0 ?
                    specialty.map(option => <option key={option.specialtyId} value={option.name}>{option.name}</option>)
                    : <option>Loading...</option>
                }
            </select> : ""}


            {actionItems.action == "accept" ? <select onChange={(e) => {
                
                let val = e.target.value;
                setActionSubmitItems({ ...actionSubmitItems, doctorId: val })
            }}>
                <option>Assign Doctor</option>
                {dockers.length > 0 ?
                    dockers.map(option => <option key={option.doctorId} value={option.doctorId}>{option.name}</option>)
                    : <option>Loading...</option>
                }
            </select> : ""}


            {actionItems.action == "accept" ? <input type="datetime-local" value={actionSubmitItems.startTime} onChange={e => {
                let val = e.target.value;
                setActionSubmitItems({ ...actionSubmitItems, startTime: val })
            }} /> : ""}
            {actionItems.action == "accept" ? <input type="datetime-local" value={actionSubmitItems.endTime} onChange={e => {
                let val = e.target.value;
                setActionSubmitItems({ ...actionSubmitItems, endTime: val })
            }} /> : ""}

            <div className="btns">
                <button onClick={() => {
                    handlerSubmit()
                }}>Submit</button>
                <button onClick={goBack}>Back</button>
            </div>

            <Model
                style={{ overlay: { background: "none" }, content: { margin: "5%",background:"#eaf0f7" } }}
                isOpen={visible} onRequestClose={() => setVisible(false)}>
                <HighlightOffIcon style={{position:"absolute", "right":"5%", color:"#1F2B6C"}} onClick={() => setVisible(false)}
                />
                <DoctorTimetable2 />
            </Model>
        </div>
    );
}

export default ActionsComponent;
