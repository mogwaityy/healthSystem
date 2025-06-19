import React from 'react';
import './Detail.css';

function HeaderComponent({ name, applicationNo, appointmentTime }) {
    return (
        <div className="box1">
            <span>患者姓名: {name}</span>
            <span>申请编号: {applicationNo}</span>
        </div>
    );
}

export default HeaderComponent;
