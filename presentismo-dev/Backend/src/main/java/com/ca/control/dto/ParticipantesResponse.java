package com.ca.control.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParticipantesResponse {
    Long id;
    String username;
    String nombre;
    String rol;
}
