package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Appointment;
import com.example.healthSystem.entity.Medical;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.Specialty;
import com.example.healthSystem.mapper.AppointmentMapper;
import com.example.healthSystem.mapper.MedicalMapper;
import com.example.healthSystem.mapper.PatientMapper;
import com.example.healthSystem.mapper.SpecialtyMapper;
import com.example.healthSystem.service.IAppointmentService;
import com.example.healthSystem.service.IOptionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

    @Autowired
    PatientMapper patientMapper;

    @Autowired
    AppointmentMapper appointmentMapper;

    @Override
    public ApiResponse<Page> getPatientPage( int pageNum, int pageSize) {
        QueryWrapper<Patient> queryWrapper = new QueryWrapper<>();
        //0代表账号请求注册，1代表通过注册，2代表被拒绝
        queryWrapper.lt("status", 2);
        Page<Patient> page = new Page<>(pageNum, pageSize);
        return ApiResponse.success(patientMapper.selectPage(page,queryWrapper));
    }

    @Override
    public ApiResponse<String> bookAppointment(Appointment appointment) {
        if (appointmentMapper.insert(appointment)>0) return ApiResponse.success(null);
        return ApiResponse.error(400,"appointment failed");
    }
}
