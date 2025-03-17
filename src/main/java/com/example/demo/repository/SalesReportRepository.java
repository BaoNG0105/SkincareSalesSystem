package com.example.demo.repository;

import com.example.demo.entity.Product;
import com.example.demo.entity.SalesReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalesReportRepository extends JpaRepository<SalesReport, Long> {
    List<SalesReport> findByIsDeletedFalse();
    Optional<SalesReport> findByReportIdAndIsDeletedFalse(long id);
}
