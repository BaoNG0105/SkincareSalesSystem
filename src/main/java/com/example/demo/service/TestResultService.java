package com.example.demo.service;

//import com.example.demo.entity.SkinTest;
import com.example.demo.dto.BlogRequest;
import com.example.demo.dto.TestResultRequest;
import com.example.demo.entity.*;
//import com.example.demo.repository.SkinTestRepository;
import com.example.demo.repository.SkinTypeRepository;
import com.example.demo.repository.TestResultRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TestResultService {


    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkinTypeRepository skinTypeRepository;


public TestResults createTestResults(TestResultRequest testResultRequest) {
    User user = userRepository.findByIdAndIsDeletedFalse(testResultRequest.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
    SkinType skinType = skinTypeRepository.findBySkinTypeIdAndIsDeletedFalse(testResultRequest.getTestResultId())
            .orElseThrow(() -> new RuntimeException("Skin type not found"));

    TestResults testResults = new TestResults();
    testResults.setUser(user);
    testResults.setFinalSkinType(skinType);

    return testResultRepository.save(testResults);
}

public List<TestResults> getTestResultsByUserId(Long userId) {

    List<TestResults> testResults = testResultRepository.findByUser_IdAndIsDeletedFalse(userId);
    return testResults;
}
}