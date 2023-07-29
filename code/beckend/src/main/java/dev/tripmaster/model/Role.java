package dev.tripmaster.model;

import lombok.AllArgsConstructor;
import lombok.ToString;

@ToString
@AllArgsConstructor
public enum Role {

    ROLE_USER("USER"),
    ROLE_ADMIN("ADMIN");

    private final String name;




}