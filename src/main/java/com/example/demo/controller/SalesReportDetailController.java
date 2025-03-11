package com.example.demo.controller;

import com.example.demo.dto.SalesReportDetailRequest;
import com.example.demo.entity.SalesReportDetail;
import com.example.demo.service.SalesReportDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/sales-report-details")
public class SalesReportDetailController {

    @Autowired
    private SalesReportDetailService salesReportDetailService;

    @PostMapping
    public ResponseEntity<SalesReportDetail> createSalesReportDetail(@Valid @RequestBody SalesReportDetailRequest request) {
        return ResponseEntity.ok(salesReportDetailService.createSalesReportDetail(request));
    }

    @GetMapping
    public ResponseEntity<List<SalesReportDetail>> getAllSalesReportDetails() {
        return ResponseEntity.ok(salesReportDetailService.getAllSalesReportDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesReportDetail> getSalesReportDetailById(@PathVariable long id) {
        return ResponseEntity.ok(salesReportDetailService.getSalesReportDetailById(id));
    }


    @GetMapping("/product/{productId}/report/{reportId}")
    public ResponseEntity<List<SalesReportDetail>> getAllSalesReportDetailByProductIdAndReportId(
            @PathVariable long productId, @PathVariable long reportId) {
        return ResponseEntity.ok(salesReportDetailService.getSalesReportDetailByProductIdAndReportId(productId, reportId));
    }

    @DeleteMapping("/{detailId}")
    public ResponseEntity<String> deleteSalesReportDetail(@PathVariable long detailId) {
        salesReportDetailService.deleteSalesReportDetail(detailId);
        return ResponseEntity.ok("Deleted SalesReportDetail with ID: " + detailId);
    }

    @PutMapping("/{detailId}")
    public ResponseEntity<SalesReportDetail> updateSalesReportDetail(
            @PathVariable long detailId, @Valid @RequestBody SalesReportDetailRequest request) {
        return ResponseEntity.ok(salesReportDetailService.updateSalesReportDetail(detailId, request));
    }
}
