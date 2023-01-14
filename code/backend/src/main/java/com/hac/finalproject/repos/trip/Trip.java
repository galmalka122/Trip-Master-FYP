package com.hac.finalproject.repos.trip;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hac.finalproject.repos.User.User;
import com.hac.finalproject.repos.place.Place;

@Entity
@Table(name = "trips")
public class Trip {

  @Id
  @GeneratedValue
  private Long id;

  @Column()
  private String name;

  @OneToOne
  private User user;

  @OneToMany
  @ElementCollection
  private List<Place> places;

  public Trip() {
  }

  public Trip(String name, User user, List<Place> places) {
    this.name = name;
    this.user = user;
    this.places = places;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public List<Place> getPlaces() {
    return places;
  }

  public void setPlaces(List<Place> places) {
    this.places = places;
  }

}
