import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// SignUpData.js

export const SignUpData1 = [
    {
        label: "Name",
        name: "name",
        placeholder: "Name",
        type: "text",
        required: true
    },
    {
        label: "Gender",
        name: "gender",
        placeholder: "Gender",
        type: "select",
        options: [  // Changed from 'Option' to 'options'
            { value: '', label: 'Select Gender' },
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ],
        required: true,
    },

    {
        label: "Date of Birth",
        name: "birth",
        type: "date",
        required: true
    },
    {
        label: "Email Address",
        name: "email",
        placeholder: "Email Address",
        type: "email",
        required: true
    },
    {
        label: "Address",
        name: "address",
        placeholder: "Address",
        type: "text",
        required: true
    }
];


export const SignUpData2 = [
    {
        name: "password",
        label: "Password",
        placeholder: "Password",
        icon: <RemoveRedEyeIcon />
    },
    {
        name: "confirmPassword",
        label: "Confirm",
        placeholder:"Confirm Password",
        icon: <RemoveRedEyeIcon />
    }
];

export const SignUpData3 = [
    {
        name: "asthma",
        label: "Asthma"
    },
    {
        name: "diabetes",
        label: "Diabetes"
    },
    {
        name: "hypertension",
        label: "Hypertension"
    },
    {
        "name": "coronary_artery_disease",
        "label": "Coronary Artery Disease"
    },
    {
        "name": "cancer",
        "label": "Cancer"
    },
    {
        "name": "alzheimers_disease",
        "label": "Alzheimer's Disease"
    },
    {
        "name": "osteoarthritis",
        "label": "Osteoarthritis"
    },
    {
        "name": "parkinsons_disease",
        "label": "Parkinson's Disease"
    },
    {
        "name": "tuberculosis",
        "label": "Tuberculosis"
    },
    {
        "name": "hiv_aids",
        "label": "HIV/AIDS"
    },
    {
        "name": "hypertension",
        "label": "Hypertension"
    },
    {
        "name": "diabetes_mellitus",
        "label": "Diabetes Mellitus"
    }

];


export const LoginData = [
    {
        name: "email",
        label: "Email",
        icon: ""
    },
    {
        name: "password",
        label: "Password",
        icon: <RemoveRedEyeIcon />
    },
    {
        label: "Role",
        name: "role",
        placeholder: "Sign in as",
        type: "select",
        options: [  // Changed from 'Option' to 'options'
            { value: 'doctor', label: 'Doctor' },
            { value: 'patient', label: 'Patient' },
            { value: 'admin', label: 'Admin' },
        ],
        required: true,
    }

];


export const SignUpDataStaff = [
    { 
        label: "Staff ID",
        name: "staffId",
        placeholder: "Staff ID",
        type: "text",
        required: true
    },
    {
        label: "Name",
        name: "Name",
        placeholder: "First Name",
        type: "text",
        required: true
    },
    {
        label: "Email Address",
        name: "email",
        placeholder: "Email Address",
        type: "email",
        required: true
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Password",
        icon: <RemoveRedEyeIcon />
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder:"Confirm Password",
        icon: <RemoveRedEyeIcon />
    }

];