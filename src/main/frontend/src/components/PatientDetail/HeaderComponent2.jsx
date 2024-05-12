import React from 'react';
import './Detail.css';

function HeaderComponent({ name, applicationNo, appointmentTime }) {
    return (
        <div className="box1">
            <span>Patient Name: {name}</span>
            <span>Application No: {applicationNo}</span>
        </div>
    );
}

export default HeaderComponent;
