package com.example.demo.dto;

import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemRequest {

    @NotNull
    private Long orderId;
    @NotNull
    private Long productId;
    @NotNull
    private int quantity;
    @NotNull
    private BigDecimal unitPrice;
    @NotNull
    private BigDecimal discountAmount;

    // Getter and Setter


}
