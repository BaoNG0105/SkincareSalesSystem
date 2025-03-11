package com.example.demo.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemRequest {

    private Long orderItemId;
    private Long orderId;
    private Long productId;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal discountAmount;
    private boolean isDeleted;

}
