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
@Table(name = "Issue")
public class Issue {
    private @Id @GeneratedValue long issueId;
    private @NotNull @Column(unique = true) String name;

    @OneToMany(mappedBy = "issue")
    private List<Patient> patients;

    @OneToMany(mappedBy = "issue")
    private List<CanTreat> canBeTreatedBy;

    @OneToMany(mappedBy = "issue")
    private List<IssueProcedure> procedures;

    public Issue() {

    }
}
