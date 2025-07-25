package com.example.healthSystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Prescription;
import com.example.healthSystem.entity.Specialty;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PrescriptionMapper extends BaseMapper<Prescription> {
}
