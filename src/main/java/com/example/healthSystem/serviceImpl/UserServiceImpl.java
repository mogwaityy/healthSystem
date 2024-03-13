package com.example.healthSystem.serviceImpl;

import com.example.healthSystem.entity.User;
import com.example.healthSystem.mapper.UserMapper;
import com.example.healthSystem.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> getAllUser() {
        return userMapper.selectList(null);
    }
}
