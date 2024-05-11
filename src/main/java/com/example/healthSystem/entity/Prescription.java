package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("prescription")
public class Prescription {
    @TableId(value = "prescription_id")
    private Long prescriptionId;

    @TableField("appointment_id")
    private Long appointmentId;

    @TableField("diagnose")
    private String diagnose;

    @TableField("instruction")
    private String instruction;

    @TableField("patient_id")
    private String patientId;

    @TableField("doctor_id")
    private String doctorId;

    @TableField("description")
    private String description;
}
