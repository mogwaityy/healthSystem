import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AppointmentImg3 from "../assets/img_3.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getMyTestResultApi } from '../api/action/appointment';
import { useTxAuth } from './useAuth';

const TestResult = () => {
    const [testResults, setTestResults] = useState([])
    //useTxAuth 
    
    function extractDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以需要加1
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    async function getData() {
        let data = await getMyTestResultApi()
        console.log('data==>', data)
        setTestResults(data.length ?data.map(item => {
            if (item?.testDate) {
                item.date = extractDate(item.testDate)
            }
            item.result = item.testResult
            return item;

        }) : [] )

    }
    useEffect(() => {
        getData()
    }, [])
    // const testResults = [
    //     {
    //         id: 1,
    //         patientName: "Priya Patel",
    //         testType: "Blood Glucose",
    //         date: "2024-05-10",
    //         result: "140 mg/dL",
    //         normalRange: "70-100 mg/dL"
    //     },
    //     {
    //         id: 2,
    //         patientName: "Priya Patel",
    //         testType: "Cholesterol",
    //         date: "2024-05-10",
    //         result: "195 mg/dL"
    //     }
    // ];
    const history = useHistory()
    const goBack = () => {
        history.push('/'); // 使用history.push()方法导航到主页
    }
    //getTestResultByPatient
    return (
        <div className="container" style={{background: "#eaf0f7", minHeight: "100vh"}}>

            <div className="mbanner">
                <img src={AppointmentImg3} style={{width: "100%"}}></img>

                <button onClick={() => {
                    goBack()
                }}>返回
                </button>
            </div>
            <div className="Table" style={{margin:"20px 150px"}}>
                <TableContainer component={Paper} className="table-container" style={{
                    boxShadow: "0px 13px 20px 0px #80808029",
                    borderRadius: "20px",
                    overflowY: "scroll",
                    maxHeight: "520px"
                }}>
                    <Table sx={{minWidth: 700}} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>检测类型</TableCell>
                                <TableCell>日期</TableCell>
                                <TableCell>结果</TableCell>
                                <TableCell>正常范围</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testResults.map((test) => (
                                <TableRow key={test.id}>
                                    <TableCell>{test.testType}</TableCell>
                                    <TableCell>{test.date}</TableCell>
                                    <TableCell>{test.result}</TableCell>
                                    <TableCell>{test.normalRange}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
};

export default TestResult;
