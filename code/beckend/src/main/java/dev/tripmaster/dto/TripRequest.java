package dev.tripmaster.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import dev.tripmaster.model.Place;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class TripRequest {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("places")
    private List<List<Place>> places;

    @NonNull
    @JsonProperty("country")
    private String country;

    @JsonProperty("city")
    private String city;

    @NonNull
    @JsonProperty("code")
    private String code;

    @NonNull
    @JsonProperty("lat")
    private Float latitude;

    @NonNull
    @JsonProperty("lng")
    private Float longitude;

    @NonNull
    @JsonProperty("starting_date")
    private Date startingDate;

    @NonNull
    @JsonProperty("ending_date")
    private Date endingDate;

}