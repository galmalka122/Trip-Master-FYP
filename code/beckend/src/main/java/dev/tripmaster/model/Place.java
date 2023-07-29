package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Place {

    @JsonProperty("place_id")
    String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("day_index")
    private int dayIndex;

    @JsonProperty("address")
    private String address;

    @JsonProperty("openingHours")
    private List<OpeningHours> openingHours;

    @JsonProperty("photos")
    private List<PlacePhotos> photos;

    @JsonProperty("website")
    private String website;

    @JsonProperty("rating")
    private double rating;

    @JsonProperty("coords")
    private PlaceCoords placeCoords;

    @JsonProperty("types")
    private List<PlaceTags> types;

    @JsonProperty("overview")
    private String overview;

}
