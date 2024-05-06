package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
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

    ApiResponse<List<Doctor>> getAllDoctor();

    ApiResponse<String> addDoctor(Doctor doctor);
}
