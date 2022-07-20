CREATE TABLE cube_face (
   id serial PRIMARY KEY,
   cube_id SMALLINT NOT NULL,
   face_id SMALLINT NOT NULL,
   base64 VARCHAR(5000000) NOT NULL,
   data_hora TIMESTAMP default CURRENT_TIMESTAMP
);
