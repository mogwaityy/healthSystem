package com.example.healthSystem.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Patient;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PatientMapper extends BaseMapper<Patient> {
    //User getInfo(String name, String password);

}
