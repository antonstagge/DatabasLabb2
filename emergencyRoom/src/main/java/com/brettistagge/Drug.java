package com.brettistagge;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by anton on 2017-04-19.
 */
@Data
@Entity
@Table(name = "Drug")
public class Drug {
    private @Id @GeneratedValue long drugId;
    private @NotNull @Column(unique = true) String name;
    private @NotNull Integer cost;

    public Drug() {

    }
}
