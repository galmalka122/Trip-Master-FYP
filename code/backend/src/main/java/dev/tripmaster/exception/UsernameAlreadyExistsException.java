package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class UsernameAlreadyExistsException extends AuthenticationException {
    public UsernameAlreadyExistsException() {
        super("Username already exists in our servers!");
    }
    public UsernameAlreadyExistsException(Throwable cause) {
        super("Username already exists in our servers!", cause);
    }
}
