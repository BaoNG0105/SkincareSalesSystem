package com.example.demo.dto;


import com.example.demo.entity.User;
import com.example.demo.utils.OrderStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderRequest {

    @NotNull
    private Long userId;
    private BigDecimal totalPrice;





    // Getter and Setter


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
