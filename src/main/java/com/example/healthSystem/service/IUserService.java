package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.PatientInfo;
import com.example.healthSystem.entity.PatientRegisterDTO;
import com.example.healthSystem.entity.User;
import com.google.protobuf.Api;

import java.util.List;

public interface IUserService {

    ApiResponse<String> patientRegister(PatientRegisterDTO patientRegisterDTO);
    Boolean testSql();

    ApiResponse<String> login(User user);

    ApiResponse<String> adminLogin(User user);

    ApiResponse<String> logout();

    ApiResponse<PatientInfo> getPatientInfo(String patientId);

    ApiResponse<String> reviewRegister(String patientId,Integer status);
}
