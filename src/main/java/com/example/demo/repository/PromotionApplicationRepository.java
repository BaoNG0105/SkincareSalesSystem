package com.example.demo.repository;

import com.example.demo.entity.PromotionApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionApplicationRepository extends JpaRepository<PromotionApplication, Long> {
    // Query nếu cần
}
