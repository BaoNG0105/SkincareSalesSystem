package com.example.demo.controller;

import com.example.demo.entity.SalesReport;
import com.example.demo.dto.SalesReportRequest;
import com.example.demo.entity.SkinCareRoutine;
import com.example.demo.service.SalesReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/sales-reports")
public class SalesReportController {
    @Autowired
    SalesReportService salesReportService;

    @PostMapping
    public ResponseEntity<SalesReport> createSalesReport(@Valid @RequestBody SalesReportRequest salesReportRequest) {
        return ResponseEntity.ok(salesReportService.createSalesReport(salesReportRequest));
    }

    @GetMapping
    public ResponseEntity<List<SalesReport>> getAllSalesReports() {
        return ResponseEntity.ok(salesReportService.getAllSalesReports());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesReport> getSalesReportById(@PathVariable long id) {
        return ResponseEntity.ok(salesReportService.getSalesReportById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        salesReportService.delete(id);
        return ResponseEntity.ok("Deleted sales report with ID: " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalesReport> updateSalesReport(@PathVariable long id, @Valid @RequestBody SalesReportRequest salesReportRequest) {
        return ResponseEntity.ok(salesReportService.updateSalesReport(id, salesReportRequest));
    }
}
