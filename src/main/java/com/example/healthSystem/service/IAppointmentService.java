package com.example.healthSystem.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;

import java.util.List;

public interface IAppointmentService {
    public ApiResponse<Page> getPatientPage( int pageNum, int pageSize);

    public ApiResponse<String> bookAppointment(Appointment appointment);

    public ApiResponse<String> updateDoctorSchedule(DoctorSchedule doctorSchedule);

    public ApiResponse<List<DoctorSchedule>> getDoctorSchedule(String doctorId);

    public ApiResponse<List<AppointmentDTO>> getAppointment(String patientId, Integer status);

    public ApiResponse<List<DoctorAppointmentDTO>> getDoctorAppointment(String doctorId,Integer status);

    public ApiResponse<String> rejectAppointment(String appointmentId);

    public ApiResponse<String> deleteAppointment(String patinetId,String appointmentId);

    public ApiResponse<String> alternativeAppointment(AlternativeAppointmentDTO alternativeAppointmentDTO);

    public ApiResponse<String> addMedicalHistory(MedicalHistory medicalHistory);
}
