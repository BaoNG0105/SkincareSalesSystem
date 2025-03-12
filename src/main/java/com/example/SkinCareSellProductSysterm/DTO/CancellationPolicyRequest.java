package com.example.SkinCareSellProductSysterm.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CancellationPolicyRequest {

    @NotNull(message = "Policy name cannot be null")
    @Size(max = 255, message = "Policy name must be at most 255 characters")
    private String policyName;

    private String description;

    @NotNull(message = "Applicable days cannot be null")
    @Min(value = 1, message = "Applicable days must be greater than 0")
    private int applicableDays;

    @NotNull(message = "Policy type cannot be null")
    @Size(max = 50, message = "Policy type must be at most 50 characters")
    private String policyType = "Refund";

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
}
