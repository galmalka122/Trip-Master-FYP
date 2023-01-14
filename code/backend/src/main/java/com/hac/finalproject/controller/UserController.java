package com.hac.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hac.finalproject.repos.User.User;
import com.hac.finalproject.repos.User.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserService service;

  @PostMapping("/create")
  public ResponseEntity<String> createUser(@RequestBody User user) {
    // Perform logic to create the example
    service.signup(user);
    return new ResponseEntity<>("registered successfully", HttpStatus.CREATED);
  }
}
