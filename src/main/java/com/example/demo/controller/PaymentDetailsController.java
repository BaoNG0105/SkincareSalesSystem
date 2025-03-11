package com.example.demo.controller;

import com.example.demo.dto.PaymentDetailsRequest;
import com.example.demo.entity.PaymentDetails;
import com.example.demo.service.PaymentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment-details")
public class PaymentDetailsController {

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    // Tạo mới PaymentDetails
    @PostMapping
    public ResponseEntity<PaymentDetails> createPaymentDetails(@RequestBody PaymentDetailsRequest request) {
        PaymentDetails pd = paymentDetailsService.createPaymentDetails(request);
        return ResponseEntity.ok(pd);
    }

    // Lấy PaymentDetails theo id
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDetails> getPaymentDetails(@PathVariable Long id) {
        PaymentDetails pd = paymentDetailsService.getPaymentDetailsById(id);
        return ResponseEntity.ok(pd);
    }

    // Cập nhật PaymentDetails theo id
    @PutMapping("/{id}")
    public ResponseEntity<PaymentDetails> updatePaymentDetails(@PathVariable Long id, @RequestBody PaymentDetailsRequest request) {
        PaymentDetails pd = paymentDetailsService.updatePaymentDetails(id, request);
        return ResponseEntity.ok(pd);
    }

    // Xóa mềm PaymentDetails theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeletePaymentDetails(@PathVariable Long id) {
        paymentDetailsService.softDeletePaymentDetails(id);
        return ResponseEntity.noContent().build();
    }

    // Xóa hoàn toàn PaymentDetails theo id
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentDeletePaymentDetails(@PathVariable Long id) {
        paymentDetailsService.permanentDeletePaymentDetails(id);
        return ResponseEntity.noContent().build();
    }
}
