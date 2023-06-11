package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class TripNotFoundException extends RuntimeException{

    public TripNotFoundException() {
        super("Trip ");
    }
    public TripNotFoundException(Throwable cause) {
        super("Token expired", cause);
    }

}
