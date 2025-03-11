package com.example.demo.service;

import com.example.demo.dto.OrderItemRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.Product;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
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
    public OrderItemRequest createOrderItem(OrderItemRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id = " + request.getOrderId()));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id = " + request.getProductId()));

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(request.getQuantity());
        orderItem.setUnitPrice(request.getUnitPrice() != null ? request.getUnitPrice() : BigDecimal.ZERO);
        orderItem.setDiscountAmount(request.getDiscountAmount() != null ? request.getDiscountAmount() : BigDecimal.ZERO);
        orderItem.setDeleted(request.isDeleted());

        OrderItem saved = orderItemRepository.save(orderItem);
        return entityToRequest(saved);
    }

    // Lấy danh sách tất cả OrderItem
    public List<OrderItemRequest> getAllOrderItems() {
        return orderItemRepository.findAll()
                .stream()
                .map(this::entityToRequest)
                .collect(Collectors.toList());
    }

    // Lấy OrderItem theo ID
    public OrderItemRequest getOrderItemById(Long id) {
        OrderItem orderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id = " + id));
        return entityToRequest(orderItem);
    }

    // Cập nhật OrderItem
    public OrderItemRequest updateOrderItem(Long id, OrderItemRequest request) {
        OrderItem orderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id = " + id));

        if (request.getOrderId() != null) {
            Order order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id = " + request.getOrderId()));
            orderItem.setOrder(order);
        }
        if (request.getProductId() != null) {
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id = " + request.getProductId()));
            orderItem.setProduct(product);
        }
        orderItem.setQuantity(request.getQuantity());
        orderItem.setUnitPrice(request.getUnitPrice() != null ? request.getUnitPrice() : BigDecimal.ZERO);
        orderItem.setDiscountAmount(request.getDiscountAmount() != null ? request.getDiscountAmount() : BigDecimal.ZERO);
        orderItem.setDeleted(request.isDeleted());

        OrderItem updated = orderItemRepository.save(orderItem);
        return entityToRequest(updated);
    }

    // Xóa OrderItem
    public void deleteOrderItem(Long id) {
        if (!orderItemRepository.existsById(id)) {
            throw new RuntimeException("OrderItem not found with id = " + id);
        }
        orderItemRepository.deleteById(id);
    }

    // Chuyển đổi entity sang OrderItemRequest DTO
    private OrderItemRequest entityToRequest(OrderItem entity) {
        OrderItemRequest request = new OrderItemRequest();
        request.setOrderItemId(entity.getOrderItemId());
        request.setOrderId(entity.getOrder().getOrderId());
        request.setProductId(entity.getProduct().getProductId());
        request.setQuantity(entity.getQuantity());
        request.setUnitPrice(entity.getUnitPrice());
        request.setDiscountAmount(entity.getDiscountAmount());
        request.setDeleted(entity.isDeleted());
        return request;
    }
}
