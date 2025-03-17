package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "promotion_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;

    // Nối với bảng promotions
    @ManyToOne
    @JoinColumn(name = "promotion_id", nullable = false)
    private Promotion promotion;

    // Nối với bảng products
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Nối với bảng orders
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "applied_date", nullable = false)
    private LocalDateTime appliedDate;

    @Column(name = "discount_amount", nullable = false, precision = 18, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "IsDeleted", nullable = false)
    private boolean isDeleted = false;


    // Getter and Setter

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
