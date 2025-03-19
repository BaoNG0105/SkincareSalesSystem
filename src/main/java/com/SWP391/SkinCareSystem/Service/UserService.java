package com.SWP391.SkinCareSystem.Service;

import com.SWP391.SkinCareSystem.DTO.RegisterRequest;
import com.SWP391.SkinCareSystem.Entity.User;
import com.SWP391.SkinCareSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder; // Để mã hóa mật khẩu

    public String registerUser(RegisterRequest registerRequest) {
        // Kiểm tra xem email đã tồn tại hay chưa
        String email = registerRequest.getEmail();
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return "Email already taken!";
        }

        // Mã hóa mật khẩu
        String encodedPassword = registerRequest.getPassword();

        // Tạo và lưu người dùng mới
        User user = new User();
        user.setUserId(registerRequest.getUserid());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(encodedPassword);
        user.setUserName(registerRequest.getUserName());
        user.setRole(registerRequest.getRole());
        user.setGender(registerRequest.getGender());
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setAddress(registerRequest.getAddress());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setProfileImage(registerRequest.getProfileImage());
        user.setStatus(1); // Mặc định là active

        userRepository.save(user);

        return "User registered successfully!";
    }
}

