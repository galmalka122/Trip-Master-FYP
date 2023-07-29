package dev.tripmaster.auth;

import dev.tripmaster.TripMasterApplication;
import dev.tripmaster.config.JwtService;
import dev.tripmaster.dto.AuthenticationRequest;
import dev.tripmaster.dto.AuthenticationResponse;
import dev.tripmaster.exception.*;
import dev.tripmaster.model.Token;
import dev.tripmaster.model.TokenType;
import dev.tripmaster.model.User;
import dev.tripmaster.repository.TokenRepository;
import dev.tripmaster.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(TripMasterApplication.class);
    private final UserService userService;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) throws EmailAlreadyExistsException, UsernameAlreadyExistsException
    {
        logger.info("registration attempt - Email: " + request.getEmail());
        userService.userRegistration(request);

    }

    public AuthenticationResponse login(AuthenticationRequest request)
            throws WrongPasswordException, EmailNotFoundException
    {
        logger.info("authenticate attempt - Email: " + request.getEmail());
        final User user = userService.findByEmail(request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        request.getPassword()
                )
        );
        logger.info(request.getEmail() + "authenticated successfully");
        return createAuthResponse(user);

    }

    public AuthenticationResponse refreshToken(String refreshToken) throws BadCredentialException {
        try {
            final String username = jwtService.extractUsername(refreshToken);
            if (username != null) {
                var user = userService.findByUsername(username);
                if (jwtService.isTokenValid(refreshToken, user)) {
                    return createAuthResponse(user);
                }
            }
            throw new BadCredentialException();
        }
        catch (ExpiredJwtException e){
            throw new ExpiredRefreshTokenException();
        }
    }

    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.getAllById(user.getEmail());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
    private AuthenticationResponse createAuthResponse(User user){
        final String jwtToken = jwtService.generateToken(user);
        final String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .email(user.getEmail())
                .accessToken(jwtToken)
                .role(user.getRole())
                .refreshToken(refreshToken)
                .build();
    }
}