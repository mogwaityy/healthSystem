package com.example.healthSystem.config;

import org.springframework.aop.interceptor.PerformanceMonitorInterceptor;
import org.springframework.context.annotation.Bean;

public class MybatisPlusConfig {
    @Bean
    public PerformanceMonitorInterceptor performanceMonitorInterceptor(){
        return  new PerformanceMonitorInterceptor();
    }


}
