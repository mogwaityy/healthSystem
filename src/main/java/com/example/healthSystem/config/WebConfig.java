package com.example.healthSystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 匹配所有请求路径
                        .allowedOrigins("http://localhost:3000") // 允许所有源访问，实际部署时建议指定具体源
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 允许的HTTP方法
                        .allowedHeaders("*") // 允许所有的请求头
                        .allowCredentials(true) // 如果需要携带cookie等凭证信息，则需要设置为true
                        .maxAge(3600); // 预检请求的有效期，单位秒
            }
        };
    }
}
