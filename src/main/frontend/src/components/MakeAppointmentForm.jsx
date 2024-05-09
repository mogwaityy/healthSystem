import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./home/Login/Form.css"
import "../App.css"
import "./PractitionerDash/Practitioner.css"
import { bookAppointmentApi } from '../api/action/appointment';


function MakeAppointmentForm() {
    const location = useLocation();
    const [appointment, setAppointment] = useState({
        date: '',
        time: '',
        description: '',
        specialty: ''
    });

    const specialties = ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "General Practice"];

    useEffect(() => {
        if (location.state && location.state.appointment) {
            const { date, time, symptom, specialty } = location.state.appointment;
            setAppointment({
                date, time, description: symptom, specialty: specialty || ''
            });
        }
    }, [location.state]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit =async(event) => {
        event.preventDefault();
        console.log('Appointment details:', appointment);
        // Resetting form can be removed if needed to keep the form filled after submission for review
      //  setAppointment(appointment);
      let data = {
        date:new Date(`${appointment.date} ${appointment.time}`),
        description:appointment.description
    }
    console.log('data===>',data)
     let result = await bookAppointmentApi(data)
     console.log('result===>',result)
     if(!result?.reponseFailStatus){
        alert('Appointment booked successfully')
     }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container mform">
            <div className="form-row">
                <label className="form-label">
                    <span>Date:</span>
                    <input type="date" name="date" value={appointment.date} onChange={handleChange} required className="form-input"/>
                </label>
            </div>
            <div className="form-row">
                <label className="form-label">
                    <span>Time:</span>
                    <input type="time" name="time" value={appointment.time} onChange={handleChange} required className="form-input"/>
                </label>
            </div>
        
            <div className="form-row">
                <label className="form-label">
                    <textarea name="description" value={appointment.description} onChange={handleChange}
                              placeholder="Describe the reason for the appointment..." required
                              className="form-textarea"/>
                </label>
            </div>
            <div className="form-row">
                <button type="submit" className="submit-btn">Book Appointment</button>
            </div>
        </form>
    );
}

export default MakeAppointmentForm;
