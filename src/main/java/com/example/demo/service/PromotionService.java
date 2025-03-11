package com.example.demo.service;

import com.example.demo.entity.Promotion;
import com.example.demo.dto.PromotionRequest;
import com.example.demo.entity.SkinType;
import com.example.demo.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    public Promotion createPromotion(PromotionRequest promotionRequest) {
        Promotion promotion = new Promotion();
        promotion.setCode(promotionRequest.getCode());
        promotion.setDescription(promotionRequest.getDescription());
        promotion.setDiscountPercentage(promotionRequest.getDiscountPercentage());
        promotion.setStartDate(promotionRequest.getStartDate());
        promotion.setEndDate(promotionRequest.getEndDate());
        promotion.setMinimumOrderValue(promotionRequest.getMinimumOrderValue());
        return promotionRepository.save(promotion);
    }

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findByAvailableTrue();
    }

    public Promotion deletePromotion(long id) {
        Optional<Promotion> promotionOpt = promotionRepository.findByPromotionIdAndAvailableTrue(id);
        if (promotionOpt.isEmpty()) {
            throw new RuntimeException("Promotion not found with ID: " + id);
        }
        Promotion promotion = promotionOpt.get();
        promotion.setAvailable(false);
        return promotionRepository.save(promotion);
    }

    public Promotion updatePromotion(long id, PromotionRequest promotionRequest) {
        Promotion promotion = promotionRepository.findByPromotionIdAndAvailableTrue(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found with ID: " + id));

        promotion.setCode(promotionRequest.getCode());
        promotion.setDescription(promotionRequest.getDescription());
        promotion.setDiscountPercentage(promotionRequest.getDiscountPercentage());
        promotion.setStartDate(promotionRequest.getStartDate());
        promotion.setEndDate(promotionRequest.getEndDate());
        promotion.setMinimumOrderValue(promotionRequest.getMinimumOrderValue());

        return promotionRepository.save(promotion);
    }

    public Promotion getPromotionById(long promotionId) {
        return promotionRepository.findByPromotionIdAndAvailableTrue(promotionId)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
    }
}
