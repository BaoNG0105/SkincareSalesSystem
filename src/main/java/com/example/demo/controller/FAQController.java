package com.example.demo.controller;

import com.example.demo.entity.FAQ;
import com.example.demo.dto.FAQRequest;
import com.example.demo.entity.Product;
import com.example.demo.service.FAQService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/faq")
public class FAQController {
    @Autowired
    FAQService faqService;

    @PostMapping
    public ResponseEntity<FAQ> createFAQ(@Valid @RequestBody FAQRequest faqRequest){
        return ResponseEntity.ok(faqService.createFAQ(faqRequest));
    }

    @GetMapping
    public ResponseEntity<List<FAQ>> getAllFAQ(){
        return ResponseEntity.ok(faqService.getAllFAQ());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FAQ> getFAQById(@PathVariable long id) {
        return ResponseEntity.ok(faqService.getFAQById(id));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<FAQ>> getFAQsByProductId(@PathVariable long productId){
        return ResponseEntity.ok(faqService.getFAQsByProductId(productId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
        faqService.delete(id);
        return ResponseEntity.ok("Deleted product with ID: " + id);
    }



}
