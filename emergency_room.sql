
#Issue table
CREATE TABLE issue(
    issue_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE
);

#team table
CREATE TABLE team(
    team_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE
);

#Can treat table
CREATE TABLE can_treat(
    can_treat_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    team INT UNSIGNED,
    issue INT UNSIGNED,
    UNIQUE KEY(team, issue),
    FOREIGN KEY (team) REFERENCES team(team_id),
    FOREIGN KEY (issue) REFERENCES issue(issue_id)
); 

#Procedure table
CREATE TABLE issue_procedure(
    issue_procedure_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE,
    cost INT UNSIGNED,
    issue INT UNSIGNED,
    FOREIGN KEY (issue) REFERENCES issue(issue_id)
);

#Patient table
CREATE TABLE patient(
    patient_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ssn INT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(40),
    age INT UNSIGNED,
    female BOOL,
    priority INT UNSIGNED,
    waiting_time INT UNSIGNED,
    issue INT UNSIGNED NOT NULL,
    team INT UNSIGNED NOT NULL,
    FOREIGN KEY (issue) REFERENCES issue(issue_id),
    FOREIGN KEY (team) REFERENCES team(team_id)
);

#druuugs
CREATE TABLE drug(
    drug_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE,
    cost INT UNSIGNED
);

#log table
CREATE TABLE log(
    log_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ssn INT UNSIGNED NOT NULL UNIQUE,
    name VARCHAR(40),
    age INT UNSIGNED,
    female BOOL,
    priority INT UNSIGNED,
    waiting_time INT UNSIGNED,
    issue_name VARCHAR(40),
    issue_procedure_one_name VARCHAR(40),
    issue_procedure_one_cost INT UNSIGNED,
    issue_procedure_two_name VARCHAR(40),
    issue_procedure_two_cost INT UNSIGNED,
    issue_procedure_three_name VARCHAR(40),
    issue_procedure_three_cost INT UNSIGNED,
    drug_one_name VARCHAR(40),
    drug_one_cost INT UNSIGNED,
    drug_two_name VARCHAR(40),
    drug_two_cost INT UNSIGNED,
    drug_three_name VARCHAR(40),
    drug_three_cost INT UNSIGNED,
    home BOOL
);

