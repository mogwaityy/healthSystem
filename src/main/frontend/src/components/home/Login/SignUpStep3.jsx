import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
import { SignUpData3 } from '../../../Data/SignUpData'; // Ensure this path is correct
import {patientRegisterApi} from "../../../api/action/login";

const SignUpStep3 = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        patient_id: '',
        name: '',
        birth: '',
        address: '',
        email: '',
        password: '',
        gender: '',
        mobile: '',
        medicalHistory: {},  // Use an object to track checked conditions
        agreedToPrivacy: false // Added to track the privacy policy agreement
    });

    useEffect(() => {
        // Load data from sessionStorage
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
        // Handle the response according to your API
    };

    return (
        <div style={{backgroundColor: "#eaf0f7", display: "flex", height: "100vh"}}>
            <div className="mbanner-btn">
                <button onClick={() => history.push('/register-2')} style={{position: "absolute", top: "5%", left: "5%"}}>Back</button>
            </div>
            <div className="bg-register">
                <h1>Medical History</h1>
                <form onSubmit={handleSubmit} className="form-container mform1">
                    {SignUpData3.map((field, index) => (
                        <label key={index}>
                            <input
                                style={{padding: "20px"}}
                                type="checkbox"
                                name={field.name}
                                checked={formData.medicalHistory[field.name] || false}
                                onChange={handleCheckboxChange}
                            />
                            {field.label}
                            <br/>
                        </label>
                    ))}
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.agreedToPrivacy}
                            onChange={handlePrivacyChange}
                        />
                        I agree to the Privacy Policy
                    </label>
                    <button type="submit" className='submit-btn'>Submit</button>
                    <button onClick={() => history.push('/register-2')} className='submit-btn'>Previous Step</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpStep3;
