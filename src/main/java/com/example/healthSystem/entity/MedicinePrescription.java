package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("medicine_prescription")
public class MedicinePrescription {

    @TableId("prescription_id")
    private Long prescriptionId;

    @TableField("medicine")
    private String medicine;

    @TableField("quantity")
    private String quantity;

    @TableField("unit")
    private String unit;

    @TableField("dosage")
    private String dosage;

    // 可以省略构造函数、getters 和 setters 以及 toString 方法，因为 @Data 注解已经为我们自动实现了这些
}
