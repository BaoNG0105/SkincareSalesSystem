package com.SWP391.SkinCareSystem.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String passwordHash;
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "email='" + email + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", userName='" + userName + '\'' +
                ", role='" + role + '\'' +
                ", gender='" + gender + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", profileImage='" + profileImage + '\'' +
                '}';
    }
}

