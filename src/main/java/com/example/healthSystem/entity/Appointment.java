package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("appointment")
public class Appointment {
    @TableId("appointment_id")
    private Long appointmentId;

    @TableField("patient_id")
    private String patientId;

    @TableField("doctor_id")
    private String doctorId;

    @TableField("date")
    private Date date;

    @TableField("description")
    private String description;

    @TableField("status")
    private Integer status;
}
