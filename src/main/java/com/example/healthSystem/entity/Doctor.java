package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("doctor")
public class Doctor {
    @TableId("doctor_id")
    private String doctorId;

    @TableField("name")
    private String name;

    @TableField("specialty")
    private String specialty;

    @TableField("introduction")
    private String introduction;

    @TableField("email")
    private String email;

    @TableField("password")
    private String password;
}
