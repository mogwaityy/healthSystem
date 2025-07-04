import React, { useEffect, useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, FormControl, InputLabel, Select, MenuItem, Typography, TableContainer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Prescription.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import { addPrescriptionApi, getCurrentUserApi, getMedicineApi } from '../api/action/appointment';
import useGender from '../hooks/gender';
import useExtractDate from '../hooks/exDate';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
let initialMedicines = [
    // { medicine: "Medicine 1", qty: "30", unit: "Capsules", dosage: "1", frequency: "Twice a day" },
    // { medicine: "Medicine 2", qty: "1", unit: "Tube", dosage: "1", frequency: "Twice a day" }
];

const units = ["Capsules", "Tablets", "Bags", "Tubes"];
//const medicines = ["example1", "example2"];
const frequencies = ["Once a day", "Twice a day"];
const quantities = ["1", "2", "3"];
const dosages = ["1", "2", "3"];


const PrescriptionForm = () => {
    const history = useHistory()
    const { mapGender } = useGender()
    const {extractDate}  = useExtractDate()
    const [medicinesList, setMedicines] = useState(initialMedicines);
    const [medicineForm, setMedicineForm] = useState({ medicine: '', quantity: '', unit: '', dosage: '', frequency: '' });
    const [diagnosis, setDiagnosis] = useState('');
    const [description, setDescription] = useState('');
    const [dockerName, setDockerName] = useState('');
    const [medicine, setMedicine] = useState([]);
    const location = useLocation();
    console.log('location.state',location?.state)

    const goBack = () => {
        history.push({
            pathname: '/doctor/detail',
            state: { row:curRow } // Passing appointment details for pre-filling the form
          })
    };

    const curRow = location?.state?.row;
    if(!curRow){
        history.push('/doctor/dash')
    }

    useEffect(()=>{
        //getCurrentUserApi
        getCurrentUserApi().then(res=>{
            console.log('res==>',res)
            if(res?.name){
                setDockerName(res.name)
            }
            
        })
        //getMedicineApi
        getMedicineApi().then(res=>{
            console.log('getMedicineApi=>res==>',res)
            setMedicine(res.map(item=>item.name) ?? [])
        })
    },[])

    const handleMedicineChange = (e) => {
        const { name, value } = e.target;
        setMedicineForm(prev => ({ ...prev, [name]: value }));
    };

    const addMedicine = () => {
        if (medicineForm.medicine && medicineForm.quantity && medicineForm.unit) {
            setMedicines(prev => [...prev, { ...medicineForm }]);
            setMedicineForm({ medicine: '', quantity: '', unit: '', dosage: '', frequency: '' }); // Reset form
        }
    };

    const handleDelete = (index) => {
        setMedicines(current => current.filter((item, i) => i !== index));
    };
    //处方提交
    const addMedicineSubmit = async ()=>{
        //addPrescriptionApi
        
        let params =  {
             "prescription": {
              "appointmentId": curRow?.appointment?.appointmentId,
              "diagnose": diagnosis ?? "Some diagnosis",
              "instruction": description ?? "Some instructions",
              "patientId": curRow?.patient?.patientId,
              "description": curRow?.appointment?.description
             },
             "medicinePrescriptions": medicinesList
            }
        let data = await addPrescriptionApi(params)
        if(!data?.reponseFailStatus){
            alert(data)
            history.push({
                pathname: '/doctor/detail',
                state: { row:curRow } // Passing appointment details for pre-filling the form
              })
        }
        console.log('addMedicineSubmit=>data==>',data)
    }

    const today = new Date().toLocaleDateString();

    return (
        <div className="container" style={{background: "#eaf0f7", padding: "80px"}}>
            <HighlightOffIcon style={{position: "absolute", "right": "3%", top: "3%", color: "#1F2B6C"}}
                              onClick={goBack}
            />
            <Paper style={{padding: "30px"}}>
                <Typography className="mhead">处方</Typography>
                <div className="minfo" style={{textAlign:"center", marginTop:"20px"}}>
                    <Typography><strong>患者姓名:</strong> {curRow?.patient?.name}</Typography>
                    <Typography><strong>性别:</strong> {mapGender[curRow?.patient?.gender ?? 0]}</Typography>
                    <Typography><strong>出生日期:</strong>{extractDate(curRow?.patient?.birth)}</Typography>
                    <Typography><strong>日期:</strong> {extractDate(curRow?.appointment?.date)}</Typography>
                    <Typography><strong>医生:</strong>{dockerName}</Typography>
                </div>
                <div className="mmedical">
                    <div className="diagnosis" style={{padding:"0 20px"}}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>诊断</InputLabel>
                            <Select className="item"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    label="诊断"
                            >
                                <MenuItem value="">无</MenuItem>
                                <MenuItem value="Diabetes">糖尿病</MenuItem>
                                <MenuItem value="Hypertension">高血压</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="item1" style={{height: "200px"}}>
                            <TextField className="item"
                                       fullWidth
                                       label="症状描述"
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                       margin="normal"/>
                        </div>

                    </div>
                    <div className="medicine" style={{padding:"0 20px", marginTop:"5px"}}>
                        {Object.keys(medicineForm).map((key, index) => (
                            <FormControl  key={index} style={{minWidth: 120, margin: "10px"}}>
                                <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</InputLabel>
                                <Select className="item"
                                        value={medicineForm[key]}
                                        onChange={handleMedicineChange}
                                        name={key}
                                >
                                    <MenuItem value=""><em>无</em></MenuItem>
                                    {(key === 'unit' ? units : key === 'medicine' ? medicine : key === 'frequency' ? frequencies : key === 'quantity' ? quantities : dosages).map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        <Button variant="contained" color="primary" onClick={addMedicine} style={{height: '56px'}}>添加药品</Button>
                    </div>
                </div>
                <br/>
                <br/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Object.keys(medicineForm).map(key => (
                                    <TableCell
                                        key={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</TableCell>
                                ))}
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicinesList.map((med, index) => (
                                <TableRow key={index}>
                                    {Object.values(med).map((value, i) => (
                                        <TableCell key={i}>{value}</TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody></Table>
                </TableContainer>
                <Button onClick={() => {
                    addMedicineSubmit()
                }} variant="contained" color="primary"
                        style={{height: '56px', width: "100%", marginTop: "30px", marginBottom: "20px"}}>提交</Button>

            </Paper>

        </div>
    );
}

export default PrescriptionForm;
