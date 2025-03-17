package com.example.demo.mapper;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.utils.OrderStatus;
import org.modelmapper.PropertyMap;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderMapper extends PropertyMap<OrderRequest, Order> {
    @Override
    protected void configure() {
        map().setCreatedAt(LocalDateTime.now());
        map().setTotalPrice(BigDecimal.ZERO);
        map().setOrderStatus(OrderStatus.PENDING);
    }
}
