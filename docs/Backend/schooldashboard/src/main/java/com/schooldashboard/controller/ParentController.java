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
import com.schooldashboard.service.OtpService;
import com.schooldashboard.service.ParentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/parents")
public class ParentController {

    private final ParentService parentService;
    private final OtpService otpService;

    public ParentController(ParentService parentService, OtpService otpService) {
        this.parentService = parentService;
        this.otpService = otpService;
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

    // Send OTP
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> data) {

        String email = data.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body("Email is required");
        }

        String otp = otpService.generateOtp(email);

        // For development/testing
        System.out.println("OTP for " + email + " : " + otp);

        return ResponseEntity.ok(
                Map.of(
                        "message", "OTP generated successfully",
                        "otp", otp
                )
        );
    }

    // Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        String otp = data.get("otp");

        if (email == null || email.isBlank() ||
            otp == null || otp.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email and OTP are required");
        }

        boolean verified = otpService.verifyOtp(email, otp);

        if (verified) {
            return ResponseEntity.ok(
                    Map.of(
                            "message", "OTP verified successfully",
                            "verified", true
                    )
            );
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        Map.of(
                                "message", "Invalid OTP",
                                "verified", false
                        )
                );
    }
}