package com.hac.finalproject.repos.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  // Inject a DAO or repository for accessing the user data store
  @Autowired
  private UserRepository userRepository;

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public void signup(User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      throw new IllegalArgumentException("Username is already taken: " + user.getUsername());
    }
    userRepository.save(user);
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public User updateUser(Long id, User updatedUser) {
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
      return null;
    }
    user.setUsername(updatedUser.getUsername());
    user.setUserEmail(updatedUser.getUserEmail());
    return userRepository.save(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
