package com.schooldashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.schooldashboard.entity.BusLocation;

public interface BusLocationRepository extends JpaRepository<BusLocation, Long> {

}
