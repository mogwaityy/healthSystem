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
public interface DoctorMapper extends BaseMapper<Doctor> {
    //User getInfo(String name, String password);

    @Select("SELECT doctor_id FROM admin WHERE email = #{email} AND password = #{password}")
    String findUserByEmailAndPassword(@Param("email") String Email, @Param("password") String password);

    default boolean existsByEmail(String email) {
        QueryWrapper<Doctor> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);
        int count = Math.toIntExact(selectCount(queryWrapper));
        return count > 0;
    }

    @Select("SELECT * FROM doctor WHERE id = #{id}")
    Doctor findDoctorById(@Param("id") String id);

}
