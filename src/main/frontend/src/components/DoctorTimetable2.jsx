import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getMyDoctorScheduleApi,getgetDoctorScheduleApi } from "@/api/action/appointment"
import { getDoctorBySpecialtyApi, getDoctorScheduleApi, getSpecialtyApi, rejectAppointmentApi } from '@/api/action/appointment';
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

function DoctorTimetable() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [dates, setDates] = useState([]);

    const [specialty, setSpecialty] = useState([]);
    const [dockers, setDockers] = useState([]);
    const [timetable, setTimetable] = useState({});
    const [mpData, setMpData] = useState({});

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
    const hasInTime = (date,time)=>{

        if(mpData?.[date]){
            return mpData[date].some(item=>item.time==time)
        }
        return false
    }
    useEffect(() => {
        //getMyDoctorScheduleApi

        fetData()
    }, [])

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

    useEffect(() => {
        getSpecialtyApi().then(res => {
            //{specialtyId: 1, name: 'General Medicine'}
            console.log('getSpecialtyApi==>', res)
            setSpecialty(res)
        })
    }, [])
    async function handleChange(e) {
        console.log("e.target", e.target.value)
        let data = await getDoctorBySpecialtyApi(e.target.value)
        console.log('getDoctorBySpecialtyApi==>', data)
        setDockers([...data])

    }

    // 模拟从API获取医生列表
    // useEffect(() => {
    //     setDoctors([
    //         { id: '1', name: 'Dr. Smith' },
    //         { id: '2', name: 'Dr. Johnson' },
    //         { id: '3', name: 'Dr. Lee' },
    //     ]);
    // }, []);

    // 模拟API获取时间表数据
    useEffect(() => {
        if (selectedDoctor) {
            const newTimetable = dates.reduce((acc, date) => {
                acc[date] = {};
                for (let hour = 8; hour < 18; hour += 2) {
                    acc[date][`${hour}:00-${hour + 2}:00`] = false;  // 随机分配是否有预约
                }
                return acc;
            }, {});
            setTimetable(newTimetable);
        } else {
            // 当没有选中医生时，仍然显示空表格
            const emptyTimetable = dates.reduce((acc, date) => {
                acc[date] = {};
                for (let hour = 8; hour < 18; hour += 2) {
                    acc[date][`${hour}:00-${hour + 2}:00`] = false;
                }
                return acc;
            }, {});
            setTimetable(emptyTimetable);
        }
    }, [selectedDoctor, dates]);

    const handleDoctorChange =async (event) => {
        console.log("event",event.target.value);
        let data = await getgetDoctorScheduleApi(event.target.value)

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
    };

    return (
        <div>
            <div style={{marginTop: "40px", marginLeft: "25px"}}>
                <FormControl size="small" style={{minWidth: "200px", backgroundColor: "white", marginRight: "20px"}}>
                    <InputLabel id="doctor-select-label">Select Surgery</InputLabel>
                    <Select
                        labelId="Surgery-select-label"
                        label="Select a Surgery"
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {specialty.map((doctor) => (
                            <MenuItem key={doctor.name} value={doctor.name}>{doctor.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" style={{minWidth: "200px", backgroundColor: "white"}}>
                    <InputLabel id="doctor-select-label">Select a Doctor</InputLabel>
                    <Select
                        labelId="doctor-select-label"
                        label="Select a Doctor"
                        onChange={handleDoctorChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {dockers.map((doctor) => (
                            <MenuItem key={doctor.doctorId} value={doctor.doctorId}>{doctor.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <Table sx={{maxWidth: 1175}}
                   style={{backgroundColor: "white", borderRadius: "20px", marginTop: "40px", marginRight: "20px"}}
                   aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{border: '1px solid "#eaf0f7"'}}>Date / Time</TableCell>
                        {Array.from({length: 5}, (_, i) => 8 + 2 * i).map(hour => (
                            <TableCell key={hour}
                                       style={{border: '1px solid "#eaf0f7"'}}>{`${hour}:00-${hour + 2}:00`}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(timetable).map(date => (
                        <TableRow key={date}>
                            <TableCell style={{border: '1px solid #eaf0f7'}}>{date}</TableCell>
                            {Object.keys(timetable[date]).map(time => (
                                <TableCell key={time} style={{
                                    backgroundColor: hasInTime(date, time) ? '#a4c0f7' : '',
                                    border: '1px solid #eaf0f7'
                                }}></TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DoctorTimetable;
