CREATE TABLE audio_test_command (
   id serial PRIMARY KEY,
   base64 VARCHAR(100000) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
