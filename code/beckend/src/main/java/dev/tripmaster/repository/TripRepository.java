package dev.tripmaster.repository;

import dev.tripmaster.model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends MongoRepository<Trip, String> {
    Optional<Trip> getById(String id);

    Optional<List<Trip>> getAllByUserId(String id);

}
