package com.example.healthSystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.healthSystem.entity.TestResult;
import com.example.healthSystem.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface TestResultMapper extends BaseMapper<TestResult> {


}
