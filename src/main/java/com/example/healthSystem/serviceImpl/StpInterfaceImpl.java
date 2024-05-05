//package com.example.healthSystem.serviceImpl;
//
//import cn.dev33.satoken.stp.StpInterface;
//import cn.dev33.satoken.stp.StpUtil;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * 自定义权限加载接口实现类
// */
//@Component
//public class StpInterfaceImpl implements StpInterface {
//    @Override
//    public List<String> getPermissionList(Object o, String s) {
//        return null;
//    }
//
//    @Override
//    public List<String> getRoleList(Object loginId, String s) {
//        String r= (String) StpUtil.getSession().get("role");
//        List<String> role=new ArrayList<String>();
//        role.add(r);
//        return role;
//    }
//}
