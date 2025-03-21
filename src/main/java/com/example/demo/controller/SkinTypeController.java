package com.example.demo.controller;

import com.example.demo.entity.SalesReportDetail;
import com.example.demo.entity.SkinType;
import com.example.demo.dto.SkinTypeRequest;
import com.example.demo.service.SkinTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/skin-types")
public class SkinTypeController {

    @Autowired
    private SkinTypeService skinTypeService;

    @PostMapping
    public ResponseEntity<SkinType> createSkinType(@Valid @RequestBody SkinTypeRequest skinTypeRequest) {
        return ResponseEntity.ok(skinTypeService.createSkinType(skinTypeRequest));
    }

    @GetMapping
    public ResponseEntity<List<SkinType>> getAllSkinTypes() {
        return ResponseEntity.ok(skinTypeService.getAllSkinTypes());
    }

    @GetMapping("/{skinTypeId}")
    public ResponseEntity<SkinType> getSkinTypeById(@PathVariable long skinTypeId) {
        return ResponseEntity.ok(skinTypeService.getSkinTypeById(skinTypeId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkinType(@PathVariable long id) {
        skinTypeService.deleteSkinType(id);
        return ResponseEntity.ok("Deleted skin type with ID: " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkinType> updateSkinType(@PathVariable long id, @Valid @RequestBody SkinTypeRequest skinTypeRequest) {
        return ResponseEntity.ok(skinTypeService.updateSkinType(id, skinTypeRequest));
    }
}
