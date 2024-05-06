package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data  // Lombok 注解，自动生成 getter 和 setter 以及其他常用方法
@NoArgsConstructor  // Lombok 注解，自动生成无参构造函数
@AllArgsConstructor  // Lombok 注解，自动生成全参数构造函数
@TableName("user_role")  // MyBatis Plus 注解，指定数据库中的表名
public class UserRole {

    @TableId(type = IdType.INPUT)  // MyBatis Plus 注解，指定主键生成策略，这里设置为手动输入
    private String id;

    private String role;

}
