CREATE TABLE localizacao_gps_item (
   id serial PRIMARY KEY,
   png VARCHAR( 50 ) NOT NULL,
   nome VARCHAR( 50 ) NOT NULL,
   latitude VARCHAR ( 50 ) NOT NULL,
   longitude VARCHAR ( 50 ) NOT NULL,
   audio VARCHAR ( 50 ) NOT NULL,
   anotacao VARCHAR ( 50 ) NOT NULL,
   hp_atual SMALLINT NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
