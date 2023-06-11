package dev.tripmaster.service;

import dev.tripmaster.exception.TripNotFoundException;
import dev.tripmaster.model.Trip;
import dev.tripmaster.model.User;
import dev.tripmaster.repository.TripRepository;
import org.springframework.stereotype.Component;

@Component
public class TripService {

    private final TripRepository repository;

    public TripService(TripRepository repository) {
        this.repository = repository;
    }


    public Trip getByIdAndUser(String id, User user){
        return repository.getByIdAndUser(id, user).orElseThrow(()->new TripNotFoundException());
    }

    public Trip save(Trip trip) {
        return repository.save(trip);
    }

    public Trip delete(String id, User user){return repository.deleteByIdAndUser(id, user).orElseThrow(()->new TripNotFoundException());}
}
