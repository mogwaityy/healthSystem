package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@TableName("appointment")
public class Appointment {
    @TableId(value = "appointment_id", type = IdType.AUTO)
    private Long appointmentId;

    @TableField("patient_id")
    private String patientId;

    @TableField("doctor_id")
    private String doctorId;

    @TableField("date")
    private LocalDateTime date;

    @TableField("description")
    private String description;

    @TableField("status")
    private Integer status;
}
