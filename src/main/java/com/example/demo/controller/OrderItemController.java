package com.example.demo.controller;

import com.example.demo.dto.OrderItemRequest;
import com.example.demo.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public OrderItemRequest createOrderItem(@RequestBody OrderItemRequest request) {
        return orderItemService.createOrderItem(request);
    }

    @GetMapping
    public List<OrderItemRequest> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public OrderItemRequest getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }

    @PutMapping("/{id}")
    public OrderItemRequest updateOrderItem(@PathVariable Long id, @RequestBody OrderItemRequest request) {
        return orderItemService.updateOrderItem(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
    }
}
