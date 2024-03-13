package com.example.healthSystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.healthSystem.mapper")
public class HealthSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthSystemApplication.class, args);
	}

}
