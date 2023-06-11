package dev.tripmaster.repository;

import dev.tripmaster.model.Token;
import dev.tripmaster.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, Integer> {

    List<Token> getAllById(String id);

    Optional<Token> getTokenByToken(String token);
    Optional<Token> getTokenByUser(User user);

    Optional<Token> findByToken(String jwt);
}