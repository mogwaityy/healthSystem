package com.example.healthSystem.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.healthSystem.common.ApiResponse;
import com.example.healthSystem.entity.*;
import com.example.healthSystem.mapper.*;
import com.example.healthSystem.service.IAppointmentService;
import com.example.healthSystem.service.IOptionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

    @Autowired
    PatientMapper patientMapper;

    @Autowired
    AppointmentMapper appointmentMapper;

    @Autowired
    DoctorScheduleMapper doctorScheduleMapper;

    @Override
    public ApiResponse<Page> getPatientPage( int pageNum, int pageSize) {
        QueryWrapper<Patient> queryWrapper = new QueryWrapper<>();
        //0代表账号请求注册，1代表通过注册，2代表被拒绝
        queryWrapper.lt("status", 2);
        Page<Patient> page = new Page<>(pageNum, pageSize);
        return ApiResponse.success(patientMapper.selectPage(page,queryWrapper));
    }

    @Override
    public ApiResponse<String> bookAppointment(Appointment appointment) {
        if (appointmentMapper.insert(appointment)>0) return ApiResponse.success(null);
        return ApiResponse.error(400,"appointment failed");
    }

    @Override
    public ApiResponse<String> updateDoctorSchedule(DoctorSchedule doctorSchedule) {
        //更改时间表
        doctorScheduleMapper.updateById(doctorSchedule);
        //更改病人的预约状态
        Appointment appointment=new Appointment();
        appointment.setAppointmentId(doctorSchedule.getAppointmentId());
        appointment.setDoctorId(doctorSchedule.getDoctorId());
        appointment.setDate(doctorSchedule.getStartTime());
        //0-未分配医生待审核，1-已分配医生
        appointment.setStatus(1);
        appointmentMapper.updateById(appointment);
        return ApiResponse.success(null);
    }

    @Override
    public ApiResponse<List<DoctorSchedule>> getDoctorSchedule(String doctorId) {
        //给出今天到一周的时间安排列表
        LocalDateTime startOfWeek = LocalDate.now().atStartOfDay();
        LocalDateTime endOfWeek = startOfWeek.plusDays(7);
        return ApiResponse.success(doctorScheduleMapper.findSchedulesByDoctorIdAndDateRange(doctorId,startOfWeek,endOfWeek));
    }


}
