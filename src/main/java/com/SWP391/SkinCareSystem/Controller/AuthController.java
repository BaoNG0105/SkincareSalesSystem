package com.SWP391.SkinCareSystem.Controller;



import com.SWP391.SkinCareSystem.DTO.LoginRequest;
import com.SWP391.SkinCareSystem.DTO.RegisterRequest;
import com.SWP391.SkinCareSystem.Service.AuthService;
import com.SWP391.SkinCareSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String userId = authService.authenticateUser(request);
        if (userId != null) {
            return ResponseEntity.ok("Login successful! User ID: " + userId);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials or account is inactive");
        }
    }

}
