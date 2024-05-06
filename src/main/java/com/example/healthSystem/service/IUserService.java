package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.PatientInfo;
import com.example.healthSystem.entity.User;

import java.util.List;

public interface IUserService {

    ApiResponse<String> patientRegister(Patient patient);
    Boolean testSql();

    ApiResponse<String> login(User user);

    ApiResponse<String> adminLogin(User user);

    ApiResponse<String> logout();

    ApiResponse<PatientInfo> getPatientInfo(String patientId);
}
