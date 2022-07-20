CREATE TABLE extra_audio (
   id serial PRIMARY KEY,
   nome VARCHAR(50) NOT NULL,
   latitude VARCHAR(50) NOT NULL,
   longitude VARCHAR(50) NOT NULL,
   desenho VARCHAR(50000) NOT NULL,
   base64 VARCHAR(5000000) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
