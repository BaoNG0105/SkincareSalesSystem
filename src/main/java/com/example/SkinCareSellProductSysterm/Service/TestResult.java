package com.example.SkinCareSellProductSysterm.Service;

import com.example.SkinCareSellProductSysterm.DTO.TestResultRequest;
import com.example.SkinCareSellProductSysterm.Entity.SkinType;
import com.example.SkinCareSellProductSysterm.Entity.TestResults;
import com.example.SkinCareSellProductSysterm.Entity.User;

import java.util.List;

public class TestResult {
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
