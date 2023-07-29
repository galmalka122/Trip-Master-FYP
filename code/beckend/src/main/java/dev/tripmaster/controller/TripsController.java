package dev.tripmaster.controller;

import dev.tripmaster.TripMasterApplication;
import dev.tripmaster.dto.CalculateRouteRequest;
import dev.tripmaster.dto.CalculateRouteResponse;
import dev.tripmaster.dto.DeletePlaceRequest;
import dev.tripmaster.exception.TripNotFoundException;
import dev.tripmaster.model.Place;
import dev.tripmaster.model.Trip;
import dev.tripmaster.model.TripDay;
import dev.tripmaster.model.User;
import dev.tripmaster.service.SubsetGenerator;
import dev.tripmaster.service.TripService;
import dev.tripmaster.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@RestController
@RequestMapping("api/trips")
public class TripsController {

    private final TripService tripService;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(TripMasterApplication.class);

    public TripsController(TripService tripService, UserService userService) {
        this.tripService = tripService;
        this.userService = userService;
    }


    @GetMapping("{tripId}")
    public ResponseEntity<?> getTrip(@PathVariable String tripId, @AuthenticationPrincipal User user) {
        if(!user.getTripIds().contains(tripId))
            throw new TripNotFoundException();
        Trip trip = tripService.getById(tripId); // Fetch the trip object from the database
        return ResponseEntity.ok(trip);
    }

