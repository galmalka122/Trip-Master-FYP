package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpeningHours {

    @JsonProperty("day")
    private String dayOfWeek;

    @JsonProperty("openingHours")
    private List<Hours> hours;


}
