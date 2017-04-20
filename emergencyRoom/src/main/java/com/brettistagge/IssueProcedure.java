package com.brettistagge;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by anton on 2017-04-19.
 */
@Data
@Entity
@Table(name = "IssueProcedure")
public class IssueProcedure {
    private @Id @GeneratedValue long issueProcedureId;
    private @NotNull @Column(unique = true) String name;
    private @NotNull long cost;

    @ManyToOne
    @JoinColumn(name = "issue")
    private @NotNull Issue issue;

    public IssueProcedure(){

    }
}
