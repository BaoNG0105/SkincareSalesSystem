package com.example.demo.repository;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndIsDeletedFalse(String email);
    List<User> findByIsDeletedFalse();
    Optional<User> findByIdAndIsDeletedFalse(long id);
    Optional<User> findByEmail(String email);

    // Tìm user theo username
    Optional<User> findByUserName(String username);

    // Tìm user theo username nhưng chưa bị xóa
    //Optional<User> findByUserNameAndIsDeletedFalse(String userName);
}

