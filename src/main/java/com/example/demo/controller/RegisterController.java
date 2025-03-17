package com.example.demo.controller;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // Thêm port của frontend vào đây
@RestController
@RequestMapping("/api/auth/")
public class RegisterController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequest registerRequest) {
        User newUser = userService.registerUser(registerRequest);
        return ResponseEntity.ok(newUser);
    }


}
