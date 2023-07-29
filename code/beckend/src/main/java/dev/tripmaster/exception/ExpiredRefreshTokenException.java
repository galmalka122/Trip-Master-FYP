package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class ExpiredRefreshTokenException extends AuthenticationException {
    public ExpiredRefreshTokenException(){
        super("Refresh token expired");
    }

    public ExpiredRefreshTokenException(Throwable cause) {
        super("Refresh token expired", cause);
    }
}
