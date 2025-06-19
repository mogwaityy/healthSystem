import check from '../assets/check.jpg'
import consult from '../assets/consult.jpg'
import medicalRecord from '../assets/medicalRecord.jpg'
import makeAppoinment from '../assets/makeAppointment.jpg'

export const ServicesData = [
    {
        title: "预约",
        cover: makeAppoinment,
        key: "makeAppointment",
        link:"/make-appointment"
    },
    {
        title: "查看预约",
        cover: check,
        key: "check",
        link:"/check-appointment"
    },
    {
        title: "检查结果",
        cover: medicalRecord,
        key:"medicalRecord",
        link:"/result"
    }
]