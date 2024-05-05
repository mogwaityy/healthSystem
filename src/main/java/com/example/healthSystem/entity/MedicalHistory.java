package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("medical_history")
public class MedicalHistory {
    @TableId("history_id")
    private Long historyId;

    @TableField("patient_id")
    private String patientId;

    @TableField("date")
    private Date date;

    @TableField("description")
    private String description;
}
