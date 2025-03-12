package com.example.SkinCareSellProductSysterm.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FAQRequest {
    @NotNull(message = "Product ID cannot be null")
    private Long productId;
    @NotBlank(message = "Question cannot be blank")
    private String question;
    @NotBlank(message = "Answer cannot be blank")
    private String answer;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
