package com.example.SkinCareSellProductSysterm.Repository;

import com.example.SkinCareSellProductSysterm.Entity.User;
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
}
