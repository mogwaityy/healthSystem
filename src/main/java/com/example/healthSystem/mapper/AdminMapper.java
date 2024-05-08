package com.example.healthSystem.mapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.Admin;
import com.example.healthSystem.entity.Patient;
import com.example.healthSystem.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminMapper extends BaseMapper<Admin> {
    //User getInfo(String name, String password);
    @Select("SELECT admin_id FROM admin WHERE email = #{email} AND password = #{password}")
    String findUserByEmailAndPassword(@Param("email") String Email, @Param("password") String password);

    @Select("SELECT * FROM admin WHERE admin_id = #{id}")
    Admin findAdminById(@Param("id") String id);

}
