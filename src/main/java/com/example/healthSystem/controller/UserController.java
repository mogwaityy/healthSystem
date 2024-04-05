package com.example.healthSystem.controller;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;
import com.example.healthSystem.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private IUserService userService;


    @ResponseBody
    @RequestMapping("/patientRegister")
    public ApiResponse<String> patientRegister(Patient patient) {
        if (userService.patientRegister(patient)) {
            return ApiResponse.success(null);
        }
        return ApiResponse.error(400, "Register failed");
    }


}
