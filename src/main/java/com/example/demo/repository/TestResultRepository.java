package com.example.demo.repository;

import com.example.demo.entity.TestResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestResultRepository extends JpaRepository<TestResults, Long> {
}
