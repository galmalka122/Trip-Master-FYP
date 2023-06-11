package dev.tripmaster.service;

import dev.tripmaster.TripMasterApplication;
import dev.tripmaster.auth.RegisterRequest;
import dev.tripmaster.exception.EmailAlreadyExistsException;
import dev.tripmaster.exception.EmailNotFoundException;
import dev.tripmaster.exception.UsernameAlreadyExistsException;
import dev.tripmaster.exception.UsernameNotFoundException;
import dev.tripmaster.model.Role;
import dev.tripmaster.model.User;
import dev.tripmaster.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(TripMasterApplication.class);
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User loadUserByUsername(String email) {
        return repository.findByEmail(email)
                .orElse(null);
    }

    public User findByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException());
    }

    public User findByEmail(String email) throws EmailNotFoundException {
        User user = repository.findByEmail(email).orElseThrow(()->new EmailNotFoundException());
        return user;
    }
    private Boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    private Boolean existsByEmail(String email){
        return repository.existsByEmail(email);
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = repository.findByUsername(username).orElse(null);
        if (user == null || !user.getPassword().equals(oldPassword)) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        user.setPassword(newPassword);
        repository.save(user);
    }

    public User save(User user){
        logger.info("saving user " + user.toString());
         return repository.save(user);
    }


    public User userRegistration(RegisterRequest request) throws EmailAlreadyExistsException, UsernameAlreadyExistsException {
        if(existsByEmail(request.getEmail())) throw new EmailAlreadyExistsException();
        if(existsByUsername(request.getUsername())) throw new UsernameAlreadyExistsException();
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .trips(new ArrayList<>())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();
        return repository.save(user);
    }


}
