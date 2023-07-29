package dev.tripmaster.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.tripmaster.model.Place;
import lombok.*;

import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalculateRouteResponse {

    @JsonProperty("places")
    private List<Place> places;

    @JsonProperty("overallTime")
    private Integer overallTime;

    @JsonProperty("overallDistance")
    private Integer overallDistance;
}
