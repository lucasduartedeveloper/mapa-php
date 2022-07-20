CREATE TABLE localizacao (
   id serial PRIMARY KEY,
   latitude VARCHAR ( 50 ) NOT NULL,
   longitude VARCHAR ( 50 ) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);