package com.hac.finalproject.repos.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository repo;

  private String repoName = "users";

  public UserRepository getRepo() {
    return repo;
  }

  public String getRepoName() {
    return repoName;
  }

}
