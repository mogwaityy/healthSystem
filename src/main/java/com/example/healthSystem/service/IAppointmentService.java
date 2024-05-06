package com.example.healthSystem.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Appointment;
import com.example.healthSystem.entity.MedicinePrescription;
import com.example.healthSystem.entity.Prescription;

import java.util.List;

public interface IAppointmentService {
    public ApiResponse<Page> getPatientPage( int pageNum, int pageSize);

    public ApiResponse<String> bookAppointment(Appointment appointment);
}
