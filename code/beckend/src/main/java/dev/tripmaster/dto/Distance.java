package dev.tripmaster.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Distance {

    @JsonProperty("duration")
    private Integer duration;

    @JsonProperty("distance")
    private Integer distance;

}
