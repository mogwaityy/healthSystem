package com.example.healthSystem.service;

import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.MedicinePrescription;
import com.example.healthSystem.entity.PatientPrescription;
import com.example.healthSystem.entity.Prescription;

import java.util.List;

public interface IPrescriptionService {
    ApiResponse<String> addPrescription(Prescription prescription, List<MedicinePrescription>medicinePrescriptions);

    ApiResponse<PatientPrescription> getPrescription(String prescriptionId);
}
