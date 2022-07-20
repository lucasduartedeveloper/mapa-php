CREATE TABLE extra_trajeto (
   id serial PRIMARY KEY,
   playerId SMALLINT NOT NULL,
   nome VARCHAR(50) NOT NULL,
   latitude VARCHAR(50) NOT NULL,
   longitude VARCHAR(50) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
