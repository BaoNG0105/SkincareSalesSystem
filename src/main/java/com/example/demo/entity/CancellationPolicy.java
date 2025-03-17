package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cancellation_policies")
public class CancellationPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long policyId;

    @NotNull(message = "Policy name cannot be null")
    @Size(max = 255, message = "Policy name must be at most 255 characters")
    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(name = "description")
    private String description;

    @NotNull(message = "Applicable days cannot be null")
    @Min(value = 1, message = "Applicable days must be greater than 0")
    @Column(name = "applicable_days", nullable = false)
    private int applicableDays;

    @NotNull(message = "Policy type cannot be null")
    @Size(max = 50, message = "Policy type must be at most 50 characters")
    @Column(name = "policy_type", nullable = false, length = 50)
    private String policyType = "Refund";

    private boolean isDeleted = false;


//    @OneToMany(mappedBy = "cancellationPolicy")
//    private List<Order> orders;

    public Long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getApplicableDays() {
        return applicableDays;
    }

    public void setApplicableDays(int applicableDays) {
        this.applicableDays = applicableDays;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
