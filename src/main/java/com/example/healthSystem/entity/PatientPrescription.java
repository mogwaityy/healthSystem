package com.example.healthSystem.entity;

import lombok.Data;

import java.util.List;

@Data
public class PatientPrescription {
    private Prescription prescription;
    private List<MedicinePrescription> medicinePrescriptions;
}
