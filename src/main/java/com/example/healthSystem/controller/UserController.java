package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@SaCheckLogin
@Controller
public class UserController {

    @Autowired
    private IUserService userService;


    @SaIgnore
    @ResponseBody
    @RequestMapping("/patientRegister")
    public ApiResponse<String> patientRegister(@RequestBody PatientRegisterDTO patientRegisterDTO) {
        return userService.patientRegister(patientRegisterDTO);
    }

    @ResponseBody
    @RequestMapping("/testSql")
    @SaCheckRole("doctor")
    public ApiResponse<String> testSql() {
       // System.out.println(StpUtil.isLogin());
        userService.testSql();
        return ApiResponse.success("Test success");
    }

    @ResponseBody
    @RequestMapping("/getCurrentUser")
    public ApiResponse<String> getCurrentUser(){
        return ApiResponse.success((String)StpUtil.getLoginId());
    }

    @SaIgnore
    @RequestMapping("/login")
    @ResponseBody
    public ApiResponse<String> login(@RequestBody User user){
        return userService.login(user);
    }

    @ResponseBody
    @RequestMapping("/getPatientInfo")
    public ApiResponse<PatientInfo> getPatientInfo(@RequestBody String patientId) {
        return userService.getPatientInfo(patientId);
    }

    //通过注册申请+发送邮件
    @ResponseBody
    @RequestMapping("/reviewRegister")
    public ApiResponse<String> reviewRegister(@RequestBody ReviewRegisterDTO reviewRegisterDTO) {
        return userService.reviewRegister(reviewRegisterDTO.getPatientId(), reviewRegisterDTO.getStatus());
    }


    @ResponseBody
    @RequestMapping("/getAllDoctor")
    public ApiResponse<List<Doctor>> getAllDoctor() {
        return userService.getAllDoctor();
    }

    @ResponseBody
    @RequestMapping("/getDoctorBySpecialty")
    public ApiResponse<List<Doctor>> getDoctorBySpecialty(@RequestBody String specialty) {
        return userService.getDoctorBySpecialty(specialty);
    }

    //管理员添加医生
    @ResponseBody
    @RequestMapping("/addDoctor")
    public ApiResponse<String> addDoctor(@RequestBody Doctor doctor) {
        return userService.addDoctor(doctor);
    }

    @SaIgnore
    @ResponseBody
    @RequestMapping("/addListDoctor")
    public ApiResponse<String> addListDoctor(@RequestBody List<Doctor> doctors) {
        return userService.addListDoctor(doctors);
    }


}
