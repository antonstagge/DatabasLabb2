package com.brettistagge;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by anton on 2017-04-19.
 */
@Data
@Entity
@Table(name = "Log")
public class Log {
    private @Id @GeneratedValue long logId;
    private @NotNull @Column(unique = true) long ssn;
    private String name;
    private long age;
    private boolean female;
    private long priority;
    private long waitingTime;
    private String issueName;
    private String issueProcedureOneName;
    private long issueProcedureOneCost;
    private String issueProcedureTwoName;
    private long issueProcedureTwoCost;
    private String issueProcedureThreeName;
    private long issueProcedureThreeCost;
    private String drugOneName;
    private long drugOneCost;
    private String drugTwoName;
    private long drugTwoCost;
    private String drugThreeName;
    private long drugThreeCost;
    private boolean home;

    public Log(){

    }
}
