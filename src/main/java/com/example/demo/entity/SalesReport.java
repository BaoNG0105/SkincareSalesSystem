package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class SalesReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reportId;

    @NotNull(message = "Report date cannot be null")
    private LocalDate reportDate;

    @NotNull(message = "Total revenue cannot be null")
    @Positive(message = "Total revenue must be a positive number")
    private BigDecimal totalRevenue;

    @NotNull(message = "Total orders cannot be null")
    @Min(value = 0, message = "Total orders must be at least 0")
    private int totalOrders;

    private LocalDateTime createdAt;
    private boolean isDeleted = false;

    @OneToMany(mappedBy = "salesReport", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SalesReportDetail> salesReportDetails;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public long getReportId() {
        return reportId;
    }

    public void setReportId(long reportId) {
        this.reportId = reportId;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}

