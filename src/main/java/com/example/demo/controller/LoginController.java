package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.service.LoginService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // Thêm port của frontend vào đây
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        String token = authService.authenticateUser(request);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
