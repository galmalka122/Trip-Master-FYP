package com.hac.finalproject.repos.trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TripService {

  @Autowired
  private TripRepository tripRepository;

  public Trip createTrip(Trip trip) {
    return tripRepository.save(trip);
  }

  public Trip updaeTrip(Trip updatedTrip, Long id) {
    Trip trip = tripRepository.findById(id).orElse(null);
    if (trip == null)
      return null;
    trip.setName(updatedTrip.getName());
    trip.setPlaces(updatedTrip.getPlaces());
    trip.setUser(updatedTrip.getUser());
    return tripRepository.save(trip);
  }

  public void deleteTrip(Long id) {
    tripRepository.deleteById(id);
  }

}
