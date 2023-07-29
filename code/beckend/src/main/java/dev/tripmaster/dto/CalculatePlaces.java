package dev.tripmaster.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalculatePlaces {

    @JsonProperty("name")
    private String name;

    @JsonProperty("duration")
    private Integer duration;

    @JsonProperty("priority")
    private Integer priority;

    @JsonProperty("originalIndex")
    private Integer originalIndex;

    @JsonProperty("openingHours")
    private List<Period> openingHours;

    @JsonProperty("distances")
    private List<Distance> distances;

}
