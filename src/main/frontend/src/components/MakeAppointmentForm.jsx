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

    function addOneHour(date) {
        // 创建一个新的Date对象，基于传入的日期
        var newDate = new Date(date.getTime());
        
        // 使用setHours方法设置小时数，参数为当前小时数加1
        // setHours方法会自动处理小时溢出，比如从23小时变为00小时
        newDate.setHours(date.getHours() + 1);
        
        return newDate;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Appointment details:', appointment);
        let data = {
            date: addOneHour(new Date(`${appointment.date} ${appointment.time}`)),
            description: appointment.description
        };
        console.log('data===>', data);
        let result = await bookAppointmentApi(data);
        console.log('result===>', result);
        if (!result?.responseFailStatus) {
            alert('Appointment booked successfully');
        }
    };

    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit} className="form-container mform">
            <div className="form-row">
                <label className="form-label">
                    <span>Date:</span>
                    <input type="date" name="date" value={appointment.date} onChange={handleChange} required min={minDate} max={maxDate} className="form-input"/>
                </label>
            </div>
            <div className="form-row">
                <label className="form-label">
                    <span>Time:</span>
                    <input type="time" name="time" value={appointment.time} onChange={handleChange} required min="08:00" max="18:00" step="3600" className="form-input"/>
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
