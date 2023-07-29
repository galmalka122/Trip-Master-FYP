package dev.tripmaster.config;

import dev.tripmaster.TripMasterApplication;
import dev.tripmaster.model.Token;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler, LogoutSuccessHandler {

    private final JwtService service;
    private static final Logger logger = LoggerFactory.getLogger(TripMasterApplication.class);
    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {

        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        logger.info(authorizationHeader);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
            Token storedToken = service.getByToken(accessToken); // Add the access token to the revoked token list
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            service.save(storedToken);
            SecurityContextHolder.clearContext();
            logger.info("context cleared!");
        }
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logger.info("sets cookie");
        Cookie refreshTokenCookie = new Cookie("refresh_token", null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setHttpOnly(true);
        response.addCookie(refreshTokenCookie);
        logger.info("cookie cleared");
    }
}