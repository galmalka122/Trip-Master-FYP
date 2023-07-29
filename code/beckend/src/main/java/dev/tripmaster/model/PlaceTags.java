package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceTags {

    @JsonProperty("string")
    private String name;

    @JsonProperty("icon")
    private String icon;

}
