package com.example.demo.service;

import com.example.demo.dto.RecommendedProductRequest;
import com.example.demo.entity.Product;
import com.example.demo.entity.RecommendedProduct;
import com.example.demo.entity.SkinType;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.RecommendedProductRepository;
import com.example.demo.repository.SkinTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendedProductService {

    @Autowired
    private RecommendedProductRepository recommendedProductRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SkinTypeRepository skinTypeRepository;

    // Create a new RecommendedProduct
    public RecommendedProduct createRecommendedProduct(RecommendedProductRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id " + request.getProductId()));

        SkinType skinType = skinTypeRepository.findById(request.getSkinTypeId())
                .orElseThrow(() -> new RuntimeException("SkinType not found with id " + request.getSkinTypeId()));

        RecommendedProduct recommendedProduct = new RecommendedProduct();
        recommendedProduct.setProduct(product);
        recommendedProduct.setSkinType(skinType);
        recommendedProduct.setRecommendationReason(request.getRecommendationReason());

        return recommendedProductRepository.save(recommendedProduct);
    }

    // Retrieve a RecommendedProduct by its id (only if not deleted)
    public Optional<RecommendedProduct> getRecommendedProductById(Long id) {
        return recommendedProductRepository.findByRecommendationIdAndIsDeletedFalse(id);
    }


    // Retrieve all RecommendedProducts (only active ones)
    public List<RecommendedProduct> getAllRecommendedProducts() {
        return recommendedProductRepository.findByIsDeletedFalse();
    }

    // Retrieve all RecommendedProducts associated with a given Product id
//    public List<RecommendedProduct> getRecommendedProductsByProductId(Long productId) {
//        return recommendedProductRepository.findAllByProduct_ProductIdAndIsDeletedFalse(productId);
//    }
//
//    // Retrieve all RecommendedProducts associated with a given SkinType id
//    public List<RecommendedProduct> getRecommendedProductsBySkinTypeId(Long skinTypeId) {
//        return recommendedProductRepository.findAllBySkinType_SkinTypeIdAndIsDeletedFalse(skinTypeId);
//    }

    public List<RecommendedProduct> getRecommendedProductsByProductIdAndSkinTypeId(Long productId, Long skinTypeId) {

        List<RecommendedProduct> productList = recommendedProductRepository.findAllByProduct_ProductIdAndIsDeletedFalse(productId);

        return productList.stream()
                .filter(s -> s.getSkinType().getSkinTypeId().equals(skinTypeId))
                .toList();

    }

    public List<RecommendedProduct> getRecommendedProductsBySkinTypeId(Long skinTypeId) {

        List<RecommendedProduct> productList = recommendedProductRepository.findAllBySkinType_SkinTypeIdAndIsDeletedFalse(skinTypeId);

        return productList;

    }

    public RecommendedProduct updateRecommendedProduct(Long id, RecommendedProductRequest request) {
        RecommendedProduct existing = recommendedProductRepository.findByRecommendationIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("RecommendedProduct not found with id " + id));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id " + request.getProductId()));

        SkinType skinType = skinTypeRepository.findById(request.getSkinTypeId())
                .orElseThrow(() -> new RuntimeException("SkinType not found with id " + request.getSkinTypeId()));
//
//        existing.setProduct(product);
//        existing.setSkinType(skinType);
        existing.setRecommendationReason(request.getRecommendationReason());

        return recommendedProductRepository.save(existing);
    }

    // Soft delete a RecommendedProduct
    public void deleteRecommendedProduct(Long id) {
        RecommendedProduct existing = recommendedProductRepository.findByRecommendationIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("RecommendedProduct not found with id " + id));
        existing.setDeleted(true);
        recommendedProductRepository.save(existing);
    }


}

