package com.example.demo.dto;


import java.math.BigDecimal;

public class OrderRequest {
    private Long orderId;
    private Long customerId;
    private BigDecimal totalPrice;
    private Long cancellationPolicyId;
    private BigDecimal discountAmount;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getCancellationPolicyId() {
        return cancellationPolicyId;
    }

    public void setCancellationPolicyId(Long cancellationPolicyId) {
        this.cancellationPolicyId = cancellationPolicyId;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }
}
