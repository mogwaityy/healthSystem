import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper,
    IconButton, FormControl, InputLabel, Select, MenuItem, Typography, TableContainer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Prescription.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import { addPrescriptionApi, getCurrentUserApi, getMedicineApi } from '../api/action/appointment';
import useGender from '../hooks/gender';
import useExtractDate from '../hooks/exDate';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// 初始药品列表
let initialMedicines = [];

// 选项（value 英文给后端，label 中文给前端）
const units = [
    { value: "Capsules", label: "胶囊" },
    { value: "Tablets", label: "片剂" },
    { value: "Bags", label: "袋装" },
    { value: "Tubes", label: "管装" }
];
const frequencies = [
    { value: "Once a day", label: "每日一次" },
    { value: "Twice a day", label: "每日两次" }
];
const quantities = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" }
];
const dosages = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" }
];

// 字段中文映射
const fieldLabels = {
    medicine: "药品",
    quantity: "数量",
    unit: "单位",
    dosage: "每次用量",
    frequency: "用药频率"
};

const PrescriptionForm = () => {
    const history = useHistory();
    const { mapGender } = useGender();
    const { extractDate } = useExtractDate();
    const [medicinesList, setMedicines] = useState(initialMedicines);
    const [medicineForm, setMedicineForm] = useState({ medicine: '', quantity: '', unit: '', dosage: '', frequency: '' });
    const [diagnosis, setDiagnosis] = useState('');
    const [description, setDescription] = useState('');
    const [dockerName, setDockerName] = useState('');
    const [medicine, setMedicine] = useState([]);
    const location = useLocation();

    const curRow = location?.state?.row;
    if (!curRow) {
        history.push('/doctor/dash');
    }

    const goBack = () => {
        history.push({
            pathname: '/doctor/detail',
            state: { row: curRow }
        });
    };

    useEffect(() => {
        getCurrentUserApi().then(res => {
            if (res?.name) {
                setDockerName(res.name);
            }
        });

        getMedicineApi().then(res => {
            setMedicine(res.map(item => ({ value: item.name, label: item.name })) ?? []);
        });
    }, []);

    const handleMedicineChange = (e) => {
        const { name, value } = e.target;
        setMedicineForm(prev => ({ ...prev, [name]: value }));
    };

    const addMedicine = () => {
        if (medicineForm.medicine && medicineForm.quantity && medicineForm.unit) {
            setMedicines(prev => [...prev, { ...medicineForm }]);
            setMedicineForm({ medicine: '', quantity: '', unit: '', dosage: '', frequency: '' });
        }
    };

    const handleDelete = (index) => {
        setMedicines(current => current.filter((item, i) => i !== index));
    };

    const addMedicineSubmit = async () => {
        let params = {
            "prescription": {
                "appointmentId": curRow?.appointment?.appointmentId,
                "diagnose": diagnosis ?? "Some diagnosis",
                "instruction": description ?? "Some instructions",
                "patientId": curRow?.patient?.patientId,
                "description": curRow?.appointment?.description
            },
            "medicinePrescriptions": medicinesList
        };
        let data = await addPrescriptionApi(params);
        if (!data?.reponseFailStatus) {
            alert("处方提交成功");
            history.push({
                pathname: '/doctor/detail',
                state: { row: curRow }
            });
        }
    };

    return (
        <div className="container" style={{ background: "#eaf0f7", padding: "80px" }}>
            <HighlightOffIcon style={{ position: "absolute", right: "3%", top: "3%", color: "#1F2B6C" }} onClick={goBack} />
            <Paper style={{ padding: "30px" }}>
                <Typography className="mhead">处方</Typography>

                {/* 患者信息 */}
                <div className="minfo" style={{ textAlign: "center", marginTop: "20px" }}>
                    <Typography><strong>患者姓名:</strong> {curRow?.patient?.name}</Typography>
                    <Typography><strong>性别:</strong> {mapGender[curRow?.patient?.gender ?? 0]}</Typography>
                    <Typography><strong>出生日期:</strong> {extractDate(curRow?.patient?.birth)}</Typography>
                    <Typography><strong>日期:</strong> {extractDate(curRow?.appointment?.date)}</Typography>
                    <Typography><strong>医生:</strong> {dockerName}</Typography>
                </div>

                {/* 诊断信息 */}
                <div className="mmedical">
                    <div className="diagnosis" style={{ padding: "0 20px" }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>诊断</InputLabel>
                            <Select value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} label="诊断">
                                <MenuItem value="">无</MenuItem>
                                <MenuItem value="Diabetes">糖尿病</MenuItem>
                                <MenuItem value="Hypertension">高血压</MenuItem>
                            </Select>
                        </FormControl>

                        <div className="item1" style={{ height: "200px" }}>
                            <TextField fullWidth label="症状描述" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
                        </div>
                    </div>

                    {/* 药品选择 */}
                    <div className="medicine" style={{ padding: "0 20px", marginTop: "5px" }}>
                        {Object.keys(medicineForm).map((key, index) => (
                            <FormControl key={index} style={{ minWidth: 120, margin: "10px" }}>
                                <InputLabel>{fieldLabels[key]}</InputLabel>
                                <Select value={medicineForm[key]} onChange={handleMedicineChange} name={key}>
                                    <MenuItem value=""><em>无</em></MenuItem>
                                    {(key === 'unit' ? units :
                                            key === 'medicine' ? medicine :
                                                key === 'frequency' ? frequencies :
                                                    key === 'quantity' ? quantities : dosages
                                    ).map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        <Button variant="contained" color="primary" onClick={addMedicine} style={{ height: '56px' }}>添加药品</Button>
                    </div>
                </div>

                {/* 药品表格 */}
                <TableContainer component={Paper} style={{ marginTop: "30px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Object.keys(medicineForm).map(key => (
                                    <TableCell key={key}>{fieldLabels[key]}</TableCell>
                                ))}
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicinesList.map((med, index) => (
                                <TableRow key={index}>
                                    {Object.keys(med).map((k, i) => (
                                        <TableCell key={i}>
                                            {(
                                                (k === 'unit' ? units :
                                                        k === 'medicine' ? medicine :
                                                            k === 'frequency' ? frequencies :
                                                                k === 'quantity' ? quantities : dosages
                                                ).find(o => o.value === med[k])?.label || med[k]
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* 提交按钮 */}
                <Button onClick={addMedicineSubmit} variant="contained" color="primary"
                        style={{ height: '56px', width: "100%", marginTop: "30px", marginBottom: "20px" }}>
                    提交
                </Button>
            </Paper>
        </div>
    );
};

export default PrescriptionForm;
