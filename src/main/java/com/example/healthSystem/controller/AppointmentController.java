package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Appointment;
import com.example.healthSystem.entity.MedicinePrescription;
import com.example.healthSystem.entity.MyPageDTO;
import com.example.healthSystem.entity.Prescription;
import com.example.healthSystem.service.IAppointmentService;
import com.example.healthSystem.service.IPrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@SaCheckLogin
@Controller
public class AppointmentController {

    @Autowired
    IAppointmentService appointmentService;

    //分页获取所有病人记录
    @ResponseBody
    @RequestMapping("/getPatientPage")
    public ApiResponse<Page> getPatientPage(@RequestBody MyPageDTO myPageDTO) {
        return appointmentService.getPatientPage(myPageDTO.getPageNum(), myPageDTO.getPageSize());
    }

    //病人预约看病
    @ResponseBody
    @RequestMapping("/bookAppointment")
    public ApiResponse<String> bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }



}
