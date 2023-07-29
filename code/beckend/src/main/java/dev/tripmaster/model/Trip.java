package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;


@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("trips")
public class Trip {

    @Id
    @JsonProperty("trip_id")
    private String id;

    @JsonIgnore
    @ToString.Exclude
    private String userId;

    @JsonIgnore
    @ToString.Exclude
    private Integer numOfDays;

    @JsonProperty("name")
    @EqualsAndHashCode.Exclude
    private String name;

    @JsonProperty("trip_days")
    private List<TripDay> tripDays;

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

    @JsonProperty("coords")
    private Coords coords;

    @JsonProperty("timeOffset")
    private Integer timeOffset;

    @JsonProperty("overview")
    private String overview;

    public void initDays(){
        tripDays = new ArrayList<>();

        if(startingDate == null || endingDate == null){
            return;
        }
        long timeDiff = Math.abs(startingDate.getTime() - endingDate.getTime());
        long daysDiff = TimeUnit.DAYS.convert(timeDiff, TimeUnit.MILLISECONDS) + 1;
        numOfDays = (int) daysDiff;
        while(daysDiff-- > 0){
            tripDays.add(TripDay
                    .builder()
                    .places(new ArrayList<>())
                    .build());
        }
    }

}

