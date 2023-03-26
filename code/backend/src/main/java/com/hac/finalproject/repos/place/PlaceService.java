package com.hac.finalproject.repos.place;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {

  @Autowired
  private PlaceRepository placeRepository;

  public List<Place> getAllPlaces() {
    return placeRepository.findAll();
  }

  public Place createPlace(Place place) {
    return placeRepository.save(place);
  }

  public Place updatePlace(Long id, Place updatedPlace) {
    Place place = placeRepository.getReferenceById(id);
    if (place == null) {
      return null;
    }
    place.setAddress(updatedPlace.getAddress());
    place.setAltitude(updatedPlace.getAltitude());
    place.setClosingHour(updatedPlace.getClosingHour());
    place.setLongitude(updatedPlace.getLongitude());
    place.setOpeningHour(updatedPlace.getOpeningHour());
    place.setIndex(updatedPlace.getIndex());
    place.setName(updatedPlace.getName());
    place.setRate(updatedPlace.getRate());

    return placeRepository.save(place);

  }

  public void deletePlace(Long id) {
    placeRepository.deleteById(id);
  }

}
