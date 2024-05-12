import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getMyDoctorScheduleApi } from "@/api/action/appointment"

function getTimeComponents(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.getHours()
}

function getDateByKey(date) {
    date.setDate(date.getDate());
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    const dateString = `${date.toISOString().split('T')[0]}`; // yyyy-mm-dd (Day)
    return dateString
}
function YourSchedule() {
    const [dates, setDates] = useState([]);
    const [timetable, setTimetable] = useState({});
    const [mpData, setMpData] = useState({});
    const doctorId = '1'; // 假设当前医生的ID
    const doctorName = 'Dr. Smith'; // 假设当前医生的姓名
    async function fetData() {
        let data = await getMyDoctorScheduleApi()
        data = data.map(item => {
            item.time = `${getTimeComponents(item.startTime)}:00-${getTimeComponents(item.endTime)}:00`
            item.key = getDateByKey(new Date(item.startTime))
            return item
        })
        //
        let mData = {};
        data.forEach(item => {
            // 直接使用逻辑运算符为不存在的键创建空数组
            mData[item.key] = mData[item.key] || [];
            mData[item.key].push(item);
        });
         console.log('mData==>',mData)
         setMpData(mData)
        //

        // getMyDoctorScheduleApi

    }
    useEffect(() => {
        //getMyDoctorScheduleApi

        fetData()
    }, [])

    const hasInTime = (date,time)=>{
        
        if(mpData?.[date]){
            return mpData[date].some(item=>item.time==time)
        }
        return false
    }



    // 生成未来7天的日期和星期
    useEffect(() => {
        const generatedDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            
            date.setDate(date.getDate() + i);
            const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()-1];
            const dateString = `${date.toISOString().split('T')[0]}`; // yyyy-mm-dd (Day)
            generatedDates.push(dateString);
        }
        setDates(generatedDates);
    }, []);




    // 模拟API获取时间表数据
    useEffect(() => {
        const newTimetable = dates.reduce((acc, date) => {
            acc[date] = {};
            for (let hour = 8; hour < 18; hour += 2) {
                acc[date][`${hour}:00-${hour + 2}:00`] = false;  // 随机分配是否有预约
            }
            return acc;
        }, {});
        setTimetable(newTimetable);
        console.log("newTimetable==>", newTimetable)
    }, [dates]);

    return (
        <div className="MainDash">

            <h1>Your Schedule</h1>
            <div style={{marginTop:"30px"}}>
            <Table sx={{maxWidth: 1175}} aria-label="doctor schedule" style={{backgroundColor:"white",borderRadius:"20px", marginTop:"40px", marginRight:"20px"}}>
                <TableHead >
                    <TableRow>
                        <TableCell style={{ border: '1px solid "#eaf0f7"' }}>Date / Time</TableCell>
                        {Array.from({ length: 5 }, (_, i) => 8 + 2 * i).map(hour => (
                            <TableCell key={hour} style={{ border: '1px solid black' }}>{`${hour}:00-${hour + 2}:00`}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(timetable).length>0 ? Object.keys(timetable).map(date => (
                        <TableRow key={date}>
                            <TableCell style={{ border: '1px solid #eaf0f7' }}>{date}</TableCell>
                            {Object.keys(timetable[date]).map(time => (

                                <TableCell key={time} style={{ backgroundColor: hasInTime(date,time) ? '#a4c0f7' : '', border: '1px solid #eaf0f7' }}></TableCell>
                            ))}
                        </TableRow>
                    )) : ""}
                </TableBody>
            </Table>
            </div>
        </div>
    );
}

export default YourSchedule;
