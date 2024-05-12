import React from 'react';
import './Form.css';

const PrivacyPolicy = () => (
    <div style={{ overflowY: 'scroll', height: '100%', padding: '35px' }}>
        <h2 style={{color:"#1F2B6C", marginBottom:"50px"}}>Privacy Policy of ECLINIC</h2>
        <div className="policy-item">
            <h3>1. Introduction</h3>
            <p>Welcome to ECLINIC. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at contact@eclinic.com.</p>
        </div>
        <div className="policy-item">
            <h3>2. Information We Collect</h3>
            <p>As you visit or use our services, we collect the following types of information: personal details (name, address, email), health information, payment data, and other details you choose to provide.</p>
        </div>
        <div className="policy-item">
            <h3>3. How We Use Your Information</h3>
            <p>We use the information we collect for several purposes, such as servicing your account, responding to inquiries, service improvement, processing transactions, and for security purposes. We also use your information to communicate with you about our services and offers.</p>
        </div>
        <div className="policy-item">
            <h3>4. Sharing Your Information</h3>
            <p>Your information may be shared with third-party service providers who perform services on our behalf, including payment processing, data analysis, and customer service. We ensure these parties are obligated to protect the confidentiality of your information.</p>
        </div>
        <div className="policy-item">
            <h3>5. Security of Your Information</h3>
            <p>We implement a variety of security measures to maintain the safety of your personal information. These include encryption, firewalls, and secure software, which aim to protect your data against unauthorized access and disclosure.</p>
        </div>
        <div className="policy-item">
            <h3>6. Policy Updates</h3>
            <p>We may update this privacy policy to reflect changes to our information practices. Any changes will be posted on this page with an updated revision date. We encourage you to periodically review this page for the latest information on our privacy practices.</p>
        </div>
        <p>For more detailed information on our privacy practices, please contact us at contact@eclinic.com.</p>
    </div>
);

export default PrivacyPolicy;
