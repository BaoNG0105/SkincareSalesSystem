package com.example.demo.service;

import com.example.demo.dto.PromotionApplicationRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.Promotion;
import com.example.demo.entity.PromotionApplication;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.PromotionApplicationRepository;
import com.example.demo.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PromotionApplicationService {

    @Autowired
    private PromotionApplicationRepository promotionApplicationRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Tạo mới PromotionApplication
    public PromotionApplication createPromotionApplication(PromotionApplicationRequest request) {
        // Lấy Promotion theo id (bắt buộc)
        Promotion promotion = promotionRepository.findById(request.getPromotionId())
                .orElseThrow(() -> new RuntimeException("Promotion not found with id: " + request.getPromotionId()));

        // Lấy Product nếu có
        Product product = null;
        if (request.getProductId() != null) {
            product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));
        }

        // Lấy Order nếu có
        Order order = null;
        if (request.getOrderId() != null) {
            order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
        }

        // Khởi tạo đối tượng PromotionApplication và gán các giá trị qua setter
        PromotionApplication pa = new PromotionApplication();
        pa.setPromotion(promotion);
        pa.setProduct(product);
        pa.setOrder(order);
        pa.setDiscountAmount(request.getDiscountAmount());
        pa.setAppliedDate(LocalDateTime.now()); // Gán thời gian tạo mới
        pa.setIsDeleted(false);

        return promotionApplicationRepository.save(pa);
    }

    // Lấy PromotionApplication theo id (chỉ lấy các bản ghi chưa bị xóa mềm)
    public PromotionApplication getPromotionApplicationById(Long id) {
        PromotionApplication pa = promotionApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PromotionApplication not found with id: " + id));
        if (pa.isDeleted()) {
            throw new RuntimeException("PromotionApplication with id: " + id + " is deleted.");
        }
        return pa;
    }

    // Cập nhật PromotionApplication theo id
    public PromotionApplication updatePromotionApplication(Long id, PromotionApplicationRequest request) {
        PromotionApplication pa = getPromotionApplicationById(id);

        // Cập nhật Promotion
        Promotion promotion = promotionRepository.findById(request.getPromotionId())
                .orElseThrow(() -> new RuntimeException("Promotion not found with id: " + request.getPromotionId()));
        pa.setPromotion(promotion);

        // Cập nhật Product (nếu có)
        if (request.getProductId() != null) {
            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));
            pa.setProduct(product);
        } else {
            pa.setProduct(null);
        }

        // Cập nhật Order (nếu có)
        if (request.getOrderId() != null) {
            Order order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
            pa.setOrder(order);
        } else {
            pa.setOrder(null);
        }

        pa.setDiscountAmount(request.getDiscountAmount());
        // Giữ nguyên appliedDate, nếu muốn cập nhật có thể gọi: pa.setAppliedDate(LocalDateTime.now());

        return promotionApplicationRepository.save(pa);
    }

    // Xóa mềm (soft delete) PromotionApplication theo id
    public void softDeletePromotionApplication(Long id) {
        PromotionApplication pa = getPromotionApplicationById(id);
        pa.setIsDeleted(true);
        promotionApplicationRepository.save(pa);
    }

    // Xóa hoàn toàn (hard delete) PromotionApplication khỏi database theo id
    public void permanentDeletePromotionApplication(Long id) {
        PromotionApplication pa = promotionApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PromotionApplication not found with id: " + id));
        promotionApplicationRepository.delete(pa);
    }
}
