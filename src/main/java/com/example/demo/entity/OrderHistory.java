package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_history")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_history_id")
    private Long orderHistoryId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // Lưu trạng thái của đơn hàng (có thể dùng Enum nếu muốn)
    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(name = "update_time", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updateTime = LocalDateTime.now();

    @Column(name = "isDeleted", nullable = false)
    private boolean isDeleted = false;


    // Getter and Setter

    public Long getOrderHistoryId() {
        return orderHistoryId;
    }

    public void setOrderHistoryId(Long orderHistoryId) {
        this.orderHistoryId = orderHistoryId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
