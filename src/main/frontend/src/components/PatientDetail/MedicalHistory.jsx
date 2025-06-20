import React from 'react';
import './Detail.css';

function MedicalHistory({ historyItems }) {
    return (
        <div className="medical-history">
            <h3>病史</h3>
                {historyItems.map((item, index) => (
                    <span style={{marginRight:"30px"}} key={index}>{item} </span>
                ))}
        </div>
    );
}

export default MedicalHistory;
