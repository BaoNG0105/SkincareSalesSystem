package com.example.demo.repository;

import com.example.demo.entity.RecommendedProduct;
import com.example.demo.entity.SalesReportDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalesReportDetailRepository extends JpaRepository<SalesReportDetail, Long> {



    List<SalesReportDetail> findAllByProduct_ProductIdAndIsDeletedFalse(long product);
    List<SalesReportDetail> findAllBySalesReport_ReportIdAndIsDeletedFalse(long salesReport);

    List<SalesReportDetail> findByIsDeletedFalse();

    Optional<SalesReportDetail> findByDetailIdAndIsDeletedFalse(long detailId);

}