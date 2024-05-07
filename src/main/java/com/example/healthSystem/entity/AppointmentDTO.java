package com.example.healthSystem.entity;

import lombok.Data;

@Data
public class AppointmentDTO {
    private Appointment appointment;
    private Patient patient;
    private Doctor doctor;
}
