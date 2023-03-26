package com.hac.finalproject.repos.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.AuthorityUtils;
// import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
public class User /* implements UserDetails */ {

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
  private String email;

  /**
   * 
   * The password of the user. it cannot be null.
   * 
   */
  @Column(nullable = false)
  private String password;

  /**
   * 
   * The first name of the user. it cannot be null.
   * 
   */
  @Column(nullable = false)
  private String firstname;

  /**
   * 
   * The last name of the user. it cannot be null.
   * 
   */
  @Column(nullable = false)
  private String lastname;

  /**
   * 
   * A no-arg constructor for the User class.
   */

  @Column(nullable = false)
  private boolean enabled = true;
  @Column(nullable = false)
  private boolean accountNonExpired = true;
  @Column(nullable = false)
  private boolean credentialsNonExpired = true;
  @Column(nullable = false)
  private boolean accountNonLocked = true;

  // @ElementCollection(fetch = FetchType.EAGER)
  // List<GrantedAuthority> authorities =
  // AuthorityUtils.createAuthorityList("ROLE_USER");

  public User() {
  }

  /**
   * A custom implementation of the User class for Spring Security.
   * This class is used to represent a user in the system and holds additional
   * user information.
   *
   * @param username              the username of the user.
   * @param userEmail             the email of the user.
   * @param userPassword          the encoded password of the user.
   * @param userFirstname         the first name of the user.
   * @param userLastname          the last name of the user.
   * @param enabled               a boolean indicating whether the user is enabled
   *                              or not.
   * @param accountNonExpired     a boolean indicating whether the user account is
   *                              expired or not.
   * @param credentialsNonExpired a boolean indicating whether the user
   *                              credentials are expired or not.
   * @param accountNonLocked      a boolean indicating whether the user account is
   *                              locked or not.
   * @param authorities           a list of authorities (roles) that the user has.
   */
  public User(String username, String userEmail, String userPassword, String userFirstname, String userLastname) {
    this.username = username;
    this.email = userEmail;
    this.password = userPassword;
    this.firstname = userFirstname;
    this.lastname = userLastname;
  }

  // public User(String username, String password, boolean enabled, boolean
  // accountNonExpired,
  // boolean credentialsNonExpired, boolean accountNonLocked,
  // List<GrantedAuthority> authorities) {
  // this.username = username;
  // this.password = password;
  // this.enabled = enabled;
  // this.accountNonExpired = accountNonExpired;
  // this.credentialsNonExpired = credentialsNonExpired;
  // this.accountNonLocked = accountNonLocked;
  // this.authorities = authorities;

  // }

  /**
   * 
   * This method retrieves the username of a user.
   * 
   * @return String - the username of the user.
   */
  public String getUsername() {
    return username;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public boolean isAccountNonExpired() {
    return accountNonExpired;
  }

  public void setAccountNonExpired(boolean accountNonExpired) {
    this.accountNonExpired = accountNonExpired;
  }

  public boolean isCredentialsNonExpired() {
    return credentialsNonExpired;
  }

  public void setCredentialsNonExpired(boolean credentialsNonExpired) {
    this.credentialsNonExpired = credentialsNonExpired;
  }

  public boolean isAccountNonLocked() {
    return accountNonLocked;
  }

  public void setAccountNonLocked(boolean accountNonLocked) {
    this.accountNonLocked = accountNonLocked;
  }

  // public List<GrantedAuthority> getAuthorities() {
  // return authorities;
  // }

  // public void setAuthorities(List<GrantedAuthority> authorities) {
  // this.authorities = authorities;
  // }

  /**
   * 
   * This method retrieves the roles of a user.
   * 
   * @return Set<Role> - a set of roles that the user belongs to.
   */
  // public List<GrantedAuthority> getRoles() {
  // return this.authorities;
  // }

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
  public String getEmail() {
    return email;
  }

  /**
   * 
   * This method sets the email of a user.
   * 
   * @param email - the new email for the user.
   */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * 
   * This method retrieves the password of a user.
   * 
   * @return String - the password of the user.
   */
  public String getPassword() {
    return password;
  }

  /**
   * 
   * This method sets the password of a user.
   * 
   * @param password - the new password for the user.
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * 
   * This method retrieves the first name of a user.
   * 
   * @return String - the first name of the user.
   */
  public String getFirstname() {
    return firstname;
  }

  /**
   * 
   * This method sets the first name of a user.
   * 
   * @param firstname - the new first name for the user.
   */
  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  /**
   * 
   * This method retrieves the last name of a user.
   * 
   * @return String - the last name of the user.
   */
  public String getLastname() {
    return lastname;
  }

  /**
   * 
   * This method sets the last name of a user.
   * 
   * @param lastname - the new last name for the user.
   */
  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

}
