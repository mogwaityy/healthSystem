package com.example.healthSystem.common;

import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.entity.Admin;
import com.example.healthSystem.entity.Doctor;
import com.example.healthSystem.entity.User;
import com.example.healthSystem.mapper.AdminMapper;
import com.example.healthSystem.mapper.DoctorMapper;
import com.example.healthSystem.mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Base64;

public class CommonFunction {
    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private DoctorMapper doctorMapper;

    @Autowired
    private AdminMapper adminMapper;

    public static synchronized String generateId() {
        return String.valueOf(System.currentTimeMillis());
    }

    public static String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    public  Object getCurrentUser() {
        // 获取当前登录用户ID
        String userId = (String) StpUtil.getLoginId();
        String role = StpUtil.getRoleList().get(0);


        Object foundUser=null;
        switch ((String) role) {
            case "admin":
                foundUser = adminMapper.findAdminById(userId);
            case "doctor":
                foundUser = doctorMapper.findDoctorById(userId);
                break;
            case "patient":
                foundUser = patientMapper.findPatientById(userId);
                break;
            // 根据用户ID查询用户信息
        }
        return foundUser;
    }

    public static synchronized Long generateLongId() {
        return System.currentTimeMillis();
    }

}
