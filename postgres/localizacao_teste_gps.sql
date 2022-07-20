CREATE TABLE localizacao_gps (
   id serial PRIMARY KEY,
   cor VARCHAR( 10 ) NOT NULL,
   latitude VARCHAR ( 50 ) NOT NULL,
   longitude VARCHAR ( 50 ) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
