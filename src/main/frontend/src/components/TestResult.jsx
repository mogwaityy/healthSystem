import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AppointmentImg2 from "../assets/img_1.png";
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
        <div>
            <img src={AppointmentImg2} style={{ width: "100%" }}></img>
            <div className="mbanner" style={{
                position: "absolute",
                top: "100px",
                left: "100px",
            }}>

                <button onClick={() => {
                    goBack()
                }}>Back</button>
            </div>
            <div className="Table">
                <Typography variant="h3" style={{ color: "#1F2B6C", margin: "40px 0 20px" }}>Test Results</Typography>
                <TableContainer component={Paper} className="table-container" style={{
                    boxShadow: "0px 13px 20px 0px #80808029",
                    borderRadius: "20px",
                    overflowY: "scroll",
                    maxHeight: "520px"
                }}>
                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Test Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Normal Range</TableCell>
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
