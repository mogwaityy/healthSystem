package com.example.healthSystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.MedicinePrescription;
import com.example.healthSystem.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MedicinePrescriptionMapper extends BaseMapper<MedicinePrescription> {

    // 添加一个根据id查询role的方法
    @Select("SELECT role FROM user_role WHERE id = #{id}")
    String getRoleById(String id);


}
