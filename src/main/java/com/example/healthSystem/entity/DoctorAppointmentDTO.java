package com.example.healthSystem.entity;

import lombok.Data;

@Data
public class DoctorAppointmentDTO {
    private Appointment appointment;
    private Patient patient;
}
