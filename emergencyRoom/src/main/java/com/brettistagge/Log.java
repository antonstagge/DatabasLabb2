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
    private Integer age;
    private Boolean female;
    private Integer priority;
    private Integer waitingTime;
    private String issueName;
    private String issueProcedureOneName;
    private Integer issueProcedureOneCost;
    private String issueProcedureTwoName;
    private Integer issueProcedureTwoCost;
    private String issueProcedureThreeName;
    private Integer issueProcedureThreeCost;
    private String drugOneName;
    private Integer drugOneCost;
    private String drugTwoName;
    private Integer drugTwoCost;
    private String drugThreeName;
    private Integer drugThreeCost;
    private Boolean home;

    public Log(){

    }
}
