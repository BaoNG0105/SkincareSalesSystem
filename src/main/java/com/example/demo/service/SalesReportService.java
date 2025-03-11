package com.example.demo.service;

import com.example.demo.entity.SalesReport;
import com.example.demo.dto.SalesReportRequest;
import com.example.demo.entity.SkinType;
import com.example.demo.repository.SalesReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalesReportService {
    @Autowired
    private SalesReportRepository salesReportRepository;

    public SalesReport createSalesReport(SalesReportRequest salesReportRequest) {
        SalesReport salesReport = new SalesReport();
        salesReport.setReportDate(salesReportRequest.getReportDate());
        salesReport.setTotalRevenue(salesReportRequest.getTotalRevenue());
        salesReport.setTotalOrders(salesReportRequest.getTotalOrders());
        return salesReportRepository.save(salesReport);
    }

    public List<SalesReport> getAllSalesReports() {
        return salesReportRepository.findByIsDeletedFalse();
    }

    public SalesReport delete(long id) {
        Optional<SalesReport> salesReportOpt = salesReportRepository.findByReportIdAndIsDeletedFalse(id);
        if (salesReportOpt.isEmpty()) {
            throw new RuntimeException("Sales report not found with ID: " + id);
        }
        SalesReport salesReport = salesReportOpt.get();
        salesReport.setDeleted(true);
        return salesReportRepository.save(salesReport);
    }

    public SalesReport updateSalesReport(long id, SalesReportRequest salesReportRequest) {
        SalesReport salesReport = salesReportRepository.findByReportIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Sales report not found with ID: " + id));

        salesReport.setReportDate(salesReportRequest.getReportDate());
        salesReport.setTotalRevenue(salesReportRequest.getTotalRevenue());
        salesReport.setTotalOrders(salesReportRequest.getTotalOrders());
        return salesReportRepository.save(salesReport);
    }

    public SalesReport getSalesReportById(long salesReportId) {
        return salesReportRepository.findByReportIdAndIsDeletedFalse(salesReportId)
                .orElseThrow(() -> new RuntimeException("Skin type not found"));
    }
}
