package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class WrongPasswordException extends AuthenticationException {
    public WrongPasswordException() {
        super("Wrong Password!");
    }

    public WrongPasswordException(Throwable cause) {
        super("Wrong Password!", cause);
    }
}