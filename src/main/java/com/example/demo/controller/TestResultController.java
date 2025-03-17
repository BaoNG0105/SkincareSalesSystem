package com.example.demo.controller;

import com.example.demo.dto.SkinCareRoutineRequest;
import com.example.demo.dto.TestResultRequest;
import com.example.demo.entity.Product;
import com.example.demo.entity.SkinCareRoutine;
import com.example.demo.entity.TestResults;
import com.example.demo.service.TestResultService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/test-result")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @PostMapping
    public ResponseEntity<TestResults> createTestResult(@Valid @RequestBody TestResultRequest request) {
        return ResponseEntity.ok(testResultService.createTestResults(request));
    }

    @GetMapping
    public ResponseEntity<List<TestResults>> getTestResultsByUserId(Long userId){
        return ResponseEntity.ok(testResultService.getTestResultsByUserId(userId));
    }


}