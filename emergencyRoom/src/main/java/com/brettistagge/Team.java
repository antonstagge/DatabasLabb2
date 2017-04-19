package com.brettistagge;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by anton on 2017-04-19.
 */
@Data
@Entity
@Table(name = "Team")
public class Team {
    private @Id @GeneratedValue long teamId;
    private @NotNull @Column(unique = true) String name;

    @OneToMany(mappedBy = "team")
    private List<Patient> queue;

    @OneToMany(mappedBy = "team")
    private List<CanTreat> canTreats;

    public Team() {

    }
}
