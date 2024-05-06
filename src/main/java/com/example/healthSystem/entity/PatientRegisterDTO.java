package com.example.healthSystem.entity;

import lombok.Data;

@Data
public class PatientRegisterDTO {
    private Patient patient;
    private String medicalHistory;
}
