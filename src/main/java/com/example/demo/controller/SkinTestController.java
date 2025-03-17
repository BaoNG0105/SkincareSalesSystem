//package com.example.demo.controller;
//
//import com.example.demo.dto.SkinTestRequest;
//import com.example.demo.service.SkinTestService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/skin-test")
//public class SkinTestController {
//
//    @Autowired
//    private SkinTestService skinTestService;
//
//    @PostMapping("/results")
//    public ResponseEntity<String> getSkinType(@RequestBody SkinTestRequest request) {
//        if (request.getUserId() == null) {
//            return ResponseEntity.badRequest().body("UserId must be provided.");
//        }
//        if (request.getAnswers() == null || request.getAnswers().size() != 10) {
//            return ResponseEntity.badRequest().body("Invalid test data. Please provide exactly 10 answers.");
//        }
//
//        String skinTypeName = skinTestService.determineAndSaveSkinTest(request.getUserId(), request.getAnswers());
//        return ResponseEntity.ok(skinTypeName);
//    }
//}
