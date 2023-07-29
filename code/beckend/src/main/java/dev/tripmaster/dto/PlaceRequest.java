package dev.tripmaster.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import dev.tripmaster.model.OpeningHours;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class PlaceRequest {

    @Id
    @JsonProperty("name")
    private String name;

    @NonNull
    @JsonProperty("day_index")
    private int dayIndex;

    @Id
    @JsonProperty("address")
    private String address;

    @JsonProperty("openingHours")
    private List<OpeningHours> openingHours;

    @JsonProperty("rating")
    private double rating;

    @JsonProperty("latitude")
    private double latitude;

    @JsonProperty("longitude")
    private double longitude;

    @JsonProperty("photos")
    private List<String> photos;

    @JsonProperty("overview")
    private String overview;


}