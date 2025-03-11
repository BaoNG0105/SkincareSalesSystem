package com.example.demo.controller;

import com.example.demo.dto.OrderRequest;
import com.example.demo.dto.RecommendedProductDTO;
import com.example.demo.entity.Order;
import com.example.demo.entity.RecommendedProduct;
import com.example.demo.service.OrderService;
import com.example.demo.service.RecommendedProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(order);
    }

    // Retrieve all RecommendedProducts that are not deleted
    @GetMapping
//    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_USER')")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // Retrieve a RecommendedProduct by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    // Retrieve RecommendedProducts by both Product ID and SkinType ID
    @GetMapping("/filter")
    public ResponseEntity<List<Order>> getRecommendedProductsByProductIdAndSkinTypeId(
            @RequestParam Long userId,
            @RequestParam Long cancellationPolicyId) {
        List<Order> orders = orderService.getOrdersByUserIdAndCancellationPolicyId(userId, cancellationPolicyId);
        return ResponseEntity.ok(orders);
    }

    // Soft delete a RecommendedProduct by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("RecommendedProduct with ID " + id + " has been deleted.");
    }
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderRequest orderRequest) {
        Order updatedOrder = orderService.updateOrder(id, orderRequest);
        return ResponseEntity.ok(updatedOrder);
    }
}
