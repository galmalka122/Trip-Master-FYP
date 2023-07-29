package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class BadCredentialException  extends AuthenticationException {
    public BadCredentialException() {
        super("Bad credential!");
    }

    public BadCredentialException(Throwable cause) {
        super("Bad credential!", cause);
    }
}