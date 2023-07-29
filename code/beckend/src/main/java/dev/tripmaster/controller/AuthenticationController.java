package dev.tripmaster.controller;

import dev.tripmaster.auth.AuthenticationService;
import dev.tripmaster.auth.RegisterRequest;
import dev.tripmaster.exception.*;
import dev.tripmaster.dto.AuthenticationRequest;
import dev.tripmaster.dto.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Value("${app.jwt.access-token.expiration}")
    private long jwtExpiration;

    @Value("${app.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request)
            throws EmailAlreadyExistsException, UsernameAlreadyExistsException {
        service.register(request);
        return ResponseEntity.ok("Successfully registered");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authRequest)
            throws WrongPasswordException, EmailNotFoundException
    {
        AuthenticationResponse authResponse = service.login(authRequest);
        return getAccessTokenHeader(authResponse).body(authResponse);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken)
            throws BadCredentialException
    {
        if(refreshToken != null) {
            AuthenticationResponse authResponse = service.refreshToken(refreshToken);
            return getAccessTokenHeader(authResponse).body(authResponse);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
    }

    private ResponseEntity.BodyBuilder getAccessTokenHeader(AuthenticationResponse authResponse){
        CacheControl cacheControl = CacheControl.maxAge(jwtExpiration, TimeUnit.MILLISECONDS);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, setRefreshTokenCookie(authResponse.getRefreshToken()).toString())
                .header(HttpHeaders.AUTHORIZATION,authResponse.getAccessToken().toString())
                .cacheControl(cacheControl);
    }

    private ResponseCookie setRefreshTokenCookie(String refreshToken)
    {
        return ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .domain("")
                .maxAge(refreshExpiration)
                .path("/")
                .secure(false)
                .sameSite("Strict")
                .build();
    }
}