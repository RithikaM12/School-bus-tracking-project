package com.schooldashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.schooldashboard.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Long> {

}
