CREATE TABLE audio-test_command (
   id serial PRIMARY KEY,
   base64 VARCHAR ( 50000 ) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
