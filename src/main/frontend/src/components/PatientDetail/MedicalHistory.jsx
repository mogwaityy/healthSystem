import React from 'react';
import './Detail.css';

function MedicalHistory({ historyItems }) {
    return (
        <div className="medical-history">
            <h3>Medical History</h3>
            <ul>
                {historyItems.map((item, index) => (
                    <li key={index}>{item}</li> 
                ))}
            </ul>
        </div>
    );
}

export default MedicalHistory;
