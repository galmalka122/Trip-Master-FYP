package dev.tripmaster.controller;

import dev.tripmaster.exception.BadCredentialException;
import dev.tripmaster.exception.ExpiredRefreshTokenException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/error")
public class UserController {

    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        return "Missing parameter: " + ex.getParameterName();
    }

    @ExceptionHandler({ExpiredRefreshTokenException.class,
            MissingRequestCookieException.class,
            BadCredentialException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void handleExpiredJwtException(HttpServletRequest request, HttpServletResponse response) {
        // Remove the refresh_token HTTP-only cookie
        Cookie refreshTokenCookie = new Cookie("refresh_token", "");
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }


    @ExceptionHandler(MissingRequestCookieException.class)
    @RequestMapping(value = "",method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<?> expiredToken(){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Token expired");
    }

}