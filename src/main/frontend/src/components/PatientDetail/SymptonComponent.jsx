import React from 'react';
import './Detail.css';

function SymptomInfoComponent({ symptoms }) {
    return (
        <div className="symptoms">
            <h3>症状</h3>
            {symptoms.map((symptom, index) => (
                <div key={index} >
                    <p><strong>描述:</strong> {symptom.description}</p>
                </div>
            ))}
        </div>
    );
}

export default SymptomInfoComponent;
