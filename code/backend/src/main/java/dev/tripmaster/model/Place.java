package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Place {

    @Id
    @JsonProperty("id")
    @Indexed(unique = true)
    String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("address")
    private String address;

    @JsonProperty("opening_hours")
    private List<OpeningHours> openingHours;

    @JsonProperty("rating")
    private double rating;

    @JsonProperty("altitude")
    private double altitude;

    @JsonProperty("longitude")
    private double longitude;

    @JsonProperty("photos")
    private List<String> photos;

    @JsonProperty("overview")
    private String overview;


}
