package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.dto.ProductRequest;
import com.example.demo.entity.SkinType;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(ProductRequest productRequest){
        Product product = new Product();
        product.setProductName(productRequest.getProductName());
        product.setDescription(productRequest.getDescription());
        product.setCategory(productRequest.getCategory());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setImage(productRequest.getImage());

        return productRepository.save(product);
    }

    public List<Product> getAllProduct(){return productRepository.findByStatusTrue();}

    public Product getProductById(long productId) {
        return productRepository.findByProductIdAndStatusTrue(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product delete(long id){
        Optional<Product> productOpt = productRepository.findByProductIdAndStatusTrue(id);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        Product product = productOpt.get();
        product.setStatus(false);
        return productRepository.save(product);
    }

    public Product updateProduct(long id, ProductRequest productRequest) {
        Product product = productRepository.findByProductIdAndStatusTrue(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        product.setProductName(productRequest.getProductName());
        product.setDescription(productRequest.getDescription());
        product.setCategory(productRequest.getCategory());
        product.setPrice(productRequest.getPrice());
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setImage(productRequest.getImage());
        product.setUpdateAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    public Product updateStockQuantity(long id,int quantity){
        Product product = productRepository.findByProductIdAndStatusTrue(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        if (product.getStockQuantity() - quantity > 0){
            product.setStockQuantity(product.getStockQuantity() - quantity);
            product.setUpdateAt(LocalDateTime.now());
        }
        return productRepository.save(product);
    }



}
