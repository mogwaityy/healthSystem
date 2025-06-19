import React, { useState } from 'react';
import './Detail.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addMedicalHistoryApi, addMedicalHistoryJsonApi, addTestApi } from '../../api/action/appointment';
import { emitter } from "@/api/m/index"
function ActionsComponent({ row }) {
    const history = useHistory()
    const curRow = row;
    const goBack = () => {
        history.push('/doctor/dash'); // 使用history.push()方法导航到主页
    };

    function handlerClick(row) {
        history.push({
            pathname: '/prescription',
            state: { row } // Passing appointment details for pre-filling the form
        })
    }
    const [testRow, setTestRow] = useState({
        patientId: curRow?.patient?.patientId ?? '',
        testDate: "",
        testType: "",
    })
    const [medicalHistory, setMedicalHistory] = useState({
        patientId: curRow?.patient?.patientId ?? '',
        description: "",
    })
    async function addTestAction() {
        let data = await addTestApi([testRow])
        if(!data?.reponseFailStatus){
            alert(data);
        }
        console.log('row===>', data)
    }
    async function addMedicalHistoryAction() {
        let data = await addMedicalHistoryApi(medicalHistory)
       if(!data?.reponseFailStatus){
             alert(data);
        }
        console.log('row===>', data)
    }

    //save
    async function handlerSaveHistory() {
        
        if(medicalHistory?.description){
            //
            let data = await addMedicalHistoryJsonApi({
                ...medicalHistory,
                date:new Date()
            })
            if(!data?.reponseFailStatus){
                alert(data);
             
                emitter.emit('updateMedicalHistoryItems')
           }
        }else{
            alert('请输入病史')
        }
    
     }

     async function handlerSave() {
        await addTestAction()
        //await addMedicalHistoryAction()
        //更新当前的
        //
       
    
     }

    return (
        <div className="actions">
            <h3 style={{marginBottom: "20px"}}>记录</h3>
            <label>额外检查（如需要）</label>
            <select style={{marginTop: "10px", marginBottom: "20px"}} onChange={e => {
                setTestRow({
                    ...testRow,
                    testType: e.target.value
                })
            }}>
                <option value="" disabled selected hidden>选择检查项目</option>
                <option value="X-ray">X-ray</option>
                <option value="MRI">MRI</option>
                <option value="CT">CT Scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Echocardiogram">Echocardiogram</option>
                <option value="Mammography">Mammography</option>
            </select>
            <label>检查日期</label>
            <input style={{marginTop: "10px", marginBottom: "20px"}} type="date" name="date" onChange={e => {
                setTestRow({
                    ...testRow,
                    testDate: e.target.value
                })
            }} required className="form-input" value={testRow.testDate}/>
            <button style={{marginBottom: "40px"}} onClick={() => {
                handlerSave(row)
            }}>添加检查
            </button>

            <label>更新病史</label>
            <input style={{marginTop: "10px", marginBottom: "20px"}} value={medicalHistory.description} onChange={e => {
                setMedicalHistory({
                    ...medicalHistory,
                    description: e.target.value
                })

            }}>
            </input>
            <button style={{marginBottom: "40px"}} onClick={() => {
                handlerSaveHistory(row)
            }}>新增病史
            </button>

            <label>生成处方</label>
            <button style={{marginTop: "10px", marginBottom: "40px"}} onClick={() => {
                handlerClick(row)
            }}>生成处方
            </button>

            <button onClick={goBack}>返回</button>


        </div>
    );
}

export default ActionsComponent;
