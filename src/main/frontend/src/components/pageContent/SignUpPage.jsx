import React, { useState } from 'react';
import SignUpStep1 from '../Login/SignUpStep1';
import SignUpStep2 from '../Login/SignUpStep2';
import SignUpStep3 from '../Login/SignUpStep3';

const SignUpPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log('Complete the process and handle final submission or transition.');
        }
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            {currentStep === 1 && <SignUpStep1 onNext={handleNextStep} />}
            {currentStep === 2 && <SignUpStep2 onNext={handleNextStep} />}
            {currentStep === 3 && <SignUpStep3 onNext={handleNextStep} />}
        </div>
    );
};

export default SignUpPage;
