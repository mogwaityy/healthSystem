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
            alert('Please enter the medical history')
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
            <h3 style={{marginBottom: "20px"}}>Record</h3>
            <label>Additional test (if needed)</label>
            <select style={{marginTop: "10px", marginBottom: "20px"}} onChange={e => {
                setTestRow({
                    ...testRow,
                    testType: e.target.value
                })
            }}>
                <option value="" disabled selected hidden>Additional Test</option>
                <option value="X-ray">X-ray</option>
                <option value="MRI">MRI</option>
                <option value="CT">CT Scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Echocardiogram">Echocardiogram</option>
                <option value="Mammography">Mammography</option>
            </select>
            <label>Test Date</label>
            <input style={{marginTop: "10px", marginBottom: "20px"}} type="date" name="date" onChange={e => {
                setTestRow({
                    ...testRow,
                    testDate: e.target.value
                })
            }} required className="form-input" value={testRow.testDate}/>

            <label>Update Medical History</label>
            <input style={{marginTop: "10px", marginBottom: "20px"}} value={medicalHistory.description} onChange={e => {
                setMedicalHistory({
                    ...medicalHistory,
                    description: e.target.value
                })

            }}>
            </input>

            <button onClick={() => {
                handlerClick(row)
            }}>Generate prescription
            </button>
            <button onClick={() => {
                handlerSave(row)
            }}>Add Test
            </button>
            <button onClick={() => {
                handlerSaveHistory(row)
            }}>Add Medical History
            </button>
            <button onClick={goBack}>Back</button>


        </div>
    );
}

export default ActionsComponent;