    @GetMapping("")
    public ResponseEntity<?> getTrips(Principal principal) {
        User user = userService.findByUsername(principal.getName()); // Fetch the user object from the database
        List<String> tripIds = user.getTripIds(); // Fetch the tripIds list from the user object
        if(tripIds.size() > 0) {

            List<Trip> trips = tripService.getAllByUserId(user.getId()); // Fetch the trips from the database
            logger.info("Trips: " + trips);
            return ResponseEntity.ok(trips);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No trips");
    }

    @PutMapping("")
    public ResponseEntity<?> updateTrip(@RequestBody Trip newTrip, Principal principal) {

        User user = userService.findByUsername(principal.getName()); // Fetch the user object from the database
        Trip trip = tripService.getById(newTrip.getId()); // Fetch the trip object from the database
        Trip savedTrip = tripService.save(newTrip); // Save the trip to the database

        // Update the trip ID in the user's tripIds list
        List<String> tripIds = user.getTripIds();
        tripIds.remove(trip.getId());
        tripIds.add(savedTrip.getId());
        user.setTripIds(tripIds);

        userService.save(user); // Update user's document

        return ResponseEntity.ok(trip.getName() + " Successfully updated");
    }

    @PostMapping("")
    public ResponseEntity<Trip> addTripToUser(@RequestBody Trip trip, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        trip.setUserId(user.getId()); // Set the trip's userId to the user's id
        // Save the trip and obtain the tripId
        trip.initDays();
        Trip savedTrip = tripService.save(trip);
        String tripId = savedTrip.getId();

        // Add the tripId to the user's tripIds list
        user.getTripIds().add(tripId);

        // Save the updated user back to the repository
        userService.save(user);
        return ResponseEntity.ok(savedTrip);
    }

    @DeleteMapping("{tripId}")
    public ResponseEntity<?> deleteTrip(@PathVariable String tripId, Principal principal) {

        User user = userService.findByUsername(principal.getName());// Fetch the user object from the database
        Trip deletedTrip =  tripService.getById(tripId); // Delete trip from the database
        tripService.delete(tripId);
        // Remove the trip ID from user's tripIds
        List<String> tripIds = user.getTripIds();
        tripIds.removeIf(id -> id.equals(tripId));
        user.setTripIds(tripIds);

        userService.save(user); // Update user's document

        return ResponseEntity.ok(deletedTrip);
    }

    @PostMapping("/{tripId}/places")
    public ResponseEntity<?> addPlaceToTrip(@PathVariable("tripId") String tripId, @RequestBody Place place) {

        // Retrieve the trip from the repository using the tripId
        Trip trip = tripService.getById(tripId);

        TripDay dayList = trip.getTripDays().get(place.getDayIndex());
        // Check if the place already exists in the places list
        if(dayList.getPlaces().stream().anyMatch(p -> p.getId().equals(place.getId())) ||
                dayList.getOrigin() == place || dayList.getDestination() == place)
            return ResponseEntity.badRequest().body("Place already exists");

        // Add the place to the trip
        dayList.getPlaces().add(place);

        // Save the updated trip back to the repository
        tripService.save(trip);
        return ResponseEntity.ok(place);
    }

    @DeleteMapping("/{tripId}/places")
    public ResponseEntity<?> deletePlaceFromTrip(@PathVariable("tripId") String tripId,
                                                 @RequestBody DeletePlaceRequest req) {
        // Retrieve the trip from the repository using the tripId
        Trip trip = tripService.getById(tripId);

        logger.info(req.toString());
        Place deletedPlace = trip.getTripDays().get(req.getDayIndex()).getPlaces().stream()
                .filter(p -> p.getId().equals(req.getPlaceId())).findFirst().orElse(null);

        trip.getTripDays().get(req.getDayIndex()).getPlaces().remove(deletedPlace);

        // Save the updated trip back to the repository
        tripService.save(trip);

        // Save the updated trip back to the repository
        return ResponseEntity.ok(deletedPlace);
    }

    @PutMapping("/{tripId}/places/{day}")
    public ResponseEntity<?> updateTripDay(@PathVariable("tripId") String tripId,
                                                  @PathVariable("day") String dayIndex,
                                                  @RequestBody TripDay tripDay) {
        // Retrieve the trip from the repository using the tripId
        Trip trip = tripService.getById(tripId);
        logger.info(trip.getTripDays().toString());
        trip.getTripDays().set(Integer.parseInt(dayIndex), tripDay);

        // Save the updated trip back to the repository
        tripService.save(trip);

        return ResponseEntity.ok(tripDay);
    }



    @PutMapping("/{tripId}/places/{day}/{placeId}")
    public ResponseEntity<?> updatePlace(@PathVariable("tripId") String tripId,
                                         @PathVariable("day") String dayIndex,
                                         @PathVariable("placeId") String placeId,
                                                  @RequestBody Place place) {
        // Retrieve the trip from the repository using the tripId
        Trip trip = tripService.getById(tripId);

        // get the list of places for the day
        List<Place> dayPlaces = trip.getTripDays().get(Integer.parseInt(dayIndex)).getPlaces();

        // find the place by the place id and return its index
        int index = IntStream.range(0, dayPlaces.size())
                .filter(i -> dayPlaces.get(i).getId().equals(placeId))
                .findFirst()
                .orElse(-1);

        // if the place is not found, return bad request
        if(index == -1)
            return ResponseEntity.badRequest().body("Place not found");

        // update the place in the list and save the trip
        dayPlaces.set(index, place);
        trip.getTripDays().get(Integer.parseInt(dayIndex)).setPlaces(dayPlaces);
        tripService.save(trip);
        return ResponseEntity.ok(place);

    }

    @PostMapping("/calculate")
    public ResponseEntity<?> calculatePlaces(@RequestBody CalculateRouteRequest request) {

        // Retrieve the trip from the repository using the tripId
        if (request.getPlaces().size() == 0) {
            return ResponseEntity.ok("No places to calculate");
        }
        logger.info("Calculating route for trip: " + request);
        Trip trip = tripService.getById(request.getTripId());

        TripDay day = trip.getTripDays().get(request.getDayIndex());

        SubsetGenerator tspAlgorithm = new SubsetGenerator(request);
        List<Integer> route = tspAlgorithm.generateAllSubsetsWithZero();
        List<Place> orderedPlaces = new ArrayList<>();
        logger.info("calculated route: " + route);
        for(Integer i : route) {
            if(i == -1)
                orderedPlaces.add(day.getDestination());
            else {
                boolean found = false;
                logger.info(i + ": " + request.getPlaces().get(i).getName());
                for (Place p : day.getPlaces()) {
                    if (p.getName().equals(request.getPlaces().get(i).getName())) {
                        found = true;
                        orderedPlaces.add(p);
                    }
                }
                if (!found) {
                    orderedPlaces.add(day.getOrigin());
                }
            }

        }
        logger.info("ordered places: ");
        for(Place p : orderedPlaces) {
            logger.info(p.getName());
        }
        CalculateRouteResponse crr = CalculateRouteResponse
                .builder()
                .places(orderedPlaces)
                .overallDistance(tspAlgorithm.getBestDistance())
                .overallTime(tspAlgorithm.getBestTime())
                .build();
        return ResponseEntity.ok(crr);
    }
}