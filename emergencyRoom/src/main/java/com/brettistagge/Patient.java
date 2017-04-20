package com.brettistagge;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by anton on 2017-04-19.
 */

@Data
@Entity
@Table(name = "Patient")
public class Patient {

    private @Id @GeneratedValue long patientId;
    private @NotNull @Column(unique = true) String ssn;
    private String name;
    private Integer age;
    private Boolean female;
    private @NotNull long priority;
    private Integer waitingTime;

    @ManyToOne
    @JoinColumn(name = "issue")
    private @NotNull Issue issue;

    @ManyToOne
    @JoinColumn(name = "team")
    private @NotNull Team team;

    public Patient() {

    }
}