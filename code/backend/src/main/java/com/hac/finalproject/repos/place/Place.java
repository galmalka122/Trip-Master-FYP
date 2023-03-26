package com.hac.finalproject.repos.place;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "places")
public class Place implements WeightFunction {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private Double longitude;

  @Column(nullable = false)
  private Double altitude;

  @Column()
  private LocalTime openingHour;

  @Column()
  private LocalTime closingHour;

  @Column()
  private Integer index;

  @Column()
  private Double rate;

  @Column()
  private String address;

  public Place() {
  }

  public Place(String name, Double longitude, Double altitude, LocalTime openHour, LocalTime closingHour, Integer index,
      Double rate, String address) {
    this.name = name;
    this.longitude = longitude;
    this.altitude = altitude;
    this.openingHour = openHour;
    this.closingHour = closingHour;
    this.index = index;
    this.rate = rate;
    this.address = address;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Double getLongitude() {
    return longitude;
  }

  public void setLongitude(Double longitude) {
    this.longitude = longitude;
  }

  public Double getAltitude() {
    return altitude;
  }

  public void setAltitude(Double altitude) {
    this.altitude = altitude;
  }

  public LocalTime getOpeningHour() {
    return openingHour;
  }

  public void setOpeningHour(LocalTime openingHour) {
    this.openingHour = openingHour;
  }

  public LocalTime getClosingHour() {
    return closingHour;
  }

  public void setClosingHour(LocalTime closingHour) {
    this.closingHour = closingHour;
  }

  public Integer getIndex() {
    return index;
  }

  public void setIndex(Integer index) {
    this.index = index;
  }

  public Double getRate() {
    return rate;
  }

  public void setRate(Double rate) {
    this.rate = rate;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  @Override
  public double calculateWeight(Place currentPlace, Place nextPlace) {
    return 0;
  }

}
