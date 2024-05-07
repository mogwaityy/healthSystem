package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("medicine_prescription")
public class MedicinePrescription {
    @TableId("id")
    private Integer id;

    @TableField("prescription_id")
    private Long prescriptionId;

    @TableField("medicine")
    private String medicine;

    @TableField("quantity")
    private String quantity;

    @TableField("unit")
    private String unit;

    @TableField("dosage")
    private String dosage;
}
