package com.example.healthSystem.serviceImpl;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Medical;
import com.example.healthSystem.entity.Specialty;
import com.example.healthSystem.mapper.MedicalMapper;
import com.example.healthSystem.mapper.SpecialtyMapper;
import com.example.healthSystem.service.IOptionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionServiceImpl implements IOptionalService {

    @Autowired
    SpecialtyMapper specialtyMapper;

    @Autowired
    MedicalMapper medicalMapper;

    @Override
    public ApiResponse<List> getSpecialty() {
        List<Specialty> specialties=specialtyMapper.selectList(null);
        return ApiResponse.success(specialties);
    }

    @Override
    public ApiResponse<List> getMedicine() {
        List<Medical> medicines=medicalMapper.selectList(null);
        return ApiResponse.success(medicines);
    }
}
