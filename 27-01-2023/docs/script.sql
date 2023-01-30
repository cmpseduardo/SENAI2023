DROP DATABASE IF EXISTS lista;

CREATE DATABASE lista CHARSET=UTF8 COLLATE UTF8_GENERAL_CI;

USE lista;

CREATE TABLE tarefas(
    id_tarefa INTEGER PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(40) NOT NULL,
    horario_inicio TIME,
    horario_encerramento TIME,
    status_tarefa VARCHAR(30) NOT NULL
);

CREATE TABLE usuarios(
    id_usuario INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20),
    email VARCHAR(50),
    senha VARCHAR(50)
);

DESCRIBE usuarios;
DESCRIBE tarefas;
SHOW TABLES;

INSERT INTO tarefas VALUES(DEFAULT, 'TAREFA 1', CURTIME(), NULL, "1- ABERTA");
INSERT INTO tarefas VALUES(DEFAULT, 'TAREFA 2', CURTIME(), NULL, "1- ABERTA");
INSERT INTO tarefas VALUES(DEFAULT, 'TAREFA 3', CURTIME(), NULL, "1- ABERTA");
INSERT INTO tarefas VALUES(DEFAULT, 'TAREFA 4', CURTIME(), NULL, "1- ABERTA");
INSERT INTO tarefas VALUES(DEFAULT, 'TAREFA 5', CURTIME(), NULL, "1- ABERTA");
INSERT INTO tarefas VALUES(DEFAULT, 'TAREFA 6', CURTIME(), NULL, "1- ABERTA");

INSERT INTO usuarios VALUES(DEFAULT, 'André', 'andre@gmail.com', '1234');