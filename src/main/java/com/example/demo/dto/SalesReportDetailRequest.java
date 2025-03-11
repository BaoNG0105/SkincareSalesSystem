package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class SalesReportDetailRequest {
    @NotNull(message = "Report ID cannot be null")
    private Long reportId;

    @NotNull(message = "Product ID cannot be null")
    private Long productId;

    @NotNull(message = "Product quantity cannot be null")
    @Min(value = 1, message = "Product quantity must be at least 1")
    private int productQuantity;

    @NotNull(message = "Product revenue cannot be null")
    private BigDecimal productRevenue;
    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public BigDecimal getProductRevenue() {
        return productRevenue;
    }

    public void setProductRevenue(BigDecimal productRevenue) {
        this.productRevenue = productRevenue;
    }


}
