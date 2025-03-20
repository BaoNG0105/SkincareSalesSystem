package com.SWP391.SkinCareSystem.Service;

import com.SWP391.SkinCareSystem.DTO.RegisterRequest;
import com.SWP391.SkinCareSystem.Entity.User;
import com.SWP391.SkinCareSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();  // trả về cho tôi list full user trong db
    }

    // tim kiem user bang id
    //   Optional<User> ko phảilucsc nào cx đọc ra đc 1 đói tuong user // null
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public String createUser(RegisterRequest registerRequest) {
        System.out.println("========" + registerRequest.toString());

        String email = registerRequest.getEmail();
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already taken!";
        }

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(registerRequest.getPasswordHash());

        // Tạo và lưu người dùng mới
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(encodedPassword);
        user.setUserName(registerRequest.getUserName());
        user.setRole(registerRequest.getRole());
        user.setGender(registerRequest.getGender());
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setAddress(registerRequest.getAddress());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setProfileImage(registerRequest.getProfileImage());
        user.setStatus(1); // Mặc định là active

        try {
            userRepository.save(user);
            return "User create successfully!";
        } catch (Exception e) {
            return "Error occurred while registering user.";
        }
    }

    public User updateUserProfile(int id, User userDetails) {
        User user = getUserById(id).get();
        user.setUserName(userDetails.getUserName());
        user.setGender(userDetails.getGender());
        user.setDateOfBirth(userDetails.getDateOfBirth());
        user.setAddress(userDetails.getAddress());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setProfileImage(userDetails.getProfileImage());
        return userRepository.save(user);
    }

    public String deleteUser(int id) {
        try {
            userRepository.deleteById(id);
            return " Delete user successfully!";
        } catch (Exception e) {
            return "Error occurred while registering user.";
        }

    }

















    public String registerUser(RegisterRequest registerRequest) {
        System.out.println("========" + registerRequest.toString());

        String email = registerRequest.getEmail();
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already taken!";
        }

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(registerRequest.getPasswordHash());

        // Tạo và lưu người dùng mới
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(encodedPassword);
        user.setUserName(registerRequest.getUserName());
        user.setRole(registerRequest.getRole());
        user.setGender(registerRequest.getGender());
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setAddress(registerRequest.getAddress());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setProfileImage(registerRequest.getProfileImage());
        user.setStatus(1); // Mặc định là active

        try {
            userRepository.save(user);
            return "User registered successfully!";
        } catch (Exception e) {
            return "Error occurred while registering user.";
        }
    }
}


