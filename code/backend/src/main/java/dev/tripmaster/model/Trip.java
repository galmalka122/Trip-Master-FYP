package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dev.tripmaster.dto.TripRequest;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("trips")
@CompoundIndexes({
        @CompoundIndex(name = "user_name_idx", def = "{'user': 1, 'name': 1}", unique = true)
})
public class Trip {

    @Id
    @JsonProperty("trip_id")
    private String id;

    @DBRef
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @JsonProperty("name")
    @EqualsAndHashCode.Exclude
    private String name;

    @JsonProperty("places")
    private List<Place> places;

    @JsonProperty("country")
    private String country;

    @JsonProperty("code")
    private String code;

    @JsonProperty("city")
    private String city;

    @JsonProperty("starting_date")
    private Date startingDate;

    @JsonProperty("ending_date")
    private Date endingDate;

    @JsonProperty("lat")
    private Float latitude;

    @JsonProperty("lng")
    private Float longitude;

    public Trip(User user, TripRequest request){
        this.user = user;
        name = request.getName();
        places = request.getPlaces() != null ?  request.getPlaces() : new ArrayList<>();
        country = request.getCountry();
        code = request.getCode();
        city = request.getCity();
        startingDate = request.getStartingDate();
        endingDate = request.getEndingDate();
        latitude = request.getLatitude();
        longitude = request.getLongitude();
    }

    public Trip updateTrip(TripRequest request){
        name = request.getName();
        places = request.getPlaces();
        startingDate = request.getStartingDate();
        endingDate = request.getEndingDate();
        return this;
    }

}
