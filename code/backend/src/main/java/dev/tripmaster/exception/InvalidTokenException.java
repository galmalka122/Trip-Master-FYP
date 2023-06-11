package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidTokenException extends RuntimeException{

    public InvalidTokenException() {
        super("Invalid credential");
    }
    public InvalidTokenException(Throwable cause) {
        super("Invalid credential", cause);
    }

}