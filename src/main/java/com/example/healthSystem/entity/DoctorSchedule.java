package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("doctor_schedule")
public class DoctorSchedule {
    @TableId(value = "schedule_id", type = IdType.AUTO)
    private Integer scheduleId;

    @TableField("doctor_id")
    private String doctorId;

    @TableField("start_time")
    private LocalDateTime startTime;

    @TableField("end_time")
    private LocalDateTime endTime;

    @TableField("status")
    private Integer status;

    @TableField("patient_id")
    private String patientId;

    @TableField("appoinment_id")
    private Long appointmentId;

}
