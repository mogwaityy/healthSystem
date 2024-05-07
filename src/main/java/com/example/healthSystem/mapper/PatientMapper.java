package com.example.healthSystem.mapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Admin;
import com.example.healthSystem.entity.Doctor;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PatientMapper extends BaseMapper<Patient> {
    //User getInfo(String name, String password);

    @Select("SELECT patient_id FROM patient WHERE email = #{email} AND password = #{password}")
    String findUserByEmailAndPassword(@Param("email") String Email, @Param("password") String password);

    default boolean existsByEmail(String email) {
        QueryWrapper<Patient> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);
        int count = Math.toIntExact(selectCount(queryWrapper));
        return count > 0;
    }

    @Select("SELECT * FROM patient WHERE id = #{id}")
    Patient findPatientById(@Param("id") String id);


}
