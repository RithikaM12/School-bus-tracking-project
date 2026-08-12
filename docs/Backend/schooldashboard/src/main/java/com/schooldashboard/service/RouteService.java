package com.schooldashboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.schooldashboard.entity.Route;
import com.schooldashboard.repository.RouteRepository;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }
}
