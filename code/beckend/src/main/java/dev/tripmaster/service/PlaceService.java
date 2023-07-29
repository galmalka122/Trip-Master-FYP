package dev.tripmaster.service;

import dev.tripmaster.model.Place;
import dev.tripmaster.repository.PlaceRepository;
import org.springframework.stereotype.Component;

@Component
public class PlaceService {

    private final PlaceRepository repository;

    public PlaceService(PlaceRepository repository) {
        this.repository = repository;
    }

    public Place getPlaceById(String id){
        return repository.getPlaceById(id).orElse(null);
    }


}
