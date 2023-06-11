package dev.tripmaster.repository;

import dev.tripmaster.model.Place;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PlaceRepository extends MongoRepository<Place, Integer> {
    Optional<Place> getPlaceById(String id);

}