package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("specialty")
public class Specialty {
    @TableId("specialty_id")
    private Long specialtyId;

    @TableField("name")
    private String name;
}
