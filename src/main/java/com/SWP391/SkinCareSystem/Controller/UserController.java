package com.SWP391.SkinCareSystem.Controller;


import com.SWP391.SkinCareSystem.DTO.RegisterRequest;
import com.SWP391.SkinCareSystem.Entity.User;
import com.SWP391.SkinCareSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private UserService userService;

    //get tất cả user từ db
    @GetMapping("/all")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    //get user bằng ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody RegisterRequest registerRequest) {
        String message = userService.createUser(registerRequest);
        if (message.contains("successfully!")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(message); // 200 // 201 //403
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);//400

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        String message = userService.deleteUser(id);
        if (message.contains("successfully!")) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(message); // 200 // 201 //403
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);//400
    }
//    //Delete

    @PutMapping("/edit/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable int id,  @RequestBody User userDetails) {
        return ResponseEntity.ok(userService.updateUserProfile(id, userDetails));
    }



}
