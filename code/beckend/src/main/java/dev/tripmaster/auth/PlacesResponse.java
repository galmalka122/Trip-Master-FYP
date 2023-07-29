package dev.tripmaster.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.tripmaster.model.Place;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PlacesResponse {
    @JsonProperty("places")
    List<Place> places;
}
