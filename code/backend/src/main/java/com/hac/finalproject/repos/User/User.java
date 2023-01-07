package com.hac.finalproject.repos.User;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.hac.finalproject.repos.roles.Role;

@Entity
@Table(name = "users")
public class User {

  /**
   * 
   * The User class represents a user of the application. It is annotated with the
   * JPA @Entity and @Table annotations to specify that it should be persisted in
   * the "users" table in the database.
   * 
   */
  @Id
  @GeneratedValue
  private Long id;

  /**
   * 
   * The username of the user. its value must be unique across all rows in the
   * table.
   * It is also cannot be null.
   */
  @Column(unique = true, nullable = false)
  private String username;

  /**
   * 
   * The email address of the user.its value must be unique across all rows in the
   * table.
   * It is also cannot be null.
   * 
   */
  @Column(unique = true, nullable = false)
  private String userEmail;

  /**
   * 
   * The password of the user. it cannot be null.
   * 
   */
  @Column(nullable = false)
  private String userPassword;

  /**
   * 
   * The first name of the user. it cannot be null.
   * 
   */
  @Column(nullable = false)
  private String userFirstname;

  /**
   * 
   * The last name of the user. it cannot be null.
   * 
   */
  @Column(nullable = false)
  private String userLastname;

  /**
   * 
   * A no-arg constructor for the User class.
   */
  public User() {
  }

  /**
   * 
   * A constructor for the User class that takes all of its fields as arguments.
   * 
   * @param username      the username of the user
   * @param userEmail     the email address of the user
   * @param userPassword  the password of the user
   * @param userFirstname the first name of the user
   * @param userLastname  the last name of the user
   */
  public User(String username, String userEmail, String userPassword, String userFirstname, String userLastname) {
    this.username = username;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userFirstname = userFirstname;
    this.userLastname = userLastname;
  }

  /**
   * 
   * This method retrieves the username of a user.
   * 
   * @return String - the username of the user.
   */
  public String getUsername() {
    return username;
  }

  /**
   * 
   * This method retrieves the roles of a user.
   * 
   * @return Set<Role> - a set of roles that the user belongs to.
   * 
   *         public Set<Role> getRoles() {
   *         return roles;
   *         }
   */

  /**
   * 
   * This method sets the username of a user.
   * 
   * @param username - the new username for the user.
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * 
   * This method retrieves the email of a user.
   * 
   * @return String - the email of the user.
   */
  public String getUserEmail() {
    return userEmail;
  }

  /**
   * 
   * This method sets the email of a user.
   * 
   * @param userEmail - the new email for the user.
   */
  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  /**
   * 
   * This method retrieves the password of a user.
   * 
   * @return String - the password of the user.
   */
  public String getUserPassword() {
    return userPassword;
  }

  /**
   * 
   * This method sets the password of a user.
   * 
   * @param userPassword - the new password for the user.
   */
  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }

  /**
   * 
   * This method retrieves the first name of a user.
   * 
   * @return String - the first name of the user.
   */
  public String getUserFirstname() {
    return userFirstname;
  }

  /**
   * 
   * This method sets the first name of a user.
   * 
   * @param userFirstname - the new first name for the user.
   */
  public void setUserFirstname(String userFirstname) {
    this.userFirstname = userFirstname;
  }

  /**
   * 
   * This method retrieves the last name of a user.
   * 
   * @return String - the last name of the user.
   */
  public String getUserLastname() {
    return userLastname;
  }

  /**
   * 
   * This method sets the last name of a user.
   * 
   * @param userLastname - the new last name for the user.
   */
  public void setUserLastname(String userLastname) {
    this.userLastname = userLastname;
  }

}
