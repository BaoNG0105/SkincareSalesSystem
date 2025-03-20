package com.SWP391.SkinCareSystem.Service;


import com.SWP391.SkinCareSystem.DTO.LoginRequest;
import com.SWP391.SkinCareSystem.Entity.User;
import com.SWP391.SkinCareSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

// select from users where email = ?
    // _connect.execaut....

    public int authenticateUser(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getId(); // Trả về UserId nếu login thành công

        }
        return 0;
    }
}

