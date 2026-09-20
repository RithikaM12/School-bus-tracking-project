package com.schooldashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schooldashboard.entity.Parent;
import com.schooldashboard.service.ParentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/parents")
public class ParentController {

    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    // Get all parents
    @GetMapping
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    // Parent Login
    @PostMapping("/login")
    public Parent login(@RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        return parentService.login(email, password);
    }

    // Parent Sign Up
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Parent parent) {

        Parent savedParent = parentService.signup(parent);

        if (savedParent == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedParent);
    }
}