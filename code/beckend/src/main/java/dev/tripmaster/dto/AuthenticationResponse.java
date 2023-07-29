package dev.tripmaster.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dev.tripmaster.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("email")
    private String email;
    @JsonProperty("roles")
    private Role role;
    @JsonIgnore
    private String accessToken;
    @JsonIgnore
    private String refreshToken;

}