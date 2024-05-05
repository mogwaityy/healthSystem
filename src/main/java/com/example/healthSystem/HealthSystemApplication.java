package com.example.healthSystem;

import cn.dev33.satoken.SaManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.healthSystem.mapper")
public class HealthSystemApplication {

	public static void main(String[] args) throws JsonProcessingException {
		SpringApplication.run(HealthSystemApplication.class, args);
		System.out.println("启动成功，Sa-Token 配置如下：" + SaManager.getConfig());

	}

}
