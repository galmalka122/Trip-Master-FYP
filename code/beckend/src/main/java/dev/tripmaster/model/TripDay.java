package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import lombok.*;

import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripDay {
    @JsonProperty("places")
    private List<Place> places;

    @JsonProperty("origin")
    @Nullable
    private Place origin;

    @JsonProperty("destination")
    @Nullable
    private Place destination;

}
