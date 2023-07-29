package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class ExpiredTokenException extends RuntimeException{

    public ExpiredTokenException() {
        super("Token expired");
    }
    public ExpiredTokenException(Throwable cause) {
        super("Token expired", cause);
    }

}

