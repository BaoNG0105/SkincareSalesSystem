package com.example.demo.repository;


import com.example.demo.entity.Promotion;
import com.example.demo.entity.SkinType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByAvailableTrue();
    Optional<Promotion> findByPromotionIdAndAvailableTrue(Long id);
}

