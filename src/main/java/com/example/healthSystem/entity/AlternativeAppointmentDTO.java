package com.example.healthSystem.entity;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AlternativeAppointmentDTO {
    Long appointmentId;
    LocalDateTime newTime;
}
