package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("medical")
public class Medical {
    @TableId("medical_id")
    private Long medicalId;

    @TableField("name")
    private String name;
}
