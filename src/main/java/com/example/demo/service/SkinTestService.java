//package com.example.demo.service;
//
//import com.example.demo.entity.SkinTest;
//import com.example.demo.entity.SkinType;
//import com.example.demo.entity.User;
//import com.example.demo.repository.SkinTestRepository;
//import com.example.demo.repository.SkinTypeRepository;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//
//@Service
//public class SkinTestService {
//
//    @Autowired
//    private SkinTestRepository skinTestRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private SkinTypeRepository skinTypeRepository;
//
//    /**
//     * Ánh xạ đáp án: A -> 1 ("Da dầu"), B -> 2 ("Da thường"),
//     * C -> 3 ("Da khô"), D -> 4 ("Da hỗn hợp")
//     * Hàm này bây giờ trả về Long để tương thích với kiểu dữ liệu của repository.
//     */
//    private Long mapAnswerToSkinTypeId(String answer) {
//        return switch (answer) {
//            case "A" -> 1L;
//            case "B" -> 2L;
//            case "C" -> 3L;
//            case "D" -> 4L;
//            default -> 0L;
//        };
//    }
//
//    /**
//     * Map SkinType ID sang tên (sử dụng thông tin từ bảng SkinType)
//     * Nhận tham số là Long.
//     */
//    private String mapSkinTypeIdToName(Long id) {
//        return switch (id.intValue()) {
//            case 1 -> "Da dầu";
//            case 2 -> "Da thường";
//            case 3 -> "Da khô";
//            case 4 -> "Da hỗn hợp";
//            default -> "Unknown";
//        };
//    }
//
//    /**
//     * Xác định loại da từ 10 đáp án, lưu thông tin vào bảng SkinTest và trả về tên loại da.
//     */
//    public String determineAndSaveSkinTest(Long userId, List<String> answers) {
//        if (answers == null || answers.size() != 10) {
//            throw new IllegalArgumentException("Exactly 10 answers are required.");
//        }
//
//        // Đếm số lần xuất hiện của từng đáp án (sử dụng Long để phù hợp)
//        Map<String, Long> scoreMap = new HashMap<>();
//        scoreMap.put("A", 0L);
//        scoreMap.put("B", 0L);
//        scoreMap.put("C", 0L);
//        scoreMap.put("D", 0L);
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
//        Long finalSkinTypeId = mapAnswerToSkinTypeId(maxAnswer);
//
//        // Lấy thông tin User từ repository
//        Optional<User> optionalUser = userRepository.findById(userId);
//        if (!optionalUser.isPresent()) {
//            throw new IllegalArgumentException("User not found with id: " + userId);
//        }
//        User user = optionalUser.get();
//
//        // Lấy thông tin SkinType từ repository
//        Optional<SkinType> optionalSkinType = skinTypeRepository.findById(finalSkinTypeId);
//        if (!optionalSkinType.isPresent()) {
//            throw new IllegalArgumentException("SkinType not found with id: " + finalSkinTypeId);
//        }
//        SkinType skinType = optionalSkinType.get();
//
//        // Tạo mới bản ghi SkinTest
//        SkinTest skinTest = new SkinTest();
//        skinTest.setUser(user);
//        skinTest.setTestDate(LocalDateTime.now());
//        skinTest.setResultSkinType(skinType);
//        skinTest.setIsDeleted(false);
//
//        skinTestRepository.save(skinTest);
//
//        return skinType.getSkinType();
//    }
//}
