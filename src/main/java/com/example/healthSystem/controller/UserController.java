package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.PatientInfo;
import com.example.healthSystem.entity.User;
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
    public ApiResponse<String> patientRegister(@RequestBody Patient patient) {
        return userService.patientRegister(patient);
    }

    @ResponseBody
    @RequestMapping("/testSql")
    @SaCheckRole("doctor")
    public ApiResponse<String> testSql() {
       // System.out.println(StpUtil.isLogin());
        userService.testSql();
        return ApiResponse.success("Test success");
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




//    @SaIgnore
//    @RequestMapping("/adminlogin")
//    @ResponseBody
//    public ApiResponse<String> adminlogin(@RequestBody User user){
//        return userService.adminLogin(user);
//    }


}
