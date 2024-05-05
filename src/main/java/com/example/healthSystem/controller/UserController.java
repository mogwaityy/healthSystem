package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaIgnore;
import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
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
        if (userService.patientRegister(patient)) {
            return ApiResponse.success("register success");
        }
        return ApiResponse.error(400, "Register failed");
    }

    @ResponseBody
    @RequestMapping("/testSql")
    @SaCheckLogin
    @SaCheckRole("admin")
    public ApiResponse<String> testSql() {
       // System.out.println(StpUtil.isLogin());
        userService.testSql();
        return ApiResponse.success("Test success");
    }



    @SaIgnore
    @RequestMapping("/patientLogin")
    @ResponseBody
    public ApiResponse<String> login(@RequestBody User user){
        return userService.login(user);
    }

}
