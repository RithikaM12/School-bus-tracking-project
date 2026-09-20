package com.schooldashboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.schooldashboard.entity.Parent;
import com.schooldashboard.repository.ParentRepository;

@Service
public class ParentService {

    private final ParentRepository parentRepository;

    public ParentService(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    public Parent login(String email, String password) {
        return parentRepository.findByEmailAndPassword(email, password);
    }

    public Parent signup(Parent parent) {

        // Check whether email already exists
        if (parentRepository.existsByEmail(parent.getEmail())) {
            return null;
        }

        // Generate next parent ID
        Long nextParentId = parentRepository.findAll()
                .stream()
                .map(Parent::getParentId)
                .filter(id -> id != null)
                .max(Long::compareTo)
                .orElse(0L) + 1;

        parent.setParentId(nextParentId);

        return parentRepository.save(parent);
    }
}