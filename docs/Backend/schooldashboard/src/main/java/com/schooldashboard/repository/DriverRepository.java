package com.schooldashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.schooldashboard.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver, Long> {

}
