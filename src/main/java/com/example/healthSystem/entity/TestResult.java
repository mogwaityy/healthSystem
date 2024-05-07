package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("test_result")
public class TestResult {
    @TableId("test_result_id")
    private Integer testResultId;

    @TableField("patient_id")
    private String patientId;

    @TableField("test_date")
    private Date testDate;

    @TableField("doctor_id")
    private String doctorId;

    @TableField("test_result")
    private String testResult;

    @TableField("test_type")
    private String testType;

    @TableField("normal_range")
    private String normalRange;
}
