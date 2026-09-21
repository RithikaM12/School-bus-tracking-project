package com.schooldashboard.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private final JavaMailSender mailSender;

    private final Map<String, String> otpStorage = new HashMap<>();

    public OtpService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Generate and send OTP
    public String generateOtp(String email) {

        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        otpStorage.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("School Bus Tracking System - OTP");
        message.setText(
                "Your OTP for Parent Registration is: "
                        + otp
                        + "\n\nThis OTP is valid for this registration."
        );

        mailSender.send(message);

        return otp;
    }

    // Verify OTP
    public boolean verifyOtp(String email, String otp) {

        String storedOtp = otpStorage.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {

            otpStorage.remove(email);

            return true;
        }

        return false;
    }
}