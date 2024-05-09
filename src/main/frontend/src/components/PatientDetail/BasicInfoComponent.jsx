import React from 'react';
import './Detail.css';

function BasicInfoComponent({ patientInfo }) {
    return (
        <div className="basic-info box2">
            <h3>Basic Information</h3>
            <div className="info-row">
                <p><strong>Date of Birth:</strong> {patientInfo.dob}</p>
               
                <p><strong>Gender:</strong> {patientInfo.gender}</p>
            </div>
            <div className="info-row">
                <p><strong>Mobile Number:</strong> {patientInfo.mobile}</p>
                <p><strong>Email Address:</strong> {patientInfo.email}</p>
             
            </div>
        </div>
    );
}

export default BasicInfoComponent;
