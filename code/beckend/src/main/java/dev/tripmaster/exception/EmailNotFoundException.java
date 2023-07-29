package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class EmailNotFoundException extends AuthenticationException {
    public EmailNotFoundException(){
        super("Email not exists in our servers!");
    }

    public EmailNotFoundException(Throwable cause) {
        super("Email not exists in our servers!", cause);
    }
}
