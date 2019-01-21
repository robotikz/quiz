CREATE TABLE answer (id INT AUTO_INCREMENT NOT NULL, parent INT DEFAULT NULL, title LONGTEXT NOT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_DADD4A253D8E604F (parent), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE question (id INT AUTO_INCREMENT NOT NULL, user BIGINT DEFAULT NULL, title VARCHAR(255) NOT NULL, status SMALLINT DEFAULT 0, truecount SMALLINT DEFAULT 1, published DATETIME DEFAULT NULL, source LONGTEXT DEFAULT NULL, difficulty SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_B6F7494E8D93D649 (user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE questions_cats (question_id INT NOT NULL, question_cat_id INT NOT NULL, INDEX IDX_DE3D1EC01E27F6BF (question_id), INDEX IDX_DE3D1EC0E1F0864B (question_cat_id), PRIMARY KEY(question_id, question_cat_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE questions_tags (question_id INT NOT NULL, question_tag_id INT NOT NULL, INDEX IDX_721C30741E27F6BF (question_id), INDEX IDX_721C3074BD8F4C19 (question_tag_id), PRIMARY KEY(question_id, question_tag_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE questioncat (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(20) NOT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE questiontag (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(20) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE quiz (id INT AUTO_INCREMENT NOT NULL, user BIGINT DEFAULT NULL, title VARCHAR(20) NOT NULL, loginrequired SMALLINT DEFAULT 0, roundperday SMALLINT DEFAULT 0, hsnumber SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_A412FA928D93D649 (user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE quizs_cats (quiz_id INT NOT NULL, quiz_cat_id INT NOT NULL, INDEX IDX_12A57644853CD175 (quiz_id), INDEX IDX_12A57644BE9591A (quiz_cat_id), PRIMARY KEY(quiz_id, quiz_cat_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE quizcat (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(20) NOT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE quiz_question (id BIGINT AUTO_INCREMENT NOT NULL, quiz_id INT NOT NULL, question_id INT NOT NULL, info VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_6033B00B853CD175 (quiz_id), INDEX IDX_6033B00B1E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE user (id BIGINT AUTO_INCREMENT NOT NULL, unid VARCHAR(50) NOT NULL, username VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL, reset VARCHAR(128) DEFAULT NULL, email VARCHAR(64) NOT NULL, phone VARCHAR(20) DEFAULT NULL, status SMALLINT DEFAULT 0, fname VARCHAR(20) DEFAULT NULL, lname VARCHAR(20) DEFAULT NULL, tel1 VARCHAR(20) DEFAULT NULL, tel2 VARCHAR(20) DEFAULT NULL, tel3 VARCHAR(20) DEFAULT NULL, sex SMALLINT DEFAULT NULL, dborn DATETIME DEFAULT NULL, about LONGTEXT DEFAULT NULL, avatar VARCHAR(50) DEFAULT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, lastact DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649C10C1C37 (unid), UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE users_roles (user_id BIGINT NOT NULL, user_role_id BIGINT NOT NULL, INDEX IDX_51498A8EA76ED395 (user_id), INDEX IDX_51498A8E8E0E3CA6 (user_role_id), PRIMARY KEY(user_id, user_role_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE userrole (id BIGINT AUTO_INCREMENT NOT NULL, role VARCHAR(20) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE answer ADD CONSTRAINT FK_DADD4A253D8E604F FOREIGN KEY (parent) REFERENCES question (id);
ALTER TABLE question ADD CONSTRAINT FK_B6F7494E8D93D649 FOREIGN KEY (user) REFERENCES user (id);
ALTER TABLE questions_cats ADD CONSTRAINT FK_DE3D1EC01E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE;
ALTER TABLE questions_cats ADD CONSTRAINT FK_DE3D1EC0E1F0864B FOREIGN KEY (question_cat_id) REFERENCES questioncat (id) ON DELETE CASCADE;
ALTER TABLE questions_tags ADD CONSTRAINT FK_721C30741E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE;
ALTER TABLE questions_tags ADD CONSTRAINT FK_721C3074BD8F4C19 FOREIGN KEY (question_tag_id) REFERENCES questiontag (id) ON DELETE CASCADE;
ALTER TABLE quiz ADD CONSTRAINT FK_A412FA928D93D649 FOREIGN KEY (user) REFERENCES user (id);
ALTER TABLE quizs_cats ADD CONSTRAINT FK_12A57644853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id) ON DELETE CASCADE;
ALTER TABLE quizs_cats ADD CONSTRAINT FK_12A57644BE9591A FOREIGN KEY (quiz_cat_id) REFERENCES quizcat (id) ON DELETE CASCADE;
ALTER TABLE quiz_question ADD CONSTRAINT FK_6033B00B853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id);
ALTER TABLE quiz_question ADD CONSTRAINT FK_6033B00B1E27F6BF FOREIGN KEY (question_id) REFERENCES question (id);
ALTER TABLE users_roles ADD CONSTRAINT FK_51498A8EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE;
ALTER TABLE users_roles ADD CONSTRAINT FK_51498A8E8E0E3CA6 FOREIGN KEY (user_role_id) REFERENCES userrole (id) ON DELETE CASCADE;

ALTER TABLE question ADD statuscheck SMALLINT DEFAULT 0;
ALTER TABLE quiz CHANGE hsnumber hsnumber SMALLINT DEFAULT 10;

ALTER TABLE question ADD avatar VARCHAR(50) DEFAULT NULL;


ALTER TABLE quiz ADD qrandom SMALLINT DEFAULT 0, ADD qrepeat SMALLINT DEFAULT 0, DROP random, DROP `repeat`;








ALTER TABLE question ADD avatar VARCHAR(50) DEFAULT NULL, ADD statuscheck SMALLINT DEFAULT 0;
ALTER TABLE questioncat ADD quizcat INT DEFAULT NULL, CHANGE status status SMALLINT DEFAULT 1;
ALTER TABLE questioncat ADD CONSTRAINT FK_E63870277D2357ED FOREIGN KEY (quizcat) REFERENCES quizcat (id);
CREATE UNIQUE INDEX UNIQ_E63870277D2357ED ON questioncat (quizcat);
ALTER TABLE questiontag ADD status SMALLINT DEFAULT 1;
ALTER TABLE quiz ADD analysis SMALLINT DEFAULT 1, ADD reward SMALLINT DEFAULT 0, ADD sharehs SMALLINT DEFAULT 0, ADD shareanalysis SMALLINT DEFAULT 0, ADD sharereward SMALLINT DEFAULT 0, ADD joker5050 SMALLINT DEFAULT 0, ADD jokerpause SMALLINT DEFAULT 0, ADD jokerskip SMALLINT DEFAULT 0, ADD difficulty SMALLINT DEFAULT 0, ADD timelimit SMALLINT DEFAULT 15, ADD qrandom SMALLINT DEFAULT 0, ADD qrepeat SMALLINT DEFAULT 0, ADD trueanswer SMALLINT DEFAULT 0, CHANGE hsnumber hsnumber SMALLINT DEFAULT 10;
ALTER TABLE quizcat ADD questioncat INT DEFAULT NULL;
ALTER TABLE quizcat ADD CONSTRAINT FK_7D2357EDE6387027 FOREIGN KEY (questioncat) REFERENCES questioncat (id);
CREATE UNIQUE INDEX UNIQ_7D2357EDE6387027 ON quizcat (questioncat);
ALTER TABLE userrole ADD status SMALLINT DEFAULT 1;



--22.11.2016, astoian
ALTER TABLE quiz CHANGE hsnumber hsnumber SMALLINT DEFAULT 30, CHANGE joker5050 joker5050 SMALLINT DEFAULT 1, CHANGE jokerpause jokerpause SMALLINT DEFAULT 1, CHANGE jokerskip jokerskip SMALLINT DEFAULT 1, CHANGE qrandom qrandom SMALLINT DEFAULT 1;

--28.11.2016, astoian
ALTER TABLE question CHANGE difficulty difficulty SMALLINT DEFAULT 1;


--15.01.2017, astoin
ALTER TABLE question ADD avatar2 VARCHAR(50) DEFAULT NULL, CHANGE difficulty difficulty SMALLINT DEFAULT 5;
ALTER TABLE quiz CHANGE hsnumber hsnumber SMALLINT DEFAULT 30, CHANGE joker5050 joker5050 SMALLINT DEFAULT 1, CHANGE jokerpause jokerpause SMALLINT DEFAULT 1, CHANGE jokerskip jokerskip SMALLINT DEFAULT 1, CHANGE qrandom qrandom SMALLINT DEFAULT 1;

--17.04.2017, astoian
ALTER TABLE quiz ADD color1 LONGTEXT DEFAULT NULL, ADD color2 LONGTEXT DEFAULT NULL, ADD color3 LONGTEXT DEFAULT NULL, ADD color4 LONGTEXT DEFAULT NULL, ADD color5 LONGTEXT DEFAULT NULL;


--19.04.2017, astoian
ALTER TABLE quiz ADD logo1 VARCHAR(50) DEFAULT NULL, ADD logo2 VARCHAR(50) DEFAULT NULL, ADD background VARCHAR(50) DEFAULT NULL;


--21.04.2017, astoian
CREATE TABLE screenresult (id INT AUTO_INCREMENT NOT NULL, quiz_id INT DEFAULT NULL, title1 VARCHAR(255) DEFAULT NULL, title2 VARCHAR(255) DEFAULT NULL, content VARCHAR(255) DEFAULT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_E4550DCB853CD175 (quiz_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE screenresult ADD CONSTRAINT FK_E4550DCB853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id);

--27.04.2017, astoian
ALTER TABLE quiz ADD domain VARCHAR(20) NOT NULL, CHANGE title title VARCHAR(50) NOT NULL;
CREATE TABLE placeholder (id INT AUTO_INCREMENT NOT NULL, ph VARCHAR(20) NOT NULL, val VARCHAR(20) NOT NULL, what VARCHAR(20) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE placeholder CHANGE ph ph VARCHAR(50) NOT NULL, CHANGE val val VARCHAR(255) NOT NULL;


--02.05.2017, astoian
CREATE TABLE evaluation (id INT AUTO_INCREMENT NOT NULL, score INT NOT NULL, title VARCHAR(20) NOT NULL, status SMALLINT DEFAULT 1, created DATETIME NOT NULL, updated DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE quizs_evaluations (quiz_id INT NOT NULL, evaluation_id INT NOT NULL, INDEX IDX_9AF2AC16853CD175 (quiz_id), INDEX IDX_9AF2AC16456C5646 (evaluation_id), PRIMARY KEY(quiz_id, evaluation_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE quizs_evaluations ADD CONSTRAINT FK_9AF2AC16853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id) ON DELETE CASCADE;
ALTER TABLE quizs_evaluations ADD CONSTRAINT FK_9AF2AC16456C5646 FOREIGN KEY (evaluation_id) REFERENCES evaluation (id) ON DELETE CASCADE;
ALTER TABLE quiz ADD analysisi SMALLINT DEFAULT 1;


--09.05.2017, astoian
CREATE TABLE screengameover (id INT AUTO_INCREMENT NOT NULL, quiz_id INT DEFAULT NULL, title1 VARCHAR(255) DEFAULT NULL, title2 VARCHAR(255) DEFAULT NULL, title3 VARCHAR(255) DEFAULT NULL, title4 VARCHAR(255) DEFAULT NULL, avatar VARCHAR(50) DEFAULT NULL, avatar2 VARCHAR(50) DEFAULT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_39FE9FD5853CD175 (quiz_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE screengameover ADD CONSTRAINT FK_39FE9FD5853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id);
CREATE TABLE screenhighscore (id INT AUTO_INCREMENT NOT NULL, quiz_id INT DEFAULT NULL, title1 VARCHAR(255) DEFAULT NULL, title2 VARCHAR(255) DEFAULT NULL, title3 VARCHAR(255) DEFAULT NULL, title4 VARCHAR(255) DEFAULT NULL, title5 VARCHAR(255) DEFAULT NULL, title6 VARCHAR(255) DEFAULT NULL, title7 VARCHAR(255) DEFAULT NULL, title8 VARCHAR(255) DEFAULT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_C2A86292853CD175 (quiz_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE screensharee (id INT AUTO_INCREMENT NOT NULL, quiz_id INT DEFAULT NULL, title1 VARCHAR(255) DEFAULT NULL, title2 VARCHAR(255) DEFAULT NULL, title3 VARCHAR(255) DEFAULT NULL, title4 VARCHAR(255) DEFAULT NULL, title5 VARCHAR(255) DEFAULT NULL, status SMALLINT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_93B408F5853CD175 (quiz_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE screenhighscore ADD CONSTRAINT FK_C2A86292853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id);
ALTER TABLE screensharee ADD CONSTRAINT FK_93B408F5853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id);

ALTER TABLE screenresult ADD title4 VARCHAR(255) DEFAULT NULL, CHANGE content title3 VARCHAR(255) DEFAULT NULL;

--29.05.2017, astoian
ALTER TABLE user ADD noti1 SMALLINT DEFAULT 1, ADD noti2 SMALLINT DEFAULT 1;


--30.05.2017, astoian
CREATE TABLE score (id INT AUTO_INCREMENT NOT NULL, user BIGINT DEFAULT NULL, quiz INT DEFAULT NULL, title VARCHAR(255) NOT NULL, score INT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_329937518D93D649 (user), INDEX IDX_32993751A412FA92 (quiz), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE score ADD CONSTRAINT FK_329937518D93D649 FOREIGN KEY (user) REFERENCES user (id);
ALTER TABLE score ADD CONSTRAINT FK_32993751A412FA92 FOREIGN KEY (quiz) REFERENCES quiz (id);


--07.06.2017, astoian
ALTER TABLE answer DROP FOREIGN KEY FK_DADD4A253D8E604F;
DROP INDEX IDX_DADD4A253D8E604F ON answer;
ALTER TABLE answer CHANGE parent parent_id INT DEFAULT NULL;
ALTER TABLE answer ADD CONSTRAINT FK_DADD4A25727ACA70 FOREIGN KEY (parent_id) REFERENCES question (id);
CREATE INDEX IDX_DADD4A25727ACA70 ON answer (parent_id);
ALTER TABLE evaluation ADD quiz_id INT DEFAULT NULL;
ALTER TABLE evaluation ADD CONSTRAINT FK_1323A575853CD175 FOREIGN KEY (quiz_id) REFERENCES quiz (id);
CREATE INDEX IDX_1323A575853CD175 ON evaluation (quiz_id);
ALTER TABLE score DROP title;

--12.06.2017, astoian
ALTER TABLE evaluation DROP FOREIGN KEY FK_1323A575853CD175;
DROP INDEX IDX_1323A575853CD175 ON evaluation;
ALTER TABLE evaluation CHANGE quiz_id quiz INT DEFAULT NULL;
ALTER TABLE evaluation ADD CONSTRAINT FK_1323A575A412FA92 FOREIGN KEY (quiz) REFERENCES quiz (id);
CREATE INDEX IDX_1323A575A412FA92 ON evaluation (quiz);

ALTER TABLE evaluation CHANGE title title VARCHAR(255) NOT NULL;

ALTER TABLE placeholder CHANGE val vav VARCHAR(255) NOT NULL;

--12.07.2017, astoian
DROP INDEX uniq_fid ON user;
CREATE UNIQUE INDEX UNIQ_8D93D6494DFB1B2F ON user (fid);

--16.07.2017, astoian
DROP INDEX phone ON user [] []
ALTER TABLE user ADD fid VARCHAR(255) DEFAULT NULL [] []
CREATE UNIQUE INDEX UNIQ_8D93D6494DFB1B2F ON user (fid) [] []

--16.10.2017, astoian
CREATE TABLE scorem (id INT AUTO_INCREMENT NOT NULL, user BIGINT DEFAULT NULL, quiz INT DEFAULT NULL, m SMALLINT DEFAULT NULL, y SMALLINT DEFAULT NULL, score INT DEFAULT 0, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_FD5F0A3D8D93D649 (user), INDEX IDX_FD5F0A3DA412FA92 (quiz), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE scorem ADD CONSTRAINT FK_FD5F0A3D8D93D649 FOREIGN KEY (user) REFERENCES user (id);
ALTER TABLE scorem ADD CONSTRAINT FK_FD5F0A3DA412FA92 FOREIGN KEY (quiz) REFERENCES quiz (id);

--20.10.2017, astoian
ALTER TABLE screenhighscore ADD titlem1 VARCHAR(255) DEFAULT NULL, ADD titlem2 VARCHAR(255) DEFAULT NULL, ADD titlem3 VARCHAR(255) DEFAULT NULL, ADD titlea1 VARCHAR(255) DEFAULT NULL, ADD titlea2 VARCHAR(255) DEFAULT NULL, ADD titlea3 VARCHAR(255) DEFAULT NULL, DROP title2, DROP title3;
ALTER TABLE screenhighscore ADD title9 VARCHAR(255) DEFAULT NULL;

--25.10.2017, astoian
ALTER TABLE quiz ADD color6 LONGTEXT DEFAULT NULL;
ALTER TABLE quiz ADD share SMALLINT DEFAULT 1, CHANGE loginrequired guestallow SMALLINT DEFAULT 0;
ALTER TABLE quiz ADD joker SMALLINT DEFAULT 1;

--09.12.2017, astoian
ALTER TABLE answer ADD solution LONGTEXT NOT NULL;

--17.12.2017, astoian
ALTER TABLE question ADD solution SMALLINT DEFAULT 0;

--21.12.2017, astoian
ALTER TABLE quiz ADD ads SMALLINT DEFAULT 0, ADD adsafterqn SMALLINT DEFAULT 5, ADD adsaftersec SMALLINT DEFAULT 10;

--04.01.2018, astoian
ALTER TABLE question ADD dnd SMALLINT DEFAULT 0;
ALTER TABLE answer CHANGE solution solution LONGTEXT DEFAULT NULL;

--26.04.2018, astoian
ALTER TABLE placeholder ADD quiz INT DEFAULT NULL;
ALTER TABLE placeholder ADD CONSTRAINT FK_F5E69F02A412FA92 FOREIGN KEY (quiz) REFERENCES quiz (id);
CREATE INDEX IDX_F5E69F02A412FA92 ON placeholder (quiz);

--08.05.2018, astoian
ALTER TABLE emailholder ADD quiz INT DEFAULT NULL;
ALTER TABLE emailholder ADD CONSTRAINT FK_C1DDC5AEA412FA92 FOREIGN KEY (quiz) REFERENCES quiz (id);
CREATE INDEX IDX_C1DDC5AEA412FA92 ON emailholder (quiz);

--14.05.2018, astoian
CREATE TABLE Infoholder (id INT AUTO_INCREMENT NOT NULL, quiz INT DEFAULT NULL, tn VARCHAR(50) NOT NULL, val LONGTEXT NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_19944204A412FA92 (quiz), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE Infoholder ADD CONSTRAINT FK_19944204A412FA92 FOREIGN KEY (quiz) REFERENCES quiz (id);

--02.08.2018, astoian
ALTER TABLE quiz ADD fb1 VARCHAR(50) DEFAULT NULL;

--24.09.2018, astoian
ALTER TABLE score ADD scoresum BIGINT DEFAULT 0;
ALTER TABLE user CHANGE reset reset VARCHAR(128) DEFAULT '';

--19.10.2018, astoian
ALTER TABLE questioncat CHANGE title title VARCHAR(50) NOT NULL;
ALTER TABLE quizcat CHANGE title title VARCHAR(50) NOT NULL;

UPDATE quizcat SET questioncat = NULL WHERE `created` > '2018-10-18';
UPDATE questioncat SET quizcat = NULL WHERE `created` > '2018-10-18';
DELETE FROM quizcat WHERE `created` > '2018-10-18';
DELETE FROM questioncat WHERE `created` > '2018-10-18';