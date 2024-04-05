package com.example.healthSystem.common;

import java.util.Base64;

public class CommonFunction {
    public static synchronized String generateId() {
        return String.valueOf(System.currentTimeMillis());
    }

    public static String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }
}
