import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Form.css';
import { SignUpData3 } from '../../../Data/SignUpData'; // Ensure this path is correct
import {patientRegisterApi} from "../../../api/action/login"
const SignUpStep3 = () => {
    const history = useHistory();
    const goBack = () => {
        history.push('/register-2'); // 使用history.push()方法导航到主页
    };

    const [formData, setFormData] = useState({
        patient_id:'',
        name: '',
        birth: '',
        address: '',
        email: '',
        password: '',
        gender: '',
        mobile: '',
        medicalHistory: {}  // Use an object to track checked conditions
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract patient data and remove medicalHistory object
        const { medicalHistory, ...patientData } = formData;

        // Filter and create a comma-separated string for medicalHistory
        const medicalConditions = Object.entries(medicalHistory)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .join(", ");

        const finalData = {
            patient: {
                ...patientData,
                gender: parseInt(patientData.gender, 10) // Convert gender to integer if necessary
            },
            medicalHistory: medicalConditions
        };

        console.log("Final Data to Submit:", finalData); // Debugging output

        let data = await patientRegisterApi(finalData)
        
            // .then(response => response.json())
            // .then(data => {
            //     if (data.status === 200) {
            //         sessionStorage.clear(); // Clear sessionStorage on successful registration
            //         history.push('/'); // Navigate to homepage or login page
            //     } else {
            //         alert(data.message); // Display an error message if registration fails
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Failed to register'); // Alert if there is a network or server error
            // });
    };

    if (!SignUpData3) {
        return <div>Loading medical data...</div>; // Add a loading or error message if SignUpData3 is undefined
    }

    return (
        <div style={{backgroundColor:"#eaf0f7", display:"flex", height:"100vh"}}>
        <div className="bg-register" >
            <h1>Medical History</h1>
            <form onSubmit={handleSubmit} className="form-container mform1">
                {SignUpData3.map((field, index) => (
                    <label key={index}>
                        <input style={{padding: "20px"}}
                               type="checkbox"
                               name={field.name}
                               checked={formData.medicalHistory[field.name] || false}
                               onChange={handleCheckboxChange}
                        />
                        {field.label}
                        <br/>
                    </label>
                ))}
                <button type="submit" className='submit-btn'>Submit</button>
                <button onClick={goBack} className='submit-btn'> Previous Step</button>
            </form>
        </div>
        </div>
    );
};

export default SignUpStep3;
