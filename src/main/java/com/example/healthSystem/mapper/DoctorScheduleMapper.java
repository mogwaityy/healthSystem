package com.example.healthSystem.mapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Admin;
import com.example.healthSystem.entity.DoctorSchedule;
import com.example.healthSystem.entity.Patient;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface DoctorScheduleMapper extends BaseMapper<DoctorSchedule> {

    @Select("SELECT * FROM doctor_schedule WHERE doctor_id = #{doctorId} AND start_time >= #{start} AND end_time <= #{end}")
    List<DoctorSchedule> findSchedulesByDoctorIdAndDateRange(@Param("doctorId") String doctorId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}


