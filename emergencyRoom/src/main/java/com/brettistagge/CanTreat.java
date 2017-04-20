package com.brettistagge;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by anton on 2017-04-19.
 */
@Data
@Entity
@Table(name = "CanTreat", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"issue", "team"})
})
public class CanTreat {
    private @Id @GeneratedValue long canTreatId;

    @ManyToOne
    @JoinColumn(name = "issue")
    private @NotNull Issue issue;

    @ManyToOne
    @JoinColumn(name = "team")
    private @NotNull Team team;
}