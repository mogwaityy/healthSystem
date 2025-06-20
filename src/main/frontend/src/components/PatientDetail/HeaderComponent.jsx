import React from 'react';
import './Detail.css';
import useExtractDate from '../../hooks/exDate';

function HeaderComponent({ name, applicationNo, appointmentTime }) {
    const {extractDateTime} = useExtractDate()
 
    return (
        <div className="box1">
            <span>患者姓名: {name}</span>
            <span>申请编号: {applicationNo}</span>
            <span>时间: {extractDateTime(appointmentTime)}</span>
        </div>
    );
}

export default HeaderComponent;
