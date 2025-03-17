package com.example.demo.repository;


import com.example.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findAllByIsDeletedFalse();
    List<OrderItem> findByOrderOrderIdAndIsDeletedFalse(Long orderId);
    List<OrderItem> findByProductProductIdAndIsDeletedFalse(Long productId);
    Optional<OrderItem> findByOrderItemIdAndIsDeletedFalse(Long orderItemId);

}
