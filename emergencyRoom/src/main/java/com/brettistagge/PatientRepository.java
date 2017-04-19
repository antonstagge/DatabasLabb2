package com.brettistagge;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by anton on 2017-04-19.
 */
public interface PatientRepository extends CrudRepository<Patient, Long> {
}
