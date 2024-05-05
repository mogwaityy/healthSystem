package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;

import java.util.List;

public interface IUserService {

    Boolean patientRegister(Patient patient);
    Boolean testSql();

    ApiResponse<String> login(User user);

    ApiResponse<String> logout();
}
