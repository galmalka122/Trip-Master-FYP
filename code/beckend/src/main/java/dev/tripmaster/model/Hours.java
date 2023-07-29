package dev.tripmaster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Hours {

    @JsonProperty("open")
    private String open;

    @JsonProperty("close")
    private String close;
}
