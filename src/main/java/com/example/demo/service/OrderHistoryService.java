//package com.example.demo.service;
//
//import com.example.demo.dto.OrderHistoryRequest;
//import com.example.demo.entity.Order;
//import com.example.demo.entity.OrderHistory;
//import com.example.demo.entity.Product;
//import com.example.demo.entity.User;
//import com.example.demo.repository.OrderHistoryRepository;
//import com.example.demo.repository.OrderRepository;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class OrderHistoryService {
//
//    @Autowired
//    private OrderHistoryRepository orderHistoryRepository;
//
//    @Autowired
//    private OrderRepository orderRepository;
//
//    // Tạo mới lịch sử đơn hàng
//    public OrderHistoryRequest createOrderHistory(OrderHistoryRequest dto) {
//        Order order = orderRepository.findById(dto.getOrderId())
//                .orElseThrow(() -> new RuntimeException("Order not found with id = " + dto.getOrderId()));
//        OrderHistory history = new OrderHistory();
//        history.setOrder(order);
//        history.setStatus(dto.getStatus());
//        history.setNote(dto.getNote());
//        history.setUpdateTime(LocalDateTime.now());
//        history.setDeleted(dto.isDeleted());
//
//        OrderHistory saved = orderHistoryRepository.save(history);
//        return buildDetailedDto(saved);
//    }
//
//    // Lấy tất cả lịch sử đơn hàng (chi tiết)
//    @Transactional
//    public List<OrderHistoryRequest> getAllOrderHistories() {
//        return orderHistoryRepository.findAll()
//                .stream()
//                .map(this::buildDetailedDto)
//                .collect(Collectors.toList());
//    }
//
//    // Lấy lịch sử đơn hàng theo ID (chi tiết)
//    @Transactional
//    public OrderHistoryRequest getOrderHistoryById(Long id) {
//        OrderHistory history = orderHistoryRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("OrderHistory not found with id = " + id));
//        return buildDetailedDto(history);
//    }
//
//    // Cập nhật lịch sử đơn hàng
//    public OrderHistoryRequest updateOrderHistory(Long id, OrderHistoryRequest dto) {
//        OrderHistory history = orderHistoryRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("OrderHistory not found with id = " + id));
//        if (dto.getOrderId() != null) {
//            Order order = orderRepository.findById(dto.getOrderId())
//                    .orElseThrow(() -> new RuntimeException("Order not found with id = " + dto.getOrderId()));
//            history.setOrder(order);
//        }
//        history.setStatus(dto.getStatus());
//        history.setNote(dto.getNote());
//        history.setUpdateTime(LocalDateTime.now());
//        history.setDeleted(dto.isDeleted());
//
//        OrderHistory updated = orderHistoryRepository.save(history);
//        return buildDetailedDto(updated);
//    }
//
//    // Xóa lịch sử đơn hàng
//    public void deleteOrderHistory(Long id) {
//        if (!orderHistoryRepository.existsById(id)) {
//            throw new RuntimeException("OrderHistory not found with id = " + id);
//        }
//        orderHistoryRepository.deleteById(id);
//    }
//
//    // Xây dựng DTO chi tiết cho OrderHistory (gom các thông tin đơn hàng, khách hàng và sản phẩm)
//    private OrderHistoryRequest buildDetailedDto(OrderHistory history) {
//        OrderHistoryRequest dto = new OrderHistoryRequest();
//        dto.setOrderHistoryId(history.getOrderHistoryId());
//        dto.setOrderId(history.getOrder().getOrderId());
//        dto.setStatus(history.getStatus());
//        dto.setNote(history.getNote());
//        dto.setUpdateTime(history.getUpdateTime());
//        dto.setDeleted(history.isDeleted());
//
//        // Thông tin đơn hàng
//        Order order = history.getOrder();
//        dto.setTotalPrice(order.getTotalPrice());
//        dto.setDiscountAmount(order.getDiscountAmount());
//        dto.setOrderStatus(order.getOrderStatus().name());
//
//        // Thông tin khách hàng
//        User customer = order.getCustomer();
//        dto.setCustomerId(customer.getId());
//        dto.setCustomerName(customer.getUserName());
//        dto.setCustomerEmail(customer.getEmail());
//
//        // Lấy danh sách sản phẩm đã mua trong đơn (OrderItem)
//        List<OrderHistoryRequest.OrderItemInfo> items = order.getOrderItems().stream().map(oi -> {
//            OrderHistoryRequest.OrderItemInfo info = new OrderHistoryRequest.OrderItemInfo();
//            info.setOrderItemId(oi.getOrderItemId());
//            info.setQuantity(oi.getQuantity());
//            info.setUnitPrice(oi.getUnitPrice());
//            info.setDiscountAmount(oi.getDiscountAmount());
//            info.setDeleted(oi.isDeleted());
//            Product p = oi.getProduct();
//            info.setProductId(p.getProductId());
//            info.setProductName(p.getProductName());
//            info.setCategory(p.getCategory());
//            info.setProductPrice(p.getPrice());
//            return info;
//        }).collect(Collectors.toList());
//        dto.setOrderItems(items);
//
//        return dto;
//    }
//}
