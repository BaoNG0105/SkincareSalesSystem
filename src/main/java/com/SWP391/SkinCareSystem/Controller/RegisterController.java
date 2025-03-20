package com.SWP391.SkinCareSystem.Controller;

import com.SWP391.SkinCareSystem.DTO.RegisterRequest;
import com.SWP391.SkinCareSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {


    @Autowired
    private UserService userService;



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        String message = userService.registerUser(registerRequest);
        if (message.equals("User registered successfully!")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
}
