package com.brettistagge;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by anton on 2017-04-19.
 */
public interface DrugRepository extends CrudRepository<Drug, Long> {
}
