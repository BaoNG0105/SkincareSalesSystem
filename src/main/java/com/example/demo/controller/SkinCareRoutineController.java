package com.example.demo.controller;

import com.example.demo.entity.SkinCareRoutine;
import com.example.demo.dto.SkinCareRoutineRequest;
import com.example.demo.entity.SkinType;
import com.example.demo.service.SkinCareRoutineService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/skin-care-routines")
@PreAuthorize("isAuthenticated()")
public class SkinCareRoutineController {

    @Autowired
    private SkinCareRoutineService skinCareRoutineService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<SkinCareRoutine> createSkinCareRoutine(@Valid @RequestBody SkinCareRoutineRequest request) {
        return ResponseEntity.ok(skinCareRoutineService.createSkinCareRoutine(request));
    }

    @GetMapping
    public ResponseEntity<List<SkinCareRoutine>> getAllSkinCareRoutines() {
        return ResponseEntity.ok(skinCareRoutineService.getAllSkinCareRoutines());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkinCareRoutine> getSkinCareRoutineById(@PathVariable long id) {
        return ResponseEntity.ok(skinCareRoutineService.getSkinCareRoutineById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<String> deleteSkinCareRoutine(@PathVariable long id) {
        skinCareRoutineService.deleteSkinCareRoutine(id);
        return ResponseEntity.ok("Deleted skin care routine with ID: " + id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<SkinCareRoutine> updateSkinCareRoutine(@PathVariable long id, @Valid @RequestBody SkinCareRoutineRequest request) {
        return ResponseEntity.ok(skinCareRoutineService.updateSkinCareRoutine(id, request));
    }

    @GetMapping("/by-skin-type/{skinTypeId}")
    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_STAFF')")

    public ResponseEntity<List<SkinCareRoutine>> getAllBySkinTypeId(@PathVariable long skinTypeId) {
        return ResponseEntity.ok(skinCareRoutineService.getAllBySkinTypeId(skinTypeId));
    }
}
