package com.example.healthSystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
public class User {
    private int id;
    private String email;
    private String password;
    private String role;

    public User(int id, String name, String password,String role) {
        this.id = id;
        this.email = name;
        this.password = password;
        this.role=role;
    }

    public User(){

    }

}
