package com.example.demo.controller;


import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Lấy tất cả user

    @GetMapping
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }


    // Lấy user theo ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Sửa user

    @PutMapping("/{id}")
    public ResponseEntity<User> updateProduct(@PathVariable long id, @Valid @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.updateUserProfile(id, userRequest));
    }

    // Xóa user


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted user with ID: " + id);
    }
}