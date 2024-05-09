import api from "../index"

export const LoginApi = (data) => {
    return api({
        url: 'login',
        method: 'post',
        data
    })
}

export const patientRegisterApi = (data) => {
    return api({
        url: 'patientRegister',
        method: 'post',
        data
    })
}