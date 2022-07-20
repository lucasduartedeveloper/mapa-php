CREATE TABLE localizacao_teste (
   id serial PRIMARY KEY,
   png VARCHAR ( 50 ) NOT NULL,
   nome VARCHAR ( 50 ) NOT NULL,
   latitude VARCHAR ( 50 ) NOT NULL,
   longitude VARCHAR ( 50 ) NOT NULL,
   base64 VARCHAR ( 5000 ) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
