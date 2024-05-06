package com.example.healthSystem.entity;

import lombok.Data;

import java.util.List;

@Data
public class PatientInfo {
   private Patient patient;
   private List<MedicalHistory> medicalHistories;
}
