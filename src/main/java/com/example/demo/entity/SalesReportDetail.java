package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class SalesReportDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long detailId;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private SalesReport salesReport;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull(message = "Product quantity cannot be null")
    @Min(value = 1, message = "Product quantity must be at least 1")
    private int productQuantity;

    @NotNull(message = "Product revenue cannot be null")
    private BigDecimal productRevenue;

    private boolean isDeleted = false;

    public Long getDetailId() {
        return detailId;
    }

    public void setDetailId(Long detailId) {
        this.detailId = detailId;
    }

    public SalesReport getSalesReport() {
        return salesReport;
    }

    public void setSalesReport(SalesReport salesReport) {
        this.salesReport = salesReport;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
