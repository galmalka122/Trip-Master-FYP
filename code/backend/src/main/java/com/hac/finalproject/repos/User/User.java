package com.hac.finalproject.repos.User;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

  @Id
  @GeneratedValue
  private Long id;

  private String userName;
  private String userMail;
  private String userPassword;
  private String userFirstName;
  private String userLastName;

  public User(String userName, String userMail, String userPassword, String userFirstName, String userLastName) {
    this.userName = userName;
    this.userMail = userMail;
    this.userPassword = userPassword;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;

  }

  public String getUserFirstName() {
    return userFirstName;
  }

  public void setUserFirstName(String userFirstName) {
    this.userFirstName = userFirstName;
  }

  public String getUserLastName() {
    return userLastName;
  }

  public void setUserLastName(String userLastName) {
    this.userLastName = userLastName;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getUserMail() {
    return userMail;
  }

  public void setUserMail(String userMail) {
    this.userMail = userMail;
  }

  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }

}
