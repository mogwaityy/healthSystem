package com.example.healthSystem.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    //User getInfo(String name, String password);

}
