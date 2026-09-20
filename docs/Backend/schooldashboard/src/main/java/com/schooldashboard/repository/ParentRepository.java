package com.schooldashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schooldashboard.entity.Parent;

public interface ParentRepository extends JpaRepository<Parent, Long> {

    Parent findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);
}