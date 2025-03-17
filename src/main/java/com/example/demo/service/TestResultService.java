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
//
//    /**
//     * Ánh xạ đáp án: A -> 1 ("Da dầu"), B -> 2 ("Da thường"), C -> 3 ("Da khô"), D -> 4 ("Da hỗn hợp")
//     */
//    private Integer mapAnswerToSkinTypeId(String answer) {
//        return switch (answer) {
//            case "A" -> 1;
//            case "B" -> 2;
//            case "C" -> 3;
//            case "D" -> 4;
//            default -> 0;
//        };
//    }
//
//    /**
//     * Map SkinType ID sang tên
//     */
//    private String mapSkinTypeIdToName(Integer id) {
//        return switch (id) {
//            case 1 -> "Da dầu";
//            case 2 -> "Da thường";
//            case 3 -> "Da khô";
//            case 4 -> "Da hỗn hợp";
//            default -> "Unknown";
//        };
//    }
//
//    /**
//     * Phân tích bài test, lưu trữ thông tin vào SkinTest và TestResults, sau đó trả về tên loại da cho FE.
//     *
//     * @param userId  Id của người dùng làm bài test.
//     * @param answers Danh sách 10 câu trả lời (chỉ chấp nhận "A", "B", "C", "D").
//     * @return Tên loại da được xác định.
//     */
//    public String determineAndSaveSkinType(Long userId, List<String> answers) {
//        if (answers == null || answers.size() != 10) {
//            throw new IllegalArgumentException("Exactly 10 answers are required.");
//        }
//
//        // Đếm số lần xuất hiện của các đáp án
//        Map<String, Integer> scoreMap = new HashMap<>();
//        scoreMap.put("A", 0);
//        scoreMap.put("B", 0);
//        scoreMap.put("C", 0);
//        scoreMap.put("D", 0);
//
//        for (String answer : answers) {
//            if (!scoreMap.containsKey(answer)) {
//                throw new IllegalArgumentException("Invalid answer: " + answer + ". Valid answers are A, B, C, D.");
//            }
//            scoreMap.put(answer, scoreMap.get(answer) + 1);
//        }
//
//        // Lấy đáp án xuất hiện nhiều nhất
//        String maxAnswer = scoreMap.entrySet().stream()
//                .max(Map.Entry.comparingByValue())
//                .map(Map.Entry::getKey)
//                .orElse("A");
//
//        // Map đáp án thành id của SkinType
//        Integer finalSkinTypeId = mapAnswerToSkinTypeId(maxAnswer);
//        // Chuyển đổi sang Long vì repository của SkinType sử dụng kiểu Long
//        Long skinTypeIdLong = finalSkinTypeId.longValue();
//
//        // Lấy thông tin User từ repository
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (!optionalUser.isPresent()) {
//            throw new IllegalArgumentException("User not found with id: " + userId);
//        }
//        User user = optionalUser.get();
//
//        // Lấy thông tin SkinType từ repository sử dụng skinTypeIdLong
//        Optional<SkinType> optionalSkinType = skinTypeRepository.findById(skinTypeIdLong);
//        if (!optionalSkinType.isPresent()) {
//            throw new IllegalArgumentException("SkinType not found with id: " + skinTypeIdLong);
//        }
//        SkinType skinType = optionalSkinType.get();
//
//        // 1. Tạo và lưu SkinTest
//        SkinTest skinTest = new SkinTest();
//        skinTest.setUser(user);
//        skinTest.setTestDate(LocalDateTime.now());
//        skinTest.setResultSkinType(skinType);
//        skinTest.setIsDeleted(false);
//        skinTestRepository.save(skinTest);
//
//        // 2. Tạo và lưu TestResults
//        TestResults testResults = new TestResults();
//        testResults.setSkinTest(skinTest);
//        testResults.setUser(user);
//        testResults.setTotalA(scoreMap.get("A"));
//        testResults.setTotalB(scoreMap.get("B"));
//        testResults.setTotalC(scoreMap.get("C"));
//        testResults.setTotalD(scoreMap.get("D"));
//        testResults.setFinalSkinType(skinType);
//        testResults.setCreatedAt(LocalDateTime.now());
//        testResults.setIsDeleted(false);
//        testResultRepository.save(testResults);
//
//        return mapSkinTypeIdToName(finalSkinTypeId);
//    }

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