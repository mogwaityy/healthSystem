import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

// 模拟API调用函数
const getMyTestResultApi = async () => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        {
            id: '1',
            Patient: 'John Doe',
            testType: 'Blood Sugar',
            testDate: '2023-05-01T08:30:00Z',
            testResult: '5.8 mmol/L',
            normalRange: '3.9-6.1 mmol/L'
        },
        {
            id: '2',
            Patient: 'Jane Smith',
            testType: 'Cholesterol',
            testDate: '2023-05-02T09:30:00Z',
            testResult: '200 mg/dL',
            normalRange: '125-200 mg/dL'
        },
        // 更多模拟数据
    ];
};

const TestResult = () => {
    const [testResults, setTestResults] = useState([]);

    function extractDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function getData() {
        let data = await getMyTestResultApi();
        console.log('data==>', data);
        setTestResults(data.map(item => {
            if (item?.testDate) {
                item.date = extractDate(item.testDate);
            }
            item.result = item.testResult;
            return item;
        }));
    }

    useEffect(() => {
        getData();
    }, []);

    const history = useHistory();
    const handleEdit = (testId) => {
        console.log('Editing:', testId);
        // 编辑功能的实现逻辑
    };

    const handleSave = (testId) => {
        console.log('Saving:', testId);
        // 保存功能的实现逻辑
    };

    return (
        <div className="MainDash">
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
                                <TableCell>Patient</TableCell>
                                <TableCell>Test Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Result</TableCell>
                            <TableCell>Normal Range</TableCell>
                            <TableCell>Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testResults.map((test) => (
                            <TableRow key={test.id}>
                                <TableCell>{test.Patient}</TableCell>
                                <TableCell>{test.testType}</TableCell>
                                <TableCell>{test.date}</TableCell>
                                <TableCell>{test.result}</TableCell>
                                <TableCell>{test.normalRange}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEdit(test.id)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleSave(test.id)}>Save</Button>
                                </TableCell>
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
