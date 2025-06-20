import React, { useEffect, useState } from 'react';
import { TextField,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getTestResultByPatientApi, updateTestApi } from '../api/action/appointment';


let mapResult = {
     "testResultId": -1592066047,
    "patientId": "patient0",
    "testDate": "2024-05-07",
    "doctorId": "admin0",
    "testResult": "Positive",
    "testType": "Blood Test",
    "normalRange": "0.5-1.5"
    };

const TestResult = () => {

    const goBack = () => {
        history.push('/doctor/dash'); // 使用history.push()方法导航到主页
    };
    const [testResults, setTestResults] = useState([]);
    const { patientId } = useParams();
    console.log('patientId==>', patientId);
    function extractDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    //const { patientId } = useParams();

    async function getData() {      
        let data = await getTestResultByPatientApi(patientId);
        console.log('1data==>', data);
        setTestResults(data.length ? data.map(item =>{
          
            item.testDate  = extractDate(item.testDate);
            item.is_show = 0;
            return item;
        } ): [])
        console.log('2data==>', testResults);
    }

    useEffect(() => {
        getData();
    }, []);

    const history = useHistory();
    const handleEdit = (row,index) => {
        console.log('Editing:', row);
        row.is_show = row.is_show === 0 ? 1 : 0;
        testResults[index] = row;
        setTestResults([...testResults]);
        // 编辑功能的实现逻辑
    };
    const clearAllShow = ()=>{
       
        setTestResults([... testResults.map(item =>{
            item.is_show = 0;
            return item;
        } )]);
    }
    function setTestResultsUpdate(){
        setTestResults([...testResults]);
    }

    const handleSave = async (row,index) => {
        console.log("row,index",row,index);
        // 保存功能的实现逻辑
        // 保存功能的实现逻辑
        let data = [];
        testResults.forEach((item,index) => {
            Object.keys(mapResult).forEach(it=>{
                data[index] = data[index] || {}; // 短路运算符简化初始化逻辑
                data[index][it] = item[it]; // 直接赋值，假设item[it]是想要赋予的值
            })
            
        })
        let result = await updateTestApi(data);
        console.log("result===>",result);
        if(!result?.reponseFailStatus){
            alert(result)
            clearAllShow()
        }
    };

    return (
        <div className="blue-bg">
            <div className="mbanner-btn">
                <button onClick={goBack} style={{position: "absolute", top: "5%", left: "5%"}}>返回
                </button>
            </div>

            <div className="Table" style={{margin: "120px auto"}}>
                <h1 style={{color: "#1F2B6C", marginBottom: "40px"}}>患者检查结果</h1>
                <TableContainer component={Paper} className="table-container" style={{
                    boxShadow: "0px 13px 20px 0px #80808029",
                    borderRadius: "20px",
                    overflowY: "scroll",
                    maxHeight: "520px"
                }}>
                    <Table sx={{minWidth: 1000}} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>检查类型</TableCell>
                                <TableCell>日期</TableCell>
                                <TableCell>结果</TableCell>
                                <TableCell>正常范围</TableCell>
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testResults.length > 0 ? testResults.map((test, index) => (
                                <TableRow key={test.id}>
                                    <TableCell>{test.testType}</TableCell>
                                    <TableCell>{test.testDate}</TableCell>

                                    <TableCell>
                                        {!test.is_show > 0 ? test.testResult :
                                            <TextField id="outlined-basic" onChange={(e) => {
                                                let val = e.target.value;
                                                test.testResult = val;
                                                setTestResultsUpdate()
                                            }} label="结果" value={test['testResult']}
                                                       variant="outlined"/>}</TableCell>
                                    <TableCell>{!test.is_show > 0 ? test.normalRange :
                                        <TextField id="outlined-basic" onChange={(e) => {
                                            let val = e.target.value;
                                            test.normalRange = val;
                                            setTestResultsUpdate()
                                        }} label="正常范围" variant="outlined"
                                                   value={test['normalRange']}/>}</TableCell>
                                    <TableCell>
                                        <Button color="primary" onClick={() => handleEdit(test, index)}>编辑</Button>
                                        <Button color="error" onClick={() => handleSave(test, index)}>保存</Button>
                                    </TableCell>
                                </TableRow>
                            )) : ""}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default TestResult;
