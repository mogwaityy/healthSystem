package com.example.healthSystem.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaIgnore;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.service.IOptionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@SaCheckLogin
@Controller
public class OptionController {

    @Autowired
    IOptionalService optionalService;

    @ResponseBody
    @RequestMapping("/getSpecialty")
    public ApiResponse<List> patientRegister() {
        return optionalService.getSpecialty();
    }

    @ResponseBody
    @RequestMapping("/getMedicine")
    public ApiResponse<List> patientMedicine() {
        return optionalService.getMedicine();
    }



}
