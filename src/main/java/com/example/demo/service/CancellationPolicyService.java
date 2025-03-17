package com.example.demo.service;

import com.example.demo.entity.CancellationPolicy;
import com.example.demo.dto.CancellationPolicyRequest;
import com.example.demo.entity.SkinType;
import com.example.demo.repository.CancellationPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CancellationPolicyService {
    @Autowired
    private CancellationPolicyRepository cancellationPolicyRepository;

    public CancellationPolicy createCancellationPolicy(CancellationPolicyRequest request) {
        CancellationPolicy policy = new CancellationPolicy();
        policy.setPolicyName(request.getPolicyName());
        policy.setDescription(request.getDescription());
        policy.setApplicableDays(request.getApplicableDays());
        policy.setPolicyType(request.getPolicyType());
        return cancellationPolicyRepository.save(policy);
    }

    public List<CancellationPolicy> getAllCancellationPolicies() {
        return cancellationPolicyRepository.findByIsDeletedFalse();
    }

    public CancellationPolicy deleteCancellationPolicy(long id) {
        Optional<CancellationPolicy> policyOpt = cancellationPolicyRepository.findByPolicyIdAndIsDeletedFalse(id);
        if (policyOpt.isEmpty()) {
            throw new RuntimeException("Cancellation policy not found with ID: " + id);
        }
        CancellationPolicy policy = policyOpt.get();
        policy.setDeleted(true);
        return cancellationPolicyRepository.save(policy);
    }

    public CancellationPolicy updateCancellationPolicy(long id, CancellationPolicyRequest request) {
        CancellationPolicy policy = cancellationPolicyRepository.findByPolicyIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Cancellation policy not found with ID: " + id));

        policy.setPolicyName(request.getPolicyName());
        policy.setDescription(request.getDescription());
        policy.setApplicableDays(request.getApplicableDays());
        policy.setPolicyType(request.getPolicyType());

        return cancellationPolicyRepository.save(policy);
    }

    public CancellationPolicy getCancellationPolicyById(long cancellationPolicyId) {
        return cancellationPolicyRepository.findByPolicyIdAndIsDeletedFalse(cancellationPolicyId)
                .orElseThrow(() -> new RuntimeException("CancellationPolicy not found"));
    }
}
