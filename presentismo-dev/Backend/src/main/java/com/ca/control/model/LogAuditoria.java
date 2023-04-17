package com.ca.control.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class LogAuditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    String username;

    String path;

    @Lob
    String payload;

    Timestamp fecha;

}
