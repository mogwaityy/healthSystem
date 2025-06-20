import React from 'react';
import './Detail.css';
import useExtractDate from '../../hooks/exDate';

function BasicInfoComponent({ patientInfo }) {
    
    const {extractDate} = useExtractDate()
    return (
        <div className="basic-info box2">
            <h3>基本信息</h3>
            <div className="info-row">
                <p><strong>出生日期:</strong> {extractDate(patientInfo.dob)}</p>

                <p><strong>性别:</strong> {patientInfo.gender}</p>
            </div>
            <div className="info-row">
                <p><strong>联系电话:</strong> {patientInfo.mobile}</p>
                <p><strong>邮箱地址:</strong> {patientInfo.email}</p>
             
            </div>
        </div>
    );
}

export default BasicInfoComponent;
