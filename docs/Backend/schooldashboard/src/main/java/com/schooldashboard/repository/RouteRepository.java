package com.schooldashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.schooldashboard.entity.Route;

public interface RouteRepository extends JpaRepository<Route, Long> {

}
