DELETE FROM patient;
ALTER TABLE patient AUTO_INCREMENT = 1;

DELETE FROM issue_procedure;
ALTER TABLE issue_procedure AUTO_INCREMENT = 1;

DELETE FROM can_treat;
ALTER TABLE can_treat AUTO_INCREMENT = 1;

DELETE FROM team;
ALTER TABLE team AUTO_INCREMENT = 1;

DELETE FROM issue;
ALTER TABLE issue AUTO_INCREMENT = 1;

DELETE FROM drug;
ALTER TABLE drug AUTO_INCREMENT = 1;

INSERT INTO issue (name) VALUES
("Heart attack"),
("Impact trauma"),
("Chest pains"),
("Seizures"),
("Allergic reactions"),
("Broken bone"),
("Flu"),
("Back pain"),
("Flesh wound"),
("Stroke");

INSERT INTO team (name) VALUES
("Team Bones"),
("Dr. House team"),
("Greys Anatomy"),
("Team not so good"),
("Scrubs");


INSERT INTO can_treat (team, issue) VALUES
(1,1),
(1,2),
(1,3),
(2,2),
(2,3),
(2,4),
(3,3),
(3,4),
(3,5),
(4,5),
(4,6),
(4,7),
(5,8),
(5,9),
(5,10);

INSERT INTO issue_procedure (name, cost, issue) VALUES
("Colonoscopy", 1300, 1),
("Systoscopy", 2100, 1),
("Aoutoscopy", 300, 1),
("Lymphangiomgrafy", 13000, 1),
("Cerebral Angiagrafy", 1337, 2),
("SPECT", 10, 2),
("Ultra stuff", 3300, 2),
("Apherasis", 200, 2),
("Chemo", 300, 3),
("Cevical stuff", 13000, 3),
("Radiation", 1337, 3),
("Tracheal therapy", 10, 3),
("heat stuff", 3300, 3),
("Chock therapy", 2020, 3),
("Fluid replacement", 123, 4),
("Electricity", 3333, 4),
("Oxygen pump", 12233, 5),
("gene therapy", 3333, 5),
("Vision therapy", 123, 5),
("Acupuncture", 3333, 5),
("Biopsy", 123, 6),
("Amputation", 44, 6),
("Ablazing", 5454, 6),
("Death help", 45454, 6),
("Cryosurgery", 213, 7),
("Endoscopy surgery", 78788, 7),
("Facial rejuwenation", 4545, 7),
("Hand surgery", 2582, 7),
("Image guided surgery", 2828, 8),
("Lithotomy", 457, 8),
("Lobotomy", 28488, 8),
("Vaginal plastic", 999, 8),
("Phallus enlargment", 787, 9),
("Epidural", 2346, 9),
("Antivenom treatment", 777, 9),
("Combination lazer therapy", 888, 9),
("Fage enzyme", 6666, 10),
("Fluid gene stimulation", 3243, 10),
("Heat speach thump", 77774, 10),
("Ultrasonic Magnetic Stool Amputation", 2346, 10);

INSERT INTO patient (ssn, name, age, female, priority, waiting_time, issue, team) VALUES
(9501020078, "Anton Stagge", 22, False, 5, 10, 6, 4),
(9611121111, "Cristian Bretti", 20, False, 3, 30, 5, 4),
(9110231123, "Pelle", 13, False, 2, 40, 5, 4),
(9213122131, "Stina", 40, True, 2, 34, 7, 4),

(8012035677, "Carl", 50, False, 1, 20, 1, 1),
(6508084564, "Johan", 80, False, 2, 20, 2, 1),
(7101034566, "Carl", 44, False, 3, 40, 3, 1),
(9105056666, "Elsa", 80, True, 4, 10, 2, 1),

(9201026546, "Saga", 55, True, 1, 40, 2, 2),
(9203044567, "Johan-Carl", 66, False, 3, 40, 3, 2),
(9204014333, "Sara", 77, True, 3, 40, 4, 2),
(9204025645, "Emil", 24, False, 3, 40, 4, 2),
(9205024944, "Lisa", 45, True, 4, 40, 3, 2),

(8901014667, "Fredde", 60, False, 3, 40, 4, 3),
(8902040984, "Josefin", 76, True, 5, 40, 5, 3),

(0203100547, "Erik", 12, False, 4, 40, 8, 5),
(1203050123, "Lisbeth", 4, True, 4, 40, 9, 5),
(9504050237, "Filipe", 46, False, 2, 40, 10, 5);

INSERT INTO drug (name, cost) VALUES
("Alvedon", 10),
("Citodon", 12),
("Adderall", 3),
("Viagra", 30),
("Zoloft", 23),
("Lexapro", 88),
("Oxycodone", 189),
("Lyrica", 333),
("Tramadol", 39),
("Prednisone", 90),
("Ibuprofen", 99),
("Ativan", 30),
("GabaPentin", 39),
("Naproxen", 77),
("Doxtcycline", 42);


