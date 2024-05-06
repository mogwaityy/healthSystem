package com.example.healthSystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Medical;
import com.example.healthSystem.entity.MedicalHistory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MedicalHistoryMapper extends BaseMapper<MedicalHistory> {
}
