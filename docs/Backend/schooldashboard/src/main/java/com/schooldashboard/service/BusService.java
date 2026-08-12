package com.schooldashboard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.schooldashboard.entity.Bus;
import com.schooldashboard.repository.BusRepository;

@Service
public class BusService {

    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }
}