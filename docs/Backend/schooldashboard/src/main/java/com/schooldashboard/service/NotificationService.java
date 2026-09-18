package com.schooldashboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.schooldashboard.entity.Notification;
import com.schooldashboard.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByParentId(Long parentId) {
    return notificationRepository.findByParentId(parentId);
   }

   public List<Notification> getNotificationsByStudentId(Long studentId) {
    return notificationRepository.findByStudentId(studentId);
}

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
