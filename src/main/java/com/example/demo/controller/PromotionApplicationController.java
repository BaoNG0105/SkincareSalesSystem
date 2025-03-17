package com.example.demo.controller;

import com.example.demo.dto.PromotionApplicationRequest;
import com.example.demo.entity.PromotionApplication;
import com.example.demo.service.PromotionApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promotion-applications")
public class PromotionApplicationController {

    @Autowired
    private PromotionApplicationService promotionApplicationService;

    // Tạo mới PromotionApplication
    @PostMapping
    public ResponseEntity<PromotionApplication> createPromotionApplication(@RequestBody PromotionApplicationRequest request) {
        PromotionApplication pa = promotionApplicationService.createPromotionApplication(request);
        return ResponseEntity.ok(pa);
    }

    // Lấy PromotionApplication theo id
    @GetMapping("/{id}")
    public ResponseEntity<PromotionApplication> getPromotionApplication(@PathVariable Long id) {
        PromotionApplication pa = promotionApplicationService.getPromotionApplicationById(id);
        return ResponseEntity.ok(pa);
    }

    // Cập nhật PromotionApplication theo id
    @PutMapping("/{id}")
    public ResponseEntity<PromotionApplication> updatePromotionApplication(@PathVariable Long id, @RequestBody PromotionApplicationRequest request) {
        PromotionApplication pa = promotionApplicationService.updatePromotionApplication(id, request);
        return ResponseEntity.ok(pa);
    }

    // Xóa mềm PromotionApplication theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeletePromotionApplication(@PathVariable Long id) {
        promotionApplicationService.softDeletePromotionApplication(id);
        return ResponseEntity.noContent().build();
    }

    // Xóa hoàn toàn PromotionApplication theo id
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentDeletePromotionApplication(@PathVariable Long id) {
        promotionApplicationService.permanentDeletePromotionApplication(id);
        return ResponseEntity.noContent().build();
    }
}
