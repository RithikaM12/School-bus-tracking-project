package com.schooldashboard.repository;

import java.util.List;
import com.schooldashboard.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
                List<Student> findByParentId(int parentId);
}