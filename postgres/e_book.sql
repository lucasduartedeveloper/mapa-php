CREATE TABLE e_book (
   id serial PRIMARY KEY,
   texto VARCHAR( 1000 ) NOT NULL,
   base64 VARCHAR ( 500000 ) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
