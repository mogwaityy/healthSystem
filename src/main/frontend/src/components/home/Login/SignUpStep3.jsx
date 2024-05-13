import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
import { SignUpData3 } from '../../../Data/SignUpData';
import { patientRegisterApi } from "../../../api/action/login";
import { Checkbox, FormControlLabel, Button, FormGroup, Grid, Typography } from '@mui/material';
import Model from 'react-modal';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Login from "./Login";
import PrivacyPolicy from "./PrivacyPolicy";

const SignUpStep3 = () => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        patient_id: '',
        name: '',
        birth: '',
        address: '',
        email: '',
        password: '',
        gender: '',
        mobile: '',
        medicalHistory: {},
        agreedToPrivacy: false
    });

    const goBack = () => {
        history.push('/register-2');
    };

    const handleLabelClick = (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        setVisible(true); // 假设 setVisible 已经通过 props 或者上下文传递
    };


    useEffect(() => {
        const data1 = sessionStorage.getItem('signUpDataStep1');
        const data2 = sessionStorage.getItem('signUpDataStep2');
        if (data1 && data2) {
            const patientData = { ...JSON.parse(data1), ...JSON.parse(data2) };
            setFormData({
                ...patientData,
                medicalHistory: {}
            });
        }
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            medicalHistory: {
                ...prevFormData.medicalHistory,
                [name]: checked
            }
        }));
    };

    const handlePrivacyChange = (e) => {
        setFormData({ ...formData, agreedToPrivacy: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreedToPrivacy) {
            alert('You must agree to the privacy policy before submitting.');
            return;
        }

        const { medicalHistory, ...patientData } = formData;
        const medicalConditions = Object.entries(medicalHistory)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(", ");

        const finalData = {
            patient: {
                ...patientData,
                gender: parseInt(patientData.gender, 10)
            },
            medicalHistory: medicalConditions
        };

        // Submit the final data
        let response = await patientRegisterApi(finalData);
        if(!response?.reponseFailStatus){
            alert("Registration successful Please login")
            history.push('/')
        }
        console.log('response==>',response);
        // Handle the response according to your API
    };

    return (
        <div style={{ backgroundColor: "#eaf0f7", display: "flex", height: "100vh" }}>
            <div className="mbanner-btn">
                <Button onClick={() => history.push('/')} style={{ position: "absolute", top: "5%", left: "5%", width:"150px" }}>Back to Home</Button>
            </div>
            <div className="bg-register">
                <h1>Medical History</h1>
                <form onSubmit={handleSubmit} className="form-container mform1">
                    <FormGroup style={{marginLeft: "50px"}}>
                        <Grid container spacing={1}>
                            {SignUpData3.map((field, index) => (
                                <Grid item xs={6}
                                      key={index}>  {/* Each item takes up half the width of the container */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.medicalHistory[field.name] || false}
                                                onChange={handleCheckboxChange}
                                                name={field.name}
                                            />
                                        }
                                        label={field.label}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Grid container spacing={1} style={{ alignItems: 'center', marginTop:"10px" }}>
                            <Grid item>
                                <Checkbox
                                    checked={formData.agreedToPrivacy}
                                    onChange={handlePrivacyChange}
                                    name="agreedToPrivacy"
                                />
                            </Grid>
                            <Grid item>
        <span onClick={handleLabelClick} style={{ cursor: 'pointer', color: 'red' }}>
            I agree to the Privacy Policy.
        </span>
                            </Grid>
                        </Grid>



                    </FormGroup>
                    <button type="submit" style={{ marginTop:"20px"}} className='submit-btn'>Submit</button>
                    <button onClick={goBack} className='submit-btn'> Previous Step</button>
                </form>
            </div>

            <Model
                style={{ overlay: { background: "none" }, content: { margin: "auto", width: "600px", height: "670px" } }}
                isOpen={visible} onRequestClose={() => setVisible(false)}>
                <HighlightOffIcon style={{position:"absolute", "right":"5%", color:"#1F2B6C"}} onClick={() => setVisible(false)}
                />
                <PrivacyPolicy />
            </Model>
        </div>
    );
};

export default SignUpStep3;

