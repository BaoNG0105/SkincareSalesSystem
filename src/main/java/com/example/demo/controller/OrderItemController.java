package com.example.demo.controller;

import com.example.demo.dto.OrderItemRequest;
import com.example.demo.entity.OrderItem;
import com.example.demo.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/order-items")
@PreAuthorize("isAuthenticated()")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;


    @PostMapping
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")

    public ResponseEntity<OrderItem> createOrderItem(@RequestBody OrderItemRequest request) {
        return ResponseEntity.ok(orderItemService.createOrderItem(request));
    }

    @GetMapping
    public ResponseEntity<List<OrderItem>> getAllOrderItems() {
        return ResponseEntity.ok(orderItemService.getAllOrderItems());
    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long id) {
        return ResponseEntity.ok(orderItemService.getOrderItemById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable Long id, @RequestBody OrderItemRequest request) {
        return ResponseEntity.ok(orderItemService.updateOrderItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<OrderItem> deleteOrderItem(@PathVariable Long id) {
        return ResponseEntity.ok(orderItemService.deleteOrderItem(id));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderItemByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderItemService.getOrderItemByOrderId(orderId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<OrderItem>> getOrderItemByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(orderItemService.getOrderItemByProductId(productId));
    }
}
