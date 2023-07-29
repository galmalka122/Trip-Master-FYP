package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceCoords {

    @JsonProperty("place")
    private Coords placeCoords;

    @JsonProperty("road")
    private Coords roadCoords;
}
