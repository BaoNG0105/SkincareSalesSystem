package com.example.demo.controller;

import com.example.demo.dto.RecommendedProductDTO;
import com.example.demo.entity.RecommendedProduct;
import com.example.demo.service.RecommendedProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/recommended-products")
public class RecommendedProductController {

    @Autowired
    private RecommendedProductService recommendedProductService;

    // Create a new RecommendedProduct
    @PostMapping
    public ResponseEntity<RecommendedProduct> createRecommendedProduct(@Valid @RequestBody RecommendedProductDTO recommendedProductDTO) {
        RecommendedProduct recommendedProduct = recommendedProductService.createRecommendedProduct(recommendedProductDTO);
        return ResponseEntity.ok(recommendedProduct);
    }

    // Retrieve all RecommendedProducts that are not deleted
    @GetMapping
    public ResponseEntity<List<RecommendedProduct>> getAllRecommendedProducts() {
        List<RecommendedProduct> recommendedProducts = recommendedProductService.getAllRecommendedProducts();
        return ResponseEntity.ok(recommendedProducts);
    }

    // Retrieve a RecommendedProduct by its ID
    @GetMapping("/{id}")
    public ResponseEntity<RecommendedProduct> getRecommendedProductById(@PathVariable Long id) {
        RecommendedProduct recommendedProduct = recommendedProductService.getRecommendedProductById(id)
                .orElseThrow(() -> new RuntimeException("RecommendedProduct not found with id " + id));
        return ResponseEntity.ok(recommendedProduct);
    }

    @GetMapping("/skin-type-id/{id}")
    public ResponseEntity<List<RecommendedProduct>> getRecommendedProductBySkinTypeId(@PathVariable Long id) {
        List<RecommendedProduct> recommendedProducts = recommendedProductService.getRecommendedProductsBySkinTypeId(id);
        return ResponseEntity.ok(recommendedProducts);
    }

    // Retrieve RecommendedProducts by both Product ID and SkinType ID
    @GetMapping("/filter")
    public ResponseEntity<List<RecommendedProduct>> getRecommendedProductsByProductIdAndSkinTypeId(
            @RequestParam Long productId,
            @RequestParam Long skinTypeId) {
        List<RecommendedProduct> recommendedProducts = recommendedProductService.getRecommendedProductsByProductIdAndSkinTypeId(productId, skinTypeId);
        return ResponseEntity.ok(recommendedProducts);
    }

    // Soft delete a RecommendedProduct by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecommendedProduct(@PathVariable Long id) {
        recommendedProductService.deleteRecommendedProduct(id);
        return ResponseEntity.ok("RecommendedProduct with ID " + id + " has been deleted.");
    }
    @PutMapping("/{id}")
    public ResponseEntity<RecommendedProduct> updateRecommendedProduct(
            @PathVariable Long id,
            @Valid @RequestBody RecommendedProductDTO recommendedProductDTO) {
        RecommendedProduct updatedRecommendedProduct = recommendedProductService.updateRecommendedProduct(id, recommendedProductDTO);
        return ResponseEntity.ok(updatedRecommendedProduct);
    }
}
