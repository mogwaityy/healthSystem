package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;

import java.util.List;

public interface IPrescriptionService {
    ApiResponse<String> addPrescription(Prescription prescription, List<MedicinePrescription>medicinePrescriptions);

    ApiResponse<PatientPrescription> getPrescription(String prescriptionId);

    ApiResponse<List<TestResult>> getTestResultByPatient(String patientId);

    ApiResponse<Object> getInfo();

    ApiResponse<List<PatientPrescription>> getMyPrescription(String patientId);

    ApiResponse<List<PatientPrescription>> getMyPrescriptionByAppointmentId(String appointmentId);


    ApiResponse<String> addTest(List<TestResult> testResult);

    ApiResponse<String> updateTest(List<TestResult> testResult);


}
