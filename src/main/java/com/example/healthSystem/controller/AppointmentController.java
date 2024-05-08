package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.service.IAppointmentService;
import com.example.healthSystem.service.IPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.context.support.SimpleTheme;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@SaCheckLogin
@Controller
public class AppointmentController {

    @Autowired
    IAppointmentService appointmentService;

    //admin分页获取所有病人记录
    @ResponseBody
    @RequestMapping("/getPatientPage")
    public ApiResponse<Page> getPatientPage() {
        return appointmentService.getPatientPage(1, 1000000);
    }

    //病人预约看病
    @ResponseBody
    @RequestMapping("/bookAppointment")
    @SaCheckRole("patient")
    public ApiResponse<String> bookAppointment(@RequestBody Appointment appointment) {
        appointment.setPatientId((String) StpUtil.getLoginId());
        return appointmentService.bookAppointment(appointment);
    }

    //病人获取自己的appointment
    @ResponseBody
    @RequestMapping("/getAppointment")
    @SaCheckRole("patient")
    public ApiResponse<List<AppointmentDTO>> getAppointment() {
        String patientId= (String) StpUtil.getLoginId();
        return appointmentService.getAppointment(patientId,null);
    }
    //admin根据状态获取appointment，0-未分配，1-分配医生，3-拒绝,2-已完成
    @ResponseBody
    @RequestMapping("/getAppointmentByStatus")
    public ApiResponse<List<AppointmentDTO>> getAppointmentByStatus(@RequestBody Integer status) {
        return appointmentService.getAppointment(null,status);
    }

    //医生获取他的appointment
    @ResponseBody
    @SaCheckRole("doctor")
    @RequestMapping("/getDoctorAppointment")
    public ApiResponse<List<DoctorAppointmentDTO>> getAppointmentByStatus() {
        String doctorId= (String) StpUtil.getLoginId();
        //已被分配好医生但没处理
        Integer status=1;
        return appointmentService.getDoctorAppointment(doctorId,status);
    }


    //病人预约看病，admin审核appointment后安排医生
    @ResponseBody
    @RequestMapping("/updateDoctorSchedule")
    public ApiResponse<String> updateDoctorSchedule(@RequestBody DoctorSchedule doctorSchedule) {
        return appointmentService.updateDoctorSchedule(doctorSchedule);
    }

    //admin拒绝appointment
    @ResponseBody
    @RequestMapping("/rejectAppointment")
    public ApiResponse<String> rejectAppointment(@RequestBody String appointmentId) {
        return appointmentService.rejectAppointment(appointmentId);
    }

    //给出替补方案，即更改appointment日期，发送邮件
    @ResponseBody
    @RequestMapping("/alternativeAppointment")
    public ApiResponse<String> alternativeAppointment(@RequestBody AlternativeAppointmentDTO alternativeAppointmentDTO) {
        return appointmentService.alternativeAppointment(alternativeAppointmentDTO);
    }


    //管理员获取医生的时间表
    @ResponseBody
    @RequestMapping("/getDoctorSchedule")
    public ApiResponse<List<DoctorSchedule>> getDoctorSchedule(@RequestBody String doctorId) {
        return appointmentService.getDoctorSchedule(doctorId);
    }

    //医生获取他自己的时间表
    @ResponseBody
    @RequestMapping("/getMyDoctorSchedule")
    public ApiResponse<List<DoctorSchedule>> getMyDoctorSchedule() {
        String doctorId= (String) StpUtil.getLoginId();
        return appointmentService.getDoctorSchedule(doctorId);
    }


    //doctor或者admin增加病历史
    @ResponseBody
    @RequestMapping("/addMedicalHistory")
    public ApiResponse<String> addMedicalHistory(@RequestBody MedicalHistory medicalHistory) {
        return appointmentService.addMedicalHistory(medicalHistory);
    }



}
