package com.example.healthSystem.serviceImpl;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import com.example.healthSystem.service.IUserService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.healthSystem.common.CommonFunction;

import java.util.List;


@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private PatientMapper patientMapper;

    @Autowired
    private DoctorMapper doctorMapper;

    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Autowired
    private MedicalHistoryMapper medicalHistoryMapper;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public ApiResponse<String> patientRegister(PatientRegisterDTO patientRegisterDTO) {
        Patient patient=patientRegisterDTO.getPatient();
        if (StringUtils.hasText(patient.getEmail())&&StringUtils.hasText(patient.getName()) && StringUtils.hasText(patient.getPassword())) {
            if (patientMapper.existsByEmail(patient.getEmail())){
                return ApiResponse.error(400,"邮箱已被注册");
            }
            String id="patient" + CommonFunction.generateId();
            patient.setPatient_id(id);
            patient.setPassword(CommonFunction.encodePassword(patient.getPassword()));
            patientMapper.insert(patient);
            //插入到用户角色对应表中
            UserRole userRole = new UserRole();
            userRole.setId(id);
            userRole.setRole("patient");
            userRoleMapper.insert(userRole);
            //插入到medicalHistory表
            MedicalHistory medicalHistory=new MedicalHistory();
            medicalHistory.setPatientId(patient.getPatient_id());
            medicalHistory.setDescription(patientRegisterDTO.getMedicalHistory());
            medicalHistoryMapper.insert(medicalHistory);
            return ApiResponse.success("register success");
        }

        return ApiResponse.error(400,"");
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
        //加密密码
        user.setPassword(CommonFunction.encodePassword(user.getPassword()));

        String userId = null;
        switch (user.getRole().toLowerCase()) {
            case "admin":
                userId = adminMapper.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
                break;
            case "doctor":
                userId = doctorMapper.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
                break;
            case "patient":
                userId = patientMapper.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
                break;
            default:
                return ApiResponse.error(404, "Role not found");
        }


        if (userId != null) {
            // 用户登录成功
            StpUtil.login(userId);
            // 返回带有Token的成功响应
            String token = StpUtil.getTokenValue();
            return ApiResponse.success("Login successful, token: " + token);
        }
        return ApiResponse.error(404, "User not found");
    }

    @Override
    public ApiResponse<String> adminLogin(User user) {
        return null;
    }

    @Override
    public ApiResponse<String> logout() {
        StpUtil.logout(); // 用户注销
        return ApiResponse.success("Logout successful");
    }

    //获取病人信息及药物史
    @Override
    public ApiResponse<PatientInfo> getPatientInfo(String patientId) {
        QueryWrapper<Patient> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("patient_id",patientId);
        List<Patient> patients=patientMapper.selectList(queryWrapper);
        PatientInfo patientInfo=new PatientInfo();
        if (patients.size()==0)return ApiResponse.error(400,"patientId error!");
        patientInfo.setPatient(patients.get(0));
        QueryWrapper<MedicalHistory> historyQueryWrapper=new QueryWrapper<>();
        queryWrapper.eq("patient_id",patientId);
        List<MedicalHistory> medicalHistories=medicalHistoryMapper.selectList(historyQueryWrapper);
        patientInfo.setMedicalHistories(medicalHistories);
        return ApiResponse.success(patientInfo);
    }

    @Override
    public ApiResponse<String> reviewRegister(String patientId,Integer status) {
        UpdateWrapper<Patient> updateWrapper=new UpdateWrapper<>();
        updateWrapper.eq("patient_id", patientId); // 设置更新条件
        updateWrapper.set("status", status); // 设置更新的字段
        patientMapper.update(null, updateWrapper);
        Patient patient=patientMapper.selectById(patientId);
        if (status==1)sendSimpleMessage(patient.getEmail(),"Register Success","Success");
        if (status==2)sendSimpleMessage(patient.getEmail(),"Regsiter failed","failed");
        return ApiResponse.success(null);
    }

    @Override
    public ApiResponse<List<Doctor>> getAllDoctor() {
        return ApiResponse.success(doctorMapper.selectList(null));
    }

    @Override
    public ApiResponse<String> addDoctor(Doctor doctor) {
        String doctorId=CommonFunction.generateId();
        doctor.setDoctorId(doctorId);
        doctorMapper.insert(doctor);
        UserRole userRole=new UserRole();
        userRole.setRole("doctor");
        userRole.setId(doctorId);
        userRoleMapper.insert(userRole);
        return ApiResponse.success("添加医生成功");
    }

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("myeclinic@163.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

}
