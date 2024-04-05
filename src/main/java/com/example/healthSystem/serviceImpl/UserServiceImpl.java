package com.example.healthSystem.serviceImpl;

import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;
import com.example.healthSystem.mapper.PatientMapper;
import com.example.healthSystem.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.healthSystem.common.CommonFunction;

import java.util.Base64;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private PatientMapper patientMapper;


    @Override
    public Boolean patientRegister(Patient patient) {
        if(StringUtils.isNotBlank(patient.getName()) && StringUtils.isNotBlank(patient.getPassword())) {
            patient.setPatient_id("patient"+CommonFunction.generateId());
            patient.setPassword(CommonFunction.encodePassword(patient.getPassword()));
            patientMapper.insert(patient);
            return true;
        }

        return false;
    }
}
