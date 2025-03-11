package com.example.demo.service;

import com.example.demo.dto.PaymentDetailsRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.PaymentDetails;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.PaymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentDetailsService {

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Tạo mới PaymentDetails
    public PaymentDetails createPaymentDetails(PaymentDetailsRequest request) {
        // Lấy Order theo id (bắt buộc)
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

        // Khởi tạo PaymentDetails và gán giá trị qua setter
        PaymentDetails pd = new PaymentDetails();
        pd.setOrder(order);
        pd.setPaymentMethod(request.getPaymentMethod());
        pd.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        pd.setTransactionId(request.getTransactionId());
        pd.setPaymentDate(LocalDateTime.now()); // Gán thời gian thanh toán
        pd.setIsDeleted(false);

        return paymentDetailsRepository.save(pd);
    }

    // Lấy PaymentDetails theo id (chỉ lấy các bản ghi chưa bị xóa mềm)
    public PaymentDetails getPaymentDetailsById(Long id) {
        PaymentDetails pd = paymentDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PaymentDetails not found with id: " + id));
        if (pd.isDeleted()) {
            throw new RuntimeException("PaymentDetails with id: " + id + " is deleted.");
        }
        return pd;
    }

    // Cập nhật PaymentDetails theo id
    public PaymentDetails updatePaymentDetails(Long id, PaymentDetailsRequest request) {
        PaymentDetails pd = getPaymentDetailsById(id);

        // Lấy Order theo id
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
        pd.setOrder(order);

        pd.setPaymentMethod(request.getPaymentMethod());
        pd.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        pd.setTransactionId(request.getTransactionId());
        pd.setPaymentDate(LocalDateTime.now()); // Cập nhật lại thời gian thanh toán

        return paymentDetailsRepository.save(pd);
    }

    // Xóa mềm (soft delete) PaymentDetails theo id
    public void softDeletePaymentDetails(Long id) {
        PaymentDetails pd = getPaymentDetailsById(id);
        pd.setIsDeleted(true);
        paymentDetailsRepository.save(pd);
    }

    // Xóa hoàn toàn (hard delete) PaymentDetails khỏi database theo id
    public void permanentDeletePaymentDetails(Long id) {
        PaymentDetails pd = paymentDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PaymentDetails not found with id: " + id));
        paymentDetailsRepository.delete(pd);
    }
}