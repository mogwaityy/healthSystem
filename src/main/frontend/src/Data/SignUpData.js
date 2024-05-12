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
        label: "Mobile",
        name: "mobile",
        placeholder: "Mobile",
        type: "text",
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
        "name": "cancer",
        "label": "Cancer"
    },
    {
        "name": "alzheimers",
        "label": "Alzheimer"
    },
    {
        "name": "osteoarthritis",
        "label": "Osteoarthritis"
    },
    {
        "name": "parkinsons",
        "label": "Parkinson"
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
        "name": "mellitus",
        "label": "Mellitus"
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
            { value: 'patient', label: 'Patient' }
        ],
        required: true,
    }

];

export const LoginData2 = [
    {
        name: "email",
        label: "Email",
        icon: ""
    },
    {
        name: "password",
        label: "Password",
        icon: <RemoveRedEyeIcon />
    }
];