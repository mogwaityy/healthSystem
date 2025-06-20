package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.common.CommonFunction;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import com.example.healthSystem.service.IAppointmentService;
import com.example.healthSystem.service.IOptionalService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

    @Autowired
    PatientMapper patientMapper;

    @Autowired
    AppointmentMapper appointmentMapper;

    @Autowired
    DoctorScheduleMapper doctorScheduleMapper;

    @Autowired
    DoctorMapper doctorMapper;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    MedicalHistoryMapper medicalHistoryMapper;

    @Override
    public ApiResponse<Page> getPatientPage( int pageNum, int pageSize) {
        QueryWrapper<Patient> queryWrapper = new QueryWrapper<>();
        //0代表账号请求注册，1代表通过注册，
        //获取请求注册的请求
        queryWrapper.eq("status", 0);
        Page<Patient> page = new Page<>(pageNum, pageSize);
        return ApiResponse.success(patientMapper.selectPage(page,queryWrapper));
    }

    @Override
    public ApiResponse<String> bookAppointment(Appointment appointment) {
        if (appointment!=null){
            if (appointment.getPatientId()!=null){
                String patientId=appointment.getPatientId();
                Patient patient=patientMapper.selectById(patientId);
                if (patient!=null){
                    //注册未通过或注册被拒绝不能预约
                    if (patient.getStatus()==0||patient.getStatus()==2)return ApiResponse.error(400,"您无法预约，请检查您的注册状态。");
                }
            }
        }

        if (appointmentMapper.insert(appointment)>0) return ApiResponse.success("预约成功");
        return ApiResponse.error(400,"预约失败");
    }

    @Override
    public ApiResponse<String> updateDoctorSchedule(DoctorSchedule doctorSchedule) {
        //更改时间表
        if (doctorSchedule.getScheduleId()==null){
            doctorScheduleMapper.insert(doctorSchedule);
        }
        doctorScheduleMapper.updateById(doctorSchedule);
        //更改病人的预约状态
        Appointment appointment=new Appointment();
        appointment.setAppointmentId(doctorSchedule.getAppointmentId());
        appointment.setDoctorId(doctorSchedule.getDoctorId());
        appointment.setDate(doctorSchedule.getStartTime());
        //0-未分配医生待审核，1-已分配医生
        appointment.setStatus(1);
        appointmentMapper.updateById(appointment);
        //获取病人email
        Patient patient=patientMapper.selectById(doctorSchedule.getPatientId());
        String patientEmail=patient.getEmail();
        // 发送预约成功邮件
        SimpleMailMessage message = CommonFunction.sendSimpleMessage(
                patientEmail,
                "预约成功",
                "您的预约已成功，请登录 myclinic.com 查看状态。"
        );
        // 实际发送邮件
        mailSender.send(message);
        return ApiResponse.success("更新成功");
    }

    @Override
    public ApiResponse<List<DoctorSchedule>> getDoctorSchedule(String doctorId) {
        //给出今天到一周的时间安排列表
        LocalDateTime startOfWeek = LocalDate.now().atStartOfDay();
        LocalDateTime endOfWeek = startOfWeek.plusDays(7);
        return ApiResponse.success(doctorScheduleMapper.findSchedulesByDoctorIdAndDateRange(doctorId,startOfWeek,endOfWeek));
    }

    @Override
    public ApiResponse<List<AppointmentDTO>> getAppointment(String patientId,Integer status) {
        QueryWrapper<Appointment> queryWrapper=new QueryWrapper<>();
        if(patientId!=null) {
            queryWrapper.eq("patient_id", patientId);
        }
        if (status!=null) {
            queryWrapper.eq("status", status);
        }
        queryWrapper.orderByDesc("date");
        QueryWrapper<Patient> patientQueryWrapper=new QueryWrapper<>();
        QueryWrapper<Doctor> doctorQueryWrapper=new QueryWrapper<>();
        List<AppointmentDTO> appointmentDTOS=new ArrayList<>();
        List<Appointment> appointments=appointmentMapper.selectList(queryWrapper);
        if (appointments==null)return ApiResponse.success(appointmentDTOS);
        for (Appointment appointment:appointments
             ) {
            Doctor doctor=null;
            Patient patient=null;
            AppointmentDTO appointmentDTO=new AppointmentDTO();
            appointmentDTO.setAppointment(appointment);
            String  doctorId=appointment.getDoctorId();
            if (StringUtils.isNotBlank(doctorId)){
                doctorQueryWrapper.eq("doctor_id",doctorId);
                doctor=doctorMapper.selectById(doctorId);
                appointmentDTO.setDoctor(doctor);
            }
             patientId=appointment.getPatientId();
            if (StringUtils.isNotBlank(patientId)){
                patientQueryWrapper.eq("patient_id",patientId);
                patient=patientMapper.selectById(patientId);
                appointmentDTO.setPatient(patient);
            }
            appointmentDTOS.add(appointmentDTO);
        }
        return ApiResponse.success(appointmentDTOS);
    }

    @Override
    public ApiResponse<List<DoctorAppointmentDTO>> getDoctorAppointment(String doctorId,Integer status) {
        QueryWrapper<Appointment> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("doctor_id",doctorId);
        queryWrapper.eq("status",status);
        QueryWrapper<Patient> patientQueryWrapper=new QueryWrapper<>();
        List<DoctorAppointmentDTO> doctorAppointmentDTOS=new ArrayList<>();
        List<Appointment> appointments=appointmentMapper.selectList(queryWrapper);
        if (appointments==null)return ApiResponse.success(doctorAppointmentDTOS);
        for (Appointment appointment:appointments
        ) {
            Patient patient;
            DoctorAppointmentDTO appointmentDTO=new DoctorAppointmentDTO();
            appointmentDTO.setAppointment(appointment);
            String patientId=appointment.getPatientId();
            if (StringUtils.isNotBlank(patientId)){
                patientQueryWrapper.eq("patient_id",patientId);
                patient=patientMapper.selectById(patientId);
                appointmentDTO.setPatient(patient);
            }
            doctorAppointmentDTOS.add(appointmentDTO);
        }
        return ApiResponse.success(doctorAppointmentDTOS);
    }

    //拒绝看病预约并发送邮件
    @Override
    public ApiResponse<String> rejectAppointment(String appointmentId) {
        UpdateWrapper<Appointment> updateWrapper=new UpdateWrapper<>();
        updateWrapper.eq("appointment_id",appointmentId);
        updateWrapper.set("status",3);
        appointmentMapper.update(null,updateWrapper);
        Appointment appointment=appointmentMapper.selectById(appointmentId);
        String patientId=appointment.getPatientId();
        Patient patient=patientMapper.selectById(patientId);
        //发送邮件
        if (patient!=null){
            SimpleMailMessage mailMessage=CommonFunction.sendSimpleMessage(patient.getEmail(),"预约状态更新",
                    "抱歉，您的预约未通过");
            mailSender.send(mailMessage);
            return ApiResponse.success("拒绝成功");
        }
        return ApiResponse.success("拒绝失败，未找到病人！");
    }

    @Override
    public ApiResponse<String> deleteAppointment(String patinetId, String appointmentId) {
        QueryWrapper<Appointment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("appointment_id", appointmentId)
                .eq("patient_id", patinetId);
        appointmentMapper.delete(queryWrapper);
        return ApiResponse.success("取消成功");
    }

    @Override
    public ApiResponse<String> alternativeAppointment(AlternativeAppointmentDTO alternativeAppointmentDTO) {
        Long appointmentId=alternativeAppointmentDTO.getAppointmentId();
        LocalDateTime newTime=alternativeAppointmentDTO.getNewTime();
        UpdateWrapper<Appointment> updateWrapper=new UpdateWrapper<>();
        updateWrapper.eq("appointment_id",appointmentId);
        updateWrapper.set("status",4);
        updateWrapper.set("date",newTime);
        appointmentMapper.update(null,updateWrapper);
        Appointment appointment=appointmentMapper.selectById(appointmentId);
        String patientId=appointment.getPatientId();
        Patient patient=patientMapper.selectById(patientId);
        //发送邮件
        if (patient!=null){
            SimpleMailMessage mailMessage=CommonFunction.sendSimpleMessage(patient.getEmail(),"预约状态更新",
                    "抱歉，您的预约未通过。我们建议您改期至："+newTime+"。若同意请回复此邮件。");
            mailSender.send(mailMessage);
            return ApiResponse.success("拒绝成功");
        }
        return ApiResponse.success("替代失败，未找到病人！");
    }

    @Override
    public ApiResponse<String> addMedicalHistory(MedicalHistory medicalHistory) {
        medicalHistoryMapper.insert(medicalHistory);
        return ApiResponse.success("添加病史成功");
    }


}
