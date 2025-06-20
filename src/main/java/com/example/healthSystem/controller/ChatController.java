package com.example.healthSystem.controller;

import com.example.healthSystem.common.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Controller
public class ChatController {

    @Value("${deepseek.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @ResponseBody
    @PostMapping("/assistant/chat")
    public ApiResponse<String> chat(@RequestBody Map<String, Object> payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        try {
            ResponseEntity<Map> resp = restTemplate.postForEntity(
                    "https://api.deepseek.com/chat/completions", entity, Map.class);
            Object choices = resp.getBody().get("choices");
            if (choices instanceof java.util.List list && !list.isEmpty()) {
                Object message = ((Map) ((Map) list.get(0)).get("message"));
                if (message instanceof Map msg) {
                    Object content = msg.get("content");
                    return ApiResponse.success(content == null ? "" : content.toString());
                }
            }
        } catch (Exception e) {
            // ignore
        }
        return ApiResponse.error(500, "请求失败");
    }
}

