DROP DATABASE IF EXISTS aula01;

CREATE DATABASE aula01 CHARSET=UTF8 COLLATE UTF8_GENERAL_CI;

USE aula01;

CREATE TABLE entregadores(
    id_entregador INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    senha VARCHAR(40) NOT NULL,
    veiculo VARCHAR(30) NOT NULL
);

CREATE TABLE pedidos(
    id_pedido INTEGER PRIMARY KEY AUTO_INCREMENT,
    cliente VARCHAR(40) NOT NULL,
    endereco VARCHAR(120) NOT NULL,
    produto VARCHAR(100) NOT NULL,
    data_pedido DATE,
    hora_pedido TIME,
    hora_entrega TIME,
    hora_fim TIME,
    id_entregador INTEGER NOT NULL,
    FOREIGN KEY (id_entregador) REFERENCES entregadores(id_entregador)
);

DESCRIBE entregadores;
DESCRIBE pedidos;
SHOW TABLES;

LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/23-01-2023/docs/entregadores.csv'
INTO TABLE entregadores
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/23-01-2023/docs/pedidos.csv'
INTO TABLE pedidos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;