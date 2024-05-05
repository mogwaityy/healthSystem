package com.example.healthSystem.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Admin;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminMapper extends BaseMapper<Patient> {
    //User getInfo(String name, String password);
    @Select("SELECT * FROM admin WHERE email = #{email} AND password = #{password}")
    User findUserByEmailAndPassword(@Param("email") String Email, @Param("password") String password);

}
