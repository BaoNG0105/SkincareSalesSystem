package com.example.demo.dto;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public class RatingFeedbackRequest {



    @NotNull
    private long userId;

    @NotNull
    private long productId;

    @NotNull
    @Min(1)
    @Max(5)
    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
