package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class PaymentDetailsRequest {

    private Long orderId;
    private String paymentMethod;
    private String paymentStatus; // Nếu null thì trả về "Pending"
    private String transactionId;

    // Getter and Setter

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
