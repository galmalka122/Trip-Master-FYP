package dev.tripmaster.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpeningHours {

    private String dayOfWeek;
    private String openingTime;
    private String closingTime;

}
