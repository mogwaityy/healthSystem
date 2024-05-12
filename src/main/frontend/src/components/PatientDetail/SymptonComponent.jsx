import React from 'react';
import './Detail.css';

function SymptomInfoComponent({ symptoms }) {
    return (
        <div className="symptoms">
            <h3>Symptom</h3>
            {symptoms.map((symptom, index) => (
                <div key={index} >
                    <p><strong>Description:</strong> {symptom.description}</p>
                </div>
            ))}
        </div>
    );
}

export default SymptomInfoComponent;
