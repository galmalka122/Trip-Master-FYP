package dev.tripmaster.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalculateRouteRequest {

    @JsonProperty("places")
    private List<CalculatePlaces> places;

    @JsonProperty("startingTime")
    private Integer startingTime;

    @JsonProperty("endingTime")
    @Nullable
    private Integer endingTime;

    @JsonProperty("differentDestination")
    private Boolean differentDestination;

    @JsonProperty("tripId")
    private String tripId;

    @JsonProperty("dayIndex")
    private Integer dayIndex;

}
