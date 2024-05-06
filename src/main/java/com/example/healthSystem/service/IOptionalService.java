package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;

import java.util.List;

public interface IOptionalService {
    ApiResponse<List> getSpecialty();

    ApiResponse<List> getMedicine();
}
