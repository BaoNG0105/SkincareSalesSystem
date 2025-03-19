package com.SWP391.SkinCareSystem.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Setter
@Getter
@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_Id")
    private String userId;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "Password_Hash", nullable = false)
    private String passwordHash;

    @Column(name = "User_Name", nullable = false)
    private String userName;

    @Column(name = "Role", nullable = false)
    private String role; // Ví dụ: "Customer", "Staff", "Manager"

    @Column(name = "Status", nullable = false)
    private int status; // Active/Inactive

    @Column(name = "Gender")
    private String gender; // Male, Female, Other

    @Column(name = "Date_Of_Birth")
    private LocalDate dateOfBirth;

    @Column(name = "Address")
    private String address;

    @Column(name = "Phone_Number")
    private String phoneNumber;

    @Column(name = "Profile_Image")
    private String profileImage; // Chuỗi URL ảnh đại diện

    @Column(name = "Created_At", nullable = false)
    private LocalDateTime createdAt;

    // Constructor, Getters and Setters

    public User() {
        this.createdAt = LocalDateTime.now(); // Mặc định thời gian tạo
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getUserName() {
        return userName;
    }

    public String getRole() {
        return role;
    }

    public int isStatus() {
        return status;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
// Getters and Setters...
}


