package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.dto.ProductRequest;
import com.example.demo.entity.Promotion;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Thêm port của frontend vào đây
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductRequest productRequest){
        return ResponseEntity.ok(productService.createProduct(productRequest));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct(){
        return ResponseEntity.ok(productService.getAllProduct());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<String> delete(@PathVariable long id){
        productService.delete(id);
        return ResponseEntity.ok("Deleted product with ID: " + id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<Product> updateProduct(@PathVariable long id, @Valid @RequestBody ProductRequest productRequest) {
        return ResponseEntity.ok(productService.updateProduct(id, productRequest));
    }

    @PutMapping("/{id}/stock-quantity")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<Product> updateStockQuantity(@PathVariable long id, int quantity){
        return ResponseEntity.ok(productService.updateStockQuantity(id, quantity));
    }


}
