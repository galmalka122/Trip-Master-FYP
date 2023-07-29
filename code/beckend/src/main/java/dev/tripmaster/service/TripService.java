package dev.tripmaster.service;

import dev.tripmaster.exception.TripNotFoundException;
import dev.tripmaster.model.Trip;
import dev.tripmaster.repository.TripRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TripService {

    private final TripRepository repository;

    public TripService(TripRepository repository) {
        this.repository = repository;
    }

    public List<Trip> getAllByUserId(String id){
        return repository.getAllByUserId(id).orElse(null);
    }

    public Trip getById(String id){
        return repository.getById(id).orElseThrow(TripNotFoundException::new);
    }

    public Trip save(Trip trip) {
        return repository.save(trip);
    }

    public void delete(String id){repository.deleteById(id);}
}
