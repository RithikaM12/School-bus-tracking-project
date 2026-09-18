package com.schooldashboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schooldashboard.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByParentId(Long parentId);

    List<Notification> findByStudentId(Long studentId);
}
