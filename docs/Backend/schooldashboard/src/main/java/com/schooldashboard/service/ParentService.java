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
}