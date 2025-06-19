import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// SignUpData.js

export const SignUpData1 = [
    {
        label: "姓名",
        name: "name",
        placeholder: "姓名",
        type: "text",
        required: true
    },
    {
        label: "性别",
        name: "gender",
        placeholder: "性别",
        type: "select",
        options: [  // Changed from 'Option' to 'options'
            { value: '', label: '选择性别' },
            { value: '1', label: '男' },
            { value: '2', label: '女' },
        ],
        required: true,
    },

    {
        label: "出生日期",
        name: "birth",
        type: "date",
        required: true
    },
    {
        label: "邮箱地址",
        name: "email",
        placeholder: "邮箱地址",
        type: "email",
        required: true
    },
    {
        label: "手机号",
        name: "mobile",
        placeholder: "手机号",
        type: "text",
        required: true
    },
    {
        label: "地址",
        name: "address",
        placeholder: "地址",
        type: "text",
        required: true
    }
];


export const SignUpData2 = [
    {
        name: "password",
        label: "密码",
        placeholder: "密码",
        icon: <RemoveRedEyeIcon />
    },
    {
        name: "confirmPassword",
        label: "确认密码",
        placeholder:"确认密码",
        icon: <RemoveRedEyeIcon />
    }
];

export const SignUpData3 = [
    {
        name: "asthma",
        label: "哮喘"
    },
    {
        name: "diabetes",
        label: "糖尿病"
    },
    {
        "name": "cancer",
        "label": "癌症"
    },
    {
        "name": "alzheimers",
        "label": "阿尔茨海默症"
    },
    {
        "name": "osteoarthritis",
        "label": "骨关节炎"
    },
    {
        "name": "parkinsons",
        "label": "帕金森"
    },
    {
        "name": "tuberculosis",
        "label": "结核病"
    },
    {
        "name": "hiv_aids",
        "label": "艾滋病"
    },
    {
        "name": "hypertension",
        "label": "高血压"
    },
    {
        "name": "mellitus",
        "label": "高血糖"
    }

];


export const LoginData = [
    {
        name: "email",
        label: "邮箱",
        icon: ""
    },
    {
        name: "password",
        label: "密码",
        icon: <RemoveRedEyeIcon />
    },
    {
        label: "角色",
        name: "role",
        placeholder: "选择身份",
        type: "select",
        options: [  // Changed from 'Option' to 'options'
            { value: 'doctor', label: '医生' },
            { value: 'patient', label: '患者' }
        ],
        required: true,
    }

];

export const LoginData2 = [
    {
        name: "email",
        label: "邮箱",
        icon: ""
    },
    {
        name: "password",
        label: "密码",
        icon: <RemoveRedEyeIcon />
    }
];