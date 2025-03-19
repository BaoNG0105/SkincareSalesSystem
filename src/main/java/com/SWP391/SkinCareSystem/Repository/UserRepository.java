package com.SWP391.SkinCareSystem.Repository;


import com.SWP391.SkinCareSystem.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,String>{
    Optional<User> findByEmail(String email);
}

