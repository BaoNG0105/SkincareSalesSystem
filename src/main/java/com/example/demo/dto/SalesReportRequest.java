package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SalesReportRequest {
    @NotNull(message = "Report date cannot be null")
    private LocalDate reportDate;

    @NotNull(message = "Total revenue cannot be null")
    @Positive(message = "Total revenue must be a positive number")
    private BigDecimal totalRevenue;

    @NotNull(message = "Total orders cannot be null")
    @Min(value = 0, message = "Total orders must be at least 0")
    private int totalOrders;

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
}

