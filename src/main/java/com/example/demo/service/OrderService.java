package com.example.demo.service;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.RecommendedProduct;
import com.example.demo.entity.User;
import com.example.demo.entity.CancellationPolicy;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.CancellationPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CancellationPolicyRepository cancellationPolicyRepository;

    // Lấy tất cả đơn hàng chưa bị xóa
    public List<Order> getAllOrders() {
        return orderRepository.findAllByIsDeletedFalse();
    }

    // Lấy đơn hàng theo ID
    public Order getOrderById(Long orderId) {
        return orderRepository.findByOrderIdAndIsDeletedFalse(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }



    // Lấy đơn hàng theo ID khách hàng
    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomer_IdAndIsDeletedFalse(customerId);
    }

    // Lấy đơn hàng theo trạng thái
    public List<Order> getOrdersByStatus(String orderStatus) {
        return orderRepository.findByOrderStatusAndIsDeletedFalse(orderStatus);
    }

    public List<Order> getOrdersByUserIdAndCancellationPolicyId(Long userId, Long cancellationPolicyId) {

        List<Order> orders = orderRepository.findByCustomer_IdAndIsDeletedFalse(userId);

        return orders.stream()
                .filter(s -> s.getCancellationPolicy().getPolicyId().equals(cancellationPolicyId))
                .toList();

    }

    // Tạo mới đơn hàng
    public Order createOrder(OrderRequest orderRequest) {
        User customer = userRepository.findById(orderRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        CancellationPolicy policy = null;
        if (orderRequest.getCancellationPolicyId() != null) {
            policy = cancellationPolicyRepository.findById(orderRequest.getCancellationPolicyId())
                    .orElseThrow(() -> new RuntimeException("Cancellation Policy not found"));
        }

        Order order = Order.builder()
                .customer(customer)
                .totalPrice(orderRequest.getTotalPrice())
                .cancellationPolicy(policy)
                .discountAmount(orderRequest.getDiscountAmount() != null ? orderRequest.getDiscountAmount() : BigDecimal.ZERO)
                .build();

        return orderRepository.save(order);
    }

    // Cập nhật đơn hàng
    public Order updateOrder(Long orderId, OrderRequest orderRequest) {
        Order order = orderRepository.findByOrderIdAndIsDeletedFalse(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (orderRequest.getTotalPrice() != null) {
            order.setTotalPrice(orderRequest.getTotalPrice());
        }

        if (orderRequest.getDiscountAmount() != null) {
            order.setDiscountAmount(orderRequest.getDiscountAmount());
        }

        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // Xóa đơn hàng (chuyển isDeleted thành true)
    public Order deleteOrder(Long orderId) {
        Order order = orderRepository.findByOrderIdAndIsDeletedFalse(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setDeleted(true);
        return orderRepository.save(order);
    }
}
