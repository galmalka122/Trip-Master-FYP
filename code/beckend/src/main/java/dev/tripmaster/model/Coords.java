package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coords {
    @JsonProperty("lat")
    private double latitude;

    @JsonProperty("lng")
    private double longitude;

}
