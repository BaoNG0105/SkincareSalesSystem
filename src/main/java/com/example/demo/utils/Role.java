package com.example.demo.utils;

public enum Role {
    Customer,
    Staff,
    Manager
}

//@PreAuthorize("isAuthenticated()") khach chua dang nhap se bị chan