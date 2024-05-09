import React, { useState } from 'react';
import './Detail.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addMedicalHistoryApi, addTestApi } from '../../api/action/appointment';

function ActionsComponent({ row }) {
    const history = useHistory()
    const curRow = row;

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
        description: "Diagnosis",
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
    async function handlerSave() {
        await addTestAction()
        await addMedicalHistoryAction()
     }

    return (
        <div className="actions">
            <h3>Record</h3>
            <label>Additional test (if needed)</label>
            <select onChange={e => {
                setTestRow({
                    ...testRow,
                    testType: e.target.value
                })
            }}>
                <option >Additional Test</option>
                <option value="X-ray">X-ray</option>

            </select>
            <label >Date</label>
            <input type="date" name="date" onChange={e=>{
                setTestRow({
                    ...testRow,
                    testDate: e.target.value
                })
            }}  required className="form-input" value={testRow.testDate} />

            <label>Update Medical History</label>
            <select  value={medicalHistory.description}  onChange={e=>{
                setMedicalHistory({
                    ...medicalHistory,
                    description: e.target.value
                })
               
            }}>
                <option value="Diagnosis">Diagnosis</option>
                {/* List doctors */}
            </select>


            <label>Prescrition</label>
            <button onClick={() => { handlerClick(row) }}>Generate prescription</button>
            <button onClick={()=>handlerSave()}>Save</button>
        </div>
    );
}

export default ActionsComponent;
