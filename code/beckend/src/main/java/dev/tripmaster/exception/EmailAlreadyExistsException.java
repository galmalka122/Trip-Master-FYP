package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class EmailAlreadyExistsException extends AuthenticationException {
    public EmailAlreadyExistsException() {
        super("Email already exists in our servers!");
    }

    public EmailAlreadyExistsException(Throwable cause) {
        super("Email already exists in our servers!", cause);
    }
}
