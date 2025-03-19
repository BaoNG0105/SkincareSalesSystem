package com.SWP391.SkinCareSystem.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class RegisterRequest {
    private String userid;
    private String email;
    private String password;
    private String userName;
    private String role;
    private String gender; // Male, Female, Other
    private LocalDate dateOfBirth;
    private String address;
    private String phoneNumber;
    private String profileImage; // Chuỗi URL ảnh đại diện

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUserid() {
        return userid;
    }
    public String getUserName() {
        return userName;
    }

    public String getRole() {
        return role;
    }

    public String getGender() {
        return gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getProfileImage() {
        return profileImage;
    }
// Getters and Setters
}

