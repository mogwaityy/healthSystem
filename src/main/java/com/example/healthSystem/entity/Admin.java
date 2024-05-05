package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("admin")
public class Admin {
    @TableId("admin_id")
    private String adminId;

    @TableField("name")
    private String name;

    @TableField("password")
    private String password;

    @TableField("email")
    private String email;
}
