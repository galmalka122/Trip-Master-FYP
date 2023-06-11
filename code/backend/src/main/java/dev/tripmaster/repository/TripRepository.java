package dev.tripmaster.repository;

import dev.tripmaster.model.Trip;
import dev.tripmaster.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TripRepository extends MongoRepository<Trip, String> {
    Optional<Trip> getByIdAndUser(String id, User user);
    Optional<Trip> deleteByIdAndUser(String id, User user);
}
