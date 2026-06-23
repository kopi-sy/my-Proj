package com.civicai.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class AIService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String analyzeComplaint(String description) {

        String url = "https://openrouter.ai/api/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        String body = """
{
  "model": "openai/gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "Analyze this civic complaint: %s\\n\\nChoose ONLY from these categories:\\n- Road Issue\\n- Electrical Issue\\n- Sanitation\\n- Water Supply\\n- Public Safety\\n\\nAllowed Departments:\\n- Roads Department\\n- Electricity Board\\n- Sanitation Department\\n- Water Department\\n- Police Department\\n\\nPriority:\\n- Low\\n- Medium\\n- High\\n\\nReturn EXACTLY:\\nCategory: <one from list>\\nDepartment: <one from list>\\nPriority: <Low/Medium/High>\\n\\nNo explanation.\\nNo extra text."
    }
  ]
}
""".formatted(description);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        String response = restTemplate.postForObject(
                url,
                entity,
                String.class
        );

        return response;
    }
}