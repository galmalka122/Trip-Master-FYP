package dev.tripmaster.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class TripNameAlreadyExistsException  extends DataIntegrityViolationException {

    public TripNameAlreadyExistsException(String tripName) {
        super(
                "You already have trip with the name " + tripName
                + "\nPlease choose another name"
        );
    }
    public TripNameAlreadyExistsException(String tripName, Throwable cause) {
        super("You already have trip with the name " + tripName
                + "\nPlease choose another name", cause);
    }

}

