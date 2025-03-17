package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.utils.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByIsDeletedFalse();
    List<Order> findByCustomer_IdAndIsDeletedFalse(Long customerId);
    Optional<Order> findByOrderIdAndIsDeletedFalse(Long orderId);
    List<Order> findByOrderStatusAndIsDeletedFalse(OrderStatus orderStatus);
}
