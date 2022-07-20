CREATE TABLE produto (
   id serial PRIMARY KEY,
   estoque SMALLINT NOT NULL,
   nome VARCHAR( 50 ) NOT NULL,
   valor VARCHAR( 50 ) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
