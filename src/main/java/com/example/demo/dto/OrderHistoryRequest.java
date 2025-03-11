package com.example.demo.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderHistoryRequest {

    private Long orderHistoryId;
    private Long orderId;
    private String status;
    private String note;
    private LocalDateTime updateTime;
    private boolean isDeleted;

    // Thông tin đơn hàng
    private BigDecimal totalPrice;
    private BigDecimal discountAmount;
    private String orderStatus;

    // Thông tin khách hàng
    private Long customerId;
    private String customerName;
    private String customerEmail;

    // Danh sách các sản phẩm đã mua (OrderItem)
    private List<OrderItemInfo> orderItems;

    @Data
    public static class OrderItemInfo {
        private Long orderItemId;
        private int quantity;
        private BigDecimal unitPrice;
        private BigDecimal discountAmount;
        private boolean isDeleted;

        // Thông tin sản phẩm
        private Long productId;
        private String productName;
        private String category;
        private double productPrice;
    }

}
