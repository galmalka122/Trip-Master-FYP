package dev.tripmaster.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlacePhotos {

    @JsonProperty("urlLarge")
    private String large;

    @JsonProperty("urlSmall")
    private String small;

    @JsonProperty("attrs")
    private List<String> attrs;
}
