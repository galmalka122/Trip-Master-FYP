package dev.tripmaster.controller;

import dev.tripmaster.TripMasterApplication;
import dev.tripmaster.model.Trip;
import dev.tripmaster.dto.TripRequest;
import dev.tripmaster.model.User;
import dev.tripmaster.service.TripService;
import dev.tripmaster.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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
        Trip trip = tripService.getByIdAndUser(tripId, user);
        return ResponseEntity.ok(trip);
    }

    @GetMapping("")
    public ResponseEntity<?> getTrips(@AuthenticationPrincipal User user) {

        List<Trip> trips = user.getTrips();
        logger.info(trips.toString());
        logger.info(user.toString());
        if(trips.size() > 0)
            return ResponseEntity.ok(trips);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No trips");
    }

    @PutMapping("")
    public ResponseEntity<?> updateTrip(@RequestBody TripRequest newTripRequest, Principal principal) {

        User user = userService.findByUsername(principal.getName()); // Fetch the user object from the database
        Trip trip = tripService.getByIdAndUser(newTripRequest.getId(), user); // Fetch the trip object from the database
        trip.updateTrip(newTripRequest); // Update the trip on the database
        Trip savedTrip = tripService.save(trip); // Save the trip to the database

        // Update the trip on the user's trips
        List<Trip> trips = user.getTrips();
        trips.remove(trip);
        trips.add(savedTrip);
        user.setTrips(trips);

        userService.save(user); // Update user's document

        return ResponseEntity.ok(trip.getName() + " Successfully updated");
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody TripRequest tripRequest,
                                             Principal principal) {

            // Fetch the user object from the database
            User user = userService.findByUsername(principal.getName());

            // Create a new trip by the request
            Trip trip = new Trip(user, tripRequest);

            // Save the trip to the database
            Trip savedTrip = tripService.save(trip);

            // Add the trip to user's trips
            user.getTrips().add(savedTrip);

            // Update user's document
            userService.save(user);

            return ResponseEntity.ok(savedTrip);
    }

    @DeleteMapping("{tripId}")
    public ResponseEntity<?> deleteTrip(@PathVariable String tripId, Principal principal) {

        User user = userService.findByUsername(principal.getName());// Fetch the user object from the database
        Trip deletedTrip = tripService.delete(tripId, user); // Delete trip from the database

        // Remove the trip from user's trips
        List<Trip> trips = user.getTrips();
        trips.removeIf((trip)-> trip.getId().equals(deletedTrip.getId()));
        user.setTrips(trips);
        logger.info(trips.toString());
        userService.save(user); // Update user's document
        logger.info(user.toString());
        return ResponseEntity.ok(deletedTrip);
    }

}