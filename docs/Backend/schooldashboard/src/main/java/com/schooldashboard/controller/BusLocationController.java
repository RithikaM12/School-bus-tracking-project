package com.schooldashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schooldashboard.entity.BusLocation;
import com.schooldashboard.service.BusLocationService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/bus-locations")
public class BusLocationController {

    private final BusLocationService busLocationService;

    public BusLocationController(BusLocationService busLocationService) {
        this.busLocationService = busLocationService;
    }

    @GetMapping
    public List<BusLocation> getAllLocations() {
        return busLocationService.getAllLocations();
    }
    @PostMapping
    public BusLocation saveLocation(@RequestBody BusLocation busLocation) {
        return busLocationService.saveLocation(busLocation);
    }
}
