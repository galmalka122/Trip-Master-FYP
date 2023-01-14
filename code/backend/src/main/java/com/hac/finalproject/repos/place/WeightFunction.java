package com.hac.finalproject.repos.place;

public interface WeightFunction {
  double calculateWeight(Place currentPlace, Place nextPlace);

}
