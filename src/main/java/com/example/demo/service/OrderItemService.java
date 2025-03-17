package com.example.demo.service;

import com.example.demo.dto.OrderItemRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.Product;
import com.example.demo.entity.RatingFeedback;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    // Tạo mới OrderItem
    public OrderItem createOrderItem(OrderItemRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id = " + request.getOrderId()));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id = " + request.getProductId()));

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(request.getQuantity());
        orderItem.setUnitPrice(request.getUnitPrice());
        orderItem.setDiscountAmount(request.getDiscountAmount());

        return orderItemRepository.save(orderItem);
    }

    // Lấy danh sách tất cả OrderItem
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAllByIsDeletedFalse();
    }

    // Lấy OrderItem theo ID
    public OrderItem getOrderItemById(Long id) {
        OrderItem orderItem = orderItemRepository.findByOrderItemIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id = " + id));
        return orderItem;
    }

    // Cập nhật OrderItem
    public OrderItem updateOrderItem(Long id, OrderItemRequest request) {
        OrderItem orderItem = orderItemRepository.findByOrderItemIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id = " + id));

        if (request.getOrderId() != null) {
            Order order = orderRepository.findByOrderIdAndIsDeletedFalse(request.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id = " + request.getOrderId()));
            orderItem.setOrder(order);
        }
        if (request.getProductId() != null) {
            Product product = productRepository.findByProductIdAndStatusTrue(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id = " + request.getProductId()));
            orderItem.setProduct(product);
        }
        orderItem.setQuantity(request.getQuantity());
        orderItem.setUnitPrice(request.getUnitPrice());
        orderItem.setDiscountAmount(request.getDiscountAmount());

        OrderItem updated = orderItemRepository.save(orderItem);
        return orderItemRepository.save(orderItem);
    }

    // Xóa OrderItem
    public OrderItem deleteOrderItem(Long id) {
        OrderItem orderItem = orderItemRepository.findByOrderItemIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id = " + id));
        orderItem.setDeleted(true);
        return orderItemRepository.save(orderItem);
    }
    public List<OrderItem> getOrderItemByOrderId(Long orderId) {

        List<OrderItem> orderItems = orderItemRepository.findByOrderOrderIdAndIsDeletedFalse(orderId);
        return orderItems;
    }

    public List<OrderItem> getOrderItemByProductId(Long productId) {

        List<OrderItem> orderItems = orderItemRepository.findByProductProductIdAndIsDeletedFalse(productId);
        return orderItems;
    }

    // Ch
}
