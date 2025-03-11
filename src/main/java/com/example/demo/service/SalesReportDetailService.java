package com.example.demo.service;

import com.example.demo.dto.SalesReportDetailRequest;
import com.example.demo.entity.RecommendedProduct;
import com.example.demo.entity.SalesReport;
import com.example.demo.entity.SalesReportDetail;
import com.example.demo.entity.Product;
import com.example.demo.repository.SalesReportDetailRepository;
import com.example.demo.repository.SalesReportRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalesReportDetailService {
    @Autowired
    private SalesReportDetailRepository salesReportDetailRepository;

    @Autowired
    private SalesReportRepository salesReportRepository;

    @Autowired
    private ProductRepository productRepository;

    public SalesReportDetail createSalesReportDetail(SalesReportDetailRequest request) {
        SalesReport salesReport = salesReportRepository.findById(request.getReportId())
                .orElseThrow(() -> new RuntimeException("SalesReport not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        SalesReportDetail detail = new SalesReportDetail();
        detail.setSalesReport(salesReport);
        detail.setProduct(product);
        detail.setProductQuantity(request.getProductQuantity());
        detail.setProductRevenue(request.getProductRevenue());
        detail.setDeleted(false);

        return salesReportDetailRepository.save(detail);
    }

    public List<SalesReportDetail> getAllSalesReportDetails() {
        return salesReportDetailRepository.findByIsDeletedFalse();
    }

    public SalesReportDetail deleteSalesReportDetail(long detailId) {
        SalesReportDetail detail = salesReportDetailRepository.findByDetailIdAndIsDeletedFalse(detailId)
                .orElseThrow(() -> new RuntimeException("SalesReportDetail not found"));
        detail.setDeleted(true);
        return salesReportDetailRepository.save(detail);
    }

    public SalesReportDetail updateSalesReportDetail(long detailId, SalesReportDetailRequest request) {
        SalesReportDetail detail = salesReportDetailRepository.findByDetailIdAndIsDeletedFalse(detailId)
                .orElseThrow(() -> new RuntimeException("SalesReportDetail not found"));

        detail.setProductQuantity(request.getProductQuantity());
        detail.setProductRevenue(request.getProductRevenue());

        return salesReportDetailRepository.save(detail);
    }

    public SalesReportDetail getSalesReportDetailById(long detailId) {
        return salesReportDetailRepository.findByDetailIdAndIsDeletedFalse(detailId)
                .orElseThrow(() -> new RuntimeException("SalesReportDetail not found"));
    }

    public List<SalesReportDetail> getSalesReportDetailByProductIdAndReportId(Long productId, Long reportId) {

        List<SalesReportDetail> salesReportDetails = salesReportDetailRepository.findAllByProduct_ProductIdAndIsDeletedFalse(productId);

        return salesReportDetails.stream()
                .filter(s -> s.getSalesReport().getReportId() == reportId)
                .toList();

    }


}
