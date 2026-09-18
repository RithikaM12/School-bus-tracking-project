package com.schooldashboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.schooldashboard.entity.BusLocation;
import com.schooldashboard.repository.BusLocationRepository;

@Service
public class BusLocationService {

    private final BusLocationRepository busLocationRepository;

    public BusLocationService(BusLocationRepository busLocationRepository) {
        this.busLocationRepository = busLocationRepository;
    }

    public List<BusLocation> getAllLocations() {
        return busLocationRepository.findAll();
    }
    public BusLocation saveLocation(BusLocation busLocation) {
    return busLocationRepository.save(busLocation);
}
}
