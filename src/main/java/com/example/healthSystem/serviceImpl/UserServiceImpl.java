package com.example.healthSystem.serviceImpl;

import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;
import com.example.healthSystem.mapper.AdminMapper;
import com.example.healthSystem.mapper.DoctorMapper;
import com.example.healthSystem.mapper.PatientMapper;
import com.example.healthSystem.service.IUserService;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.healthSystem.common.CommonFunction;


@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private DoctorMapper doctorMapper;

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public Boolean patientRegister(Patient patient) {
        if (StringUtils.hasText(patient.getName()) && StringUtils.hasText(patient.getPassword())) {
            patient.setPatient_id("patient" + CommonFunction.generateId());
            patient.setPassword(CommonFunction.encodePassword(patient.getPassword()));
            patientMapper.insert(patient);
            return true;
        }

        return false;
    }

    @Override
    public Boolean testSql() {
        return patientMapper.selectList(null).size() > 0;
    }

    @Override
    public ApiResponse<String> login(User user) {
        // 检查User对象及其关键字段是否为空
        if (user == null || !StringUtils.hasText(user.getEmail()) || !StringUtils.hasText(user.getPassword()) || !StringUtils.hasText(user.getRole())) {
            return ApiResponse.error(400, "Missing or incorrect user information");
        }

        User foundUser = null;
        switch (user.getRole().toLowerCase()) {
            case "admin":
                foundUser = adminMapper.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
                //Boolean emailIsExist=adminMapper.
                break;
            case "doctor":
                foundUser = doctorMapper.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
                break;
            case "patient":
                foundUser = patientMapper.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
                break;
            default:
                return ApiResponse.error(404, "Role not found");
        }
//        Boolean emailIsExist=
//        if (user.getEmail())

        if (foundUser != null) {
            // 用户登录成功
            StpUtil.login(foundUser.getId());
            // 设置用户角色
            // 将角色保存在会话中
            StpUtil.getSession().set("role", foundUser.getRole());
            // 返回带有Token的成功响应
            String token = StpUtil.getTokenValue();
            return ApiResponse.success("Login successful, token: " + token);
        }
        return ApiResponse.error(404, "User not found");
    }

    @Override
    public ApiResponse<String> logout() {
        StpUtil.logout(); // 用户注销
        return ApiResponse.success("Logout successful");
    }

//    public User getCurrentUser() {
//        // 获取当前登录用户ID
//        Object userId = StpUtil.getLoginId();
//        Class<String> role = StpUtil.getSession().get("role", String.class);
//
//
//        // 根据用户ID查询用户信息
//        User user = userRepository.findById(userId);
//
//        return user;
//    }
}
