package com.example.demo.controller;

import com.example.demo.dto.TestResultRequest;
import com.example.demo.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/skin-test")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @PostMapping("/result")
    public ResponseEntity<String> getSkinTypeAndSave(@RequestBody TestResultRequest request) {
        if (request.getUserId() == null) {
            return ResponseEntity.badRequest().body("UserId must be provided.");
        }
        if (request.getAnswers() == null || request.getAnswers().size() != 10) {
            return ResponseEntity.badRequest().body("Invalid test data. Please provide exactly 10 answers.");
        }
        String skinType = testResultService.determineAndSaveSkinType(request.getUserId(), request.getAnswers());
        return ResponseEntity.ok(skinType);
    }
}
