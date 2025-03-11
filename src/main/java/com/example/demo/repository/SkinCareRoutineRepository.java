package com.example.demo.repository;


import com.example.demo.entity.SkinCareRoutine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SkinCareRoutineRepository extends JpaRepository<SkinCareRoutine, Long> {
    List<SkinCareRoutine> findByIsDeletedFalse();
    Optional<SkinCareRoutine> findByRoutineIdAndIsDeletedFalse(long id);
    List<SkinCareRoutine> findBySkinType_SkinTypeIdAndIsDeletedFalse(long skinTypeId);
}

