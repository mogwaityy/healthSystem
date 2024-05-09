
import api from "../index"

export const getAppointmentApi = (data) => {
    return api({
        url: 'getAppointment',
        method: 'post',
        data
    })
}
export const getAppointmentByStatusApi = (data) => {
    return api.post("getAppointmentByStatus", data)
}
export const bookAppointmentApi = (data) => {
    return api({
        url: 'bookAppointment',
        method: 'post',
        data: data
    })
}


export const getPatientInfoApi = (data) => {
    return api.post("getPatientInfo", data,{
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
    })
}

export const getSpecialtyApi = (data) => {
    return api.post("getSpecialty", data)
}
export const getDoctorBySpecialtyApi = (data) => {
    return api.post("getDoctorBySpecialty", data,{
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
    })
}
export const rejectAppointmentApi = (data) => {
    return api.post("rejectAppointment", data,{
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
    })
}
export const getgetDoctorScheduleApi = (data) => {
    return api.post("getDoctorSchedule", data,{
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
    })
}
export const getDoctorAppointmentApi = () => {
    return api.get("getDoctorAppointment")
}
export const getCurrentUserApi = () => {
    return api.get("getCurrentUser")
}
export const getMedicineApi = () => {
    return api.get("getMedicine")
}

export const addPrescriptionApi = (data) => {
    return api.post("addPrescription", data)
}
export const getPrescriptionApi = (data) => {
    return api.post("getPrescription", data)
}
export const getPrescriptionByAppointmentApi = (data) => {
    return api.post("getPrescriptionByAppointment", data)
}
export const addTestApi = (data) => {
    return api.post("addTest", data)
}
export const addMedicalHistoryApi = (data) => {
    return api.post("addMedicalHistory", data)
}
export const getPatientPageApi = () => {
    return api.post("getPatientPage")
}
export const getMyTestResultApi = () => {
    return api.post("getMyTestResult")
}

export const getMyDoctorScheduleApi = () => {
    return api.post("getMyDoctorSchedule")
}


export const reviewRegisterApi = (data) => {
    return api({
        url: 'reviewRegister',
        method: 'post',
        data: data
    })
}

export const getDoctorScheduleApi = (data) => {
    return api({
        url: 'getDoctorSchedule',
        method: 'post',
        data: data
    })
}

