package com.example.healthSystem.serviceImpl;

import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import com.example.healthSystem.mapper.UserRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义权限加载接口实现类
 */
@Component
public class StpInterfaceImpl implements StpInterface {

    @Autowired
    private UserRoleMapper userRoleMapper;
    @Override
    public List<String> getPermissionList(Object o, String s) {
        return null;
    }

    @Override
    public List<String> getRoleList(Object loginId, String s) {
        String role= userRoleMapper.getRoleById((String) loginId);
        List<String> roles=new ArrayList<>();
        roles.add(role);
        return roles;
    }
}
