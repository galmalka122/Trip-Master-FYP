package dev.tripmaster.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Period {

    @JsonProperty("open")
    private Integer open;

    @JsonProperty("close")
    private Integer close;
}
