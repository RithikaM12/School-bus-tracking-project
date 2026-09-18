package com.schooldashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.schooldashboard.entity.Notification;
import com.schooldashboard.service.NotificationService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/parent/{parentId}")
    public List<Notification> getNotificationsByParentId(
            @PathVariable Long parentId) {
        return notificationService.getNotificationsByParentId(parentId);
    }

    @GetMapping("/student/{studentId}")
    public List<Notification> getNotificationsByStudentId(
            @PathVariable Long studentId) {
        return notificationService.getNotificationsByStudentId(studentId);
    }

    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }
}