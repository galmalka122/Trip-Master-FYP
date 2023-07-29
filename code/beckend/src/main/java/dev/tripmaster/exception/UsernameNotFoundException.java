package dev.tripmaster.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UsernameNotFoundException extends AuthenticationException {
    public UsernameNotFoundException(){
        super("Username not exists in our servers!");
    }
    public UsernameNotFoundException(Throwable cause){
        super("Username not exists in our servers!",cause);
    }
}
