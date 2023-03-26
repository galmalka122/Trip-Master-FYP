package com.hac.finalproject.compnent;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

  private final String SECRET_KEY = "lifeIsTraveling";

  public String createToken(String username) {
    Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
    String token = JWT.create()
        .withSubject(username)
        .sign(algorithm);
    return token;
  }

  public String getUsername(String token) {
    return JWT.require(Algorithm.HMAC256(SECRET_KEY))
        .build()
        .verify(token)
        .getSubject();
  }
}
