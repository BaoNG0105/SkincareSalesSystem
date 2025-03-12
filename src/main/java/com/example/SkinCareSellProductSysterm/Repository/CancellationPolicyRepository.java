package com.example.SkinCareSellProductSysterm.Repository;

import com.example.SkinCareSellProductSysterm.Entity.CancellationPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CancellationPolicyRepository extends JpaRepository<CancellationPolicy, Long> {
    List<CancellationPolicy> findByIsDeletedFalse();
    Optional<CancellationPolicy> findByPolicyIdAndIsDeletedFalse(Long id);
}
