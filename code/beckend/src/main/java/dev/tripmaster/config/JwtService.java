package dev.tripmaster.config;


import dev.tripmaster.model.Token;
import dev.tripmaster.repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret-key}")
    private String secretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    @Value("${app.jwt.access-token.expiration}")
    private long jwtExpiration;

    @Value("${app.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    private final TokenRepository repository;

    public JwtService(TokenRepository repository) {

        this.repository = repository;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public String generateRefreshToken(
            UserDetails userDetails
    ) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        if(isTokenExpired(token)) return false;
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignInKey())
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Token getByToken(String token){
        return repository.getTokenByToken(token).orElse(null);
    }

    public Token save(Token token){ return repository.save(token);};

    public String parseJwt(String auth) {

        if (StringUtils.hasText(auth) && auth.startsWith("Bearer ")) {
            return auth.substring(7);
        }

        return null;
    }

    public Optional<Token> extractTokenFromHeaders(HttpServletRequest request) {

        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String jwt;
        if (authorizationHeader == null ||!authorizationHeader.startsWith("Bearer ")) {
            return Optional.empty();
        }
        jwt = authorizationHeader.substring(7);
        return repository.getTokenByToken(jwt);
    }

    public String extractRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            Cookie accessCookie = Arrays.stream(cookies).filter(cookie -> cookie.getName()
                    .equals("refresh_token")).findFirst().orElse(null);
            if(accessCookie != null){
                return accessCookie.getValue();
            }
        }
        return null;
    }
}