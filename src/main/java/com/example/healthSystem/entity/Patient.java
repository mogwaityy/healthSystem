package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "patient")
public class Patient {
    @TableId(value = "patient_id")
    private String patient_id;

    @TableField
    private String name;

    @TableField
    private String birth;

    @TableField
    private String address;

    @TableField
    private String email;

    @TableField
    private String password;

    @TableField
    private Integer gender;

    @TableField
    private String  mobile;

    @TableField
    private Integer status;

}
